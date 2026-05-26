"use client";

import { useEffect, useId, useState } from "react";
import { getStoragePublicUrl } from "@/lib/media/url";

type MediaPickerAsset = {
  id: string;
  title: string | null;
  fileName: string;
  kind: string;
  bucket: string;
  objectPath: string;
};

type MediaPickerProps = {
  name: string;
  defaultAsset?: MediaPickerAsset | null;
  defaultValue?: string | null;
  allowedKinds?: string[];
  emptyLabel?: string;
};

export function MediaPicker({
  name,
  defaultAsset = null,
  defaultValue = "",
  allowedKinds,
  emptyLabel = "Sin asset",
}: MediaPickerProps) {
  const [selectedId, setSelectedId] = useState(defaultValue || "");
  const [selectedAsset, setSelectedAsset] = useState<MediaPickerAsset | null>(defaultAsset);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<MediaPickerAsset[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const inputId = useId();
  const selectedImageUrl = selectedAsset
    ? getStoragePublicUrl({
        bucket: selectedAsset.bucket,
        objectPath: selectedAsset.objectPath,
      })
    : "";
  const normalizedQuery = query.trim();
  const canSearch = normalizedQuery.length >= 2;

  useEffect(() => {
    if (!isOpen || !canSearch) {
      setResults([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      const searchParams = new URLSearchParams({ q: normalizedQuery });
      allowedKinds?.forEach((kind) => searchParams.append("kind", kind));
      setStatus("loading");

      try {
        const response = await fetch(`/api/admin/media/search?${searchParams.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Media search failed");
        }

        const payload = (await response.json()) as { assets?: MediaPickerAsset[] };
        setResults(payload.assets ?? []);
        setStatus("idle");
      } catch (error) {
        if (!controller.signal.aborted) {
          setResults([]);
          setStatus("error");
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [allowedKinds, canSearch, isOpen, normalizedQuery]);

  return (
    <div className="admin-media-picker">
      <input type="hidden" name={name} value={selectedId} />
      <button
        type="button"
        className="admin-media-picker__trigger"
        aria-expanded={isOpen}
        aria-controls={inputId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="admin-media-picker__trigger-label">
          {selectedAsset ? selectedAsset.title || selectedAsset.fileName : emptyLabel}
        </span>
        <span className="admin-media-picker__trigger-meta">
          {selectedAsset ? selectedAsset.kind : "Seleccionar"}
        </span>
      </button>

      {selectedAsset ? (
        <div className="admin-media-picker__selection">
          {selectedImageUrl ? (
            <img
              src={selectedImageUrl}
              alt={selectedAsset.title || selectedAsset.fileName}
              className="admin-media-picker__selection-image"
            />
          ) : (
            <div className="admin-media-picker__selection-placeholder">Privado</div>
          )}
          <div className="admin-media-picker__selection-meta">
            <strong>{selectedAsset.title || selectedAsset.fileName}</strong>
            <span>{selectedAsset.kind}</span>
          </div>
          <button
            type="button"
            className="admin-link-inline admin-link-inline--danger"
            onClick={() => {
              setSelectedId("");
              setSelectedAsset(null);
            }}
          >
            Limpiar
          </button>
        </div>
      ) : null}

      {isOpen ? (
        <div id={inputId} className="admin-media-picker__panel">
          <div className="admin-media-picker__toolbar">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre"
              className="admin-media-picker__search"
            />
            <span className="admin-media-picker__count">
              {canSearch ? `${results.length} resultados` : "mín. 2 caracteres"}
            </span>
          </div>

          {!canSearch ? (
            <p className="admin-media-picker__message">
              Escribí al menos 2 caracteres para buscar assets.
            </p>
          ) : null}

          {status === "loading" ? (
            <p className="admin-media-picker__message">Buscando assets...</p>
          ) : null}

          {status === "error" ? (
            <p className="admin-media-picker__message">No se pudo buscar assets.</p>
          ) : null}

          {canSearch && status === "idle" ? (
            <div className="admin-media-picker__grid admin-media-picker__grid--compact">
              {results.map((asset) => {
                const isSelected = asset.id === selectedId;

                return (
                  <button
                    key={asset.id}
                    type="button"
                    className={`admin-media-picker__card admin-media-picker__card--compact${
                      isSelected ? " is-selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedId(asset.id);
                      setSelectedAsset(asset);
                      setIsOpen(false);
                    }}
                  >
                    <div className="admin-media-picker__card-body">
                      <strong>{asset.title || asset.fileName}</strong>
                      <span>{asset.kind}</span>
                      <small>{asset.fileName}</small>
                    </div>
                  </button>
                );
              })}
              {results.length === 0 ? (
                <p className="admin-media-picker__message">No hay resultados para esa búsqueda.</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useId, useState } from "react";
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
  assets: MediaPickerAsset[];
  defaultValue?: string | null;
  allowedKinds?: string[];
  emptyLabel?: string;
};

function buildSearchText(asset: MediaPickerAsset) {
  return `${asset.title ?? ""} ${asset.fileName} ${asset.kind}`.toLowerCase();
}

export function MediaPicker({
  name,
  assets,
  defaultValue = "",
  allowedKinds,
  emptyLabel = "Sin asset",
}: MediaPickerProps) {
  const [selectedId, setSelectedId] = useState(defaultValue || "");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputId = useId();
  const visibleAssets = assets.filter((asset) =>
    allowedKinds?.length ? allowedKinds.includes(asset.kind) : true,
  );
  const filteredAssets = visibleAssets.filter((asset) =>
    query ? buildSearchText(asset).includes(query.trim().toLowerCase()) : true,
  );
  const selectedAsset = visibleAssets.find((asset) => asset.id === selectedId) ?? null;
  const selectedImageUrl = selectedAsset
    ? getStoragePublicUrl({
        bucket: selectedAsset.bucket,
        objectPath: selectedAsset.objectPath,
      })
    : "";

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
            onClick={() => setSelectedId("")}
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
              placeholder="Buscar por nombre, archivo o tipo"
              className="admin-media-picker__search"
            />
            <span className="admin-media-picker__count">{filteredAssets.length} assets</span>
          </div>

          <div className="admin-media-picker__grid">
            {filteredAssets.map((asset) => {
              const imageUrl = getStoragePublicUrl({
                bucket: asset.bucket,
                objectPath: asset.objectPath,
              });
              const isSelected = asset.id === selectedId;

              return (
                <button
                  key={asset.id}
                  type="button"
                  className={`admin-media-picker__card${isSelected ? " is-selected" : ""}`}
                  onClick={() => {
                    setSelectedId(asset.id);
                    setIsOpen(false);
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={asset.title || asset.fileName}
                      className="admin-media-picker__card-image"
                    />
                  ) : (
                    <div className="admin-media-picker__card-placeholder">Privado</div>
                  )}
                  <div className="admin-media-picker__card-body">
                    <strong>{asset.title || asset.fileName}</strong>
                    <span>{asset.kind}</span>
                    <small>{asset.fileName}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

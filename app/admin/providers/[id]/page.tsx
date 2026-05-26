import Link from "next/link";
import { eq } from "drizzle-orm";
import { mediaAssets, providers } from "@/db/schema";
import { MediaPicker } from "@/components/admin/media-picker";
import { requireAdmin } from "@/lib/auth/admin";
import { getDb } from "@/lib/db/client";
import { getStoragePublicUrl } from "@/lib/media/url";
import { updateProviderAction } from "../actions";

export default async function ProviderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin({ roles: ["superadmin", "sales"] });
  const { id } = await params;
  const provider = await getDb().query.providers.findFirst({
    where: eq(providers.id, id),
  });

  if (!provider) {
    return (
      <section className="admin-card">
        <h1>Proveedor no encontrado</h1>
      </section>
    );
  }

  const selectedImageAsset = provider.imageAssetId
    ? await getDb().query.mediaAssets.findFirst({
        where: eq(mediaAssets.id, provider.imageAssetId),
      })
    : null;
  const selectedImageUrl = selectedImageAsset
    ? getStoragePublicUrl({
        bucket: selectedImageAsset.bucket,
        objectPath: selectedImageAsset.objectPath,
      })
    : "";

  return (
    <section className="admin-card">
      <p className="admin-eyebrow">Proveedor</p>
      <h1>{provider.name}</h1>
      {selectedImageUrl ? (
        <div className="admin-asset-preview">
          <img src={selectedImageUrl} alt={provider.name} className="admin-asset-preview__image" />
          <div className="admin-asset-preview__meta">
            <strong>Imagen actual</strong>
            <span>{selectedImageAsset?.title || selectedImageAsset?.fileName}</span>
          </div>
        </div>
      ) : null}
      <form action={updateProviderAction} className="admin-form admin-form--two-col">
        <input type="hidden" name="id" value={provider.id} />
        <label className="admin-field">
          <span>Nombre</span>
          <input name="name" defaultValue={provider.name} />
        </label>
        <label className="admin-field">
          <span>Tipo</span>
          <select name="providerType" defaultValue={provider.providerType}>
            <option value="distributor">Distribuidor</option>
            <option value="wholesaler">Mayorista</option>
          </select>
        </label>
        <label className="admin-field">
          <span>Contacto</span>
          <input name="contactName" defaultValue={provider.contactName ?? ""} />
        </label>
        <label className="admin-field">
          <span>Asset imagen</span>
          <MediaPicker
            name="imageAssetId"
            defaultAsset={selectedImageAsset}
            defaultValue={provider.imageAssetId}
            allowedKinds={["general", "provider-image"]}
          />
          <Link href="/admin/media" className="admin-link-inline">
            Abrir media library
          </Link>
        </label>
        <label className="admin-field">
          <span>Email</span>
          <input name="email" defaultValue={provider.email ?? ""} />
        </label>
        <label className="admin-field">
          <span>Teléfono</span>
          <input name="phone" defaultValue={provider.phone ?? ""} />
        </label>
        <label className="admin-field admin-field--full">
          <span>Dirección</span>
          <input name="address" defaultValue={provider.address ?? ""} />
        </label>
        <label className="admin-field">
          <span>Ciudad</span>
          <input name="city" defaultValue={provider.city ?? ""} />
        </label>
        <label className="admin-field">
          <span>Provincia</span>
          <input name="province" defaultValue={provider.province ?? ""} />
        </label>
        <label className="admin-field">
          <span>País</span>
          <input name="country" defaultValue={provider.country} />
        </label>
        <label className="admin-field">
          <span>Estado</span>
          <select name="status" defaultValue={provider.status}>
            <option value="lead">lead</option>
            <option value="approved">approved</option>
            <option value="inactive">inactive</option>
            <option value="rejected">rejected</option>
          </select>
        </label>
        <label className="admin-field">
          <span>Instagram</span>
          <input name="instagram" defaultValue={provider.instagram ?? ""} />
        </label>
        <label className="admin-field">
          <span>Website</span>
          <input name="website" defaultValue={provider.website ?? ""} />
        </label>
        <label className="admin-field">
          <span>Latitud</span>
          <input name="latitude" defaultValue={provider.latitude ?? ""} />
        </label>
        <label className="admin-field">
          <span>Longitud</span>
          <input name="longitude" defaultValue={provider.longitude ?? ""} />
        </label>
        <label className="admin-field admin-field--full">
          <span>Notas internas</span>
          <textarea name="internalNotes" rows={5} defaultValue={provider.internalNotes ?? ""} />
        </label>
        <div className="admin-actions">
          <button className="admin-submit-button" type="submit">
            Guardar proveedor
          </button>
          <Link href="/admin/providers" className="admin-link-button">
            Volver al listado
          </Link>
        </div>
      </form>
    </section>
  );
}

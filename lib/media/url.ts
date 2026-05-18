type MediaUrlRef = {
  bucket?: string | null | undefined;
  objectPath?: string | null | undefined;
};

function toPublicPath(path: string | null | undefined) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) return path;
  return `/${path.replace(/^\/+/, "")}`;
}

function encodeObjectPath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function getStoragePublicUrl(ref: MediaUrlRef) {
  if (!ref.bucket || !ref.objectPath) return "";
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
  if (!baseUrl) return "";
  return `${baseUrl}/storage/v1/object/public/${encodeURIComponent(ref.bucket)}/${encodeObjectPath(ref.objectPath)}`;
}

export function resolvePublicMediaUrl(ref: MediaUrlRef, fallbackPath?: string | null) {
  return getStoragePublicUrl(ref) || toPublicPath(fallbackPath);
}

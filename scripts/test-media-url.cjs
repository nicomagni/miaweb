const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const moduleRef = { exports: {} };
const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../lib/media/url.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
vm.runInNewContext(source, {
  module: moduleRef,
  exports: moduleRef.exports,
  process: { env: { NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co/" } },
});
const { resolvePublicMediaUrl } = moduleRef.exports;

for (const original of [
  "hilados/rendimax/m051-arena (1).webp",
  "hilados/3-16/316arena-1 (1).webp",
  "hilados/2-7/m501 -  fucsia.webp",
  "hilados/4-7/m604-  azul francia - 47 (1).webp",
  "hilados/amelie/m054 monta\u00f1a.webp",
]) {
  test(`legacy filename is preserved: ${original}`, () => {
    const sanitized = original
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._ /-]/g, "")
      .replace(/\s+/g, " ");
    assert.equal(
      resolvePublicMediaUrl(
        { bucket: "site-public", objectPath: `legacy/${sanitized}` },
        `/images/${original}`,
      ),
      `/images/${original}`,
    );
  });
}

test("legacy asset without original path uses actual Storage URL", () => {
  assert.equal(
    resolvePublicMediaUrl({ bucket: "site-public", objectPath: "legacy/a b.webp" }),
    "https://example.supabase.co/storage/v1/object/public/site-public/legacy/a%20b.webp",
  );
});

test("uploaded assets still take precedence over fallback", () => {
  assert.equal(
    resolvePublicMediaUrl({ bucket: "collections", objectPath: "new.webp" }, "/old.webp"),
    "https://example.supabase.co/storage/v1/object/public/collections/new.webp",
  );
});

test("unlinked asset uses root-relative fallback", () => {
  assert.equal(resolvePublicMediaUrl({}, "images/original.webp"), "/images/original.webp");
  assert.equal(resolvePublicMediaUrl({}), "");
});

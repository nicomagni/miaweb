const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");

function load(file, overrides = {}) {
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(
    source,
    {
      module,
      Error,
      exports: module.exports,
      console,
      require(name) {
        if (name in overrides) return overrides[name];
        if (name.startsWith("@/")) {
          const target = name.slice(2);
          return load(`${target}${target === "db/schema" ? "/index" : ""}.ts`, overrides);
        }
        if (name.startsWith("."))
          return load(path.join(path.dirname(file), `${name}.ts`), overrides);
        return require(name);
      },
    },
    { filename: file },
  );
  return module.exports;
}

function setup({ failure, missing = false, denied = false } = {}) {
  const writes = [],
    paths = [];
  const id = "8fa650ea-e2da-48ea-b77c-7451f971e626";
  const db = {};
  for (const operation of ["insert", "update", "delete"]) {
    db[operation] = () => {
      const query = {
        values(value) {
          writes.push({ operation, value });
          return query;
        },
        set(value) {
          writes.push({ operation, value });
          return query;
        },
        where() {
          if (operation === "delete") writes.push({ operation });
          return query;
        },
        async returning() {
          if (failure) throw failure;
          return missing ? [] : [{ id }];
        },
      };
      return query;
    };
  }
  const actions = load("app/admin/providers/actions.ts", {
    "@/db/schema": { providers: { id: "id" } },
    "@/lib/auth/admin": {
      async requireAdmin({ roles }) {
        assert.deepEqual(Array.from(roles), ["superadmin", "sales"]);
        if (denied) throw new Error("unauthorized");
        return { id };
      },
    },
    "@/lib/db/client": { getDb: () => db },
    "next/cache": { revalidatePath: (value) => paths.push(value) },
    "next/navigation": {
      redirect: (url) => {
        throw new Error(`redirect:${url}`);
      },
    },
  });
  const form = (fields = {}) => {
    const data = new FormData();
    for (const [key, value] of Object.entries({
      id,
      name: "Distribuidor de prueba",
      status: "approved",
      ...fields,
    }))
      data.set(key, value);
    return data;
  };
  return { actions, writes, paths, form, id };
}

test("invalid email returns an actionable error without writing on create or update", async () => {
  const s = setup();
  for (const action of [s.actions.createProviderAction, s.actions.updateProviderAction]) {
    const result = await action({}, s.form({ email: "invalido" }));
    assert.match(result.issues.join(" "), /Email:/);
  }
  assert.equal(s.writes.length, 0);
});

test("normalizes whitespace and decimal commas; edits preserve the slug and refresh the public map", async () => {
  const s = setup();
  const result = await s.actions.updateProviderAction(
    {},
    s.form({ email: "  prueba@ejemplo.com  ", latitude: "-34,5", longitude: "-58,4" }),
  );
  assert.ok(result.success);
  assert.equal(s.writes[0].value.email, "prueba@ejemplo.com");
  assert.equal(s.writes[0].value.latitude, "-34.5");
  assert.equal(s.writes[0].value.longitude, "-58.4");
  assert.equal("slug" in s.writes[0].value, false);
  assert.ok(s.paths.includes("/"));
});

test("same-name providers receive different slugs and redirect after creation", async () => {
  const s = setup();
  for (let i = 0; i < 2; i++)
    await assert.rejects(
      s.actions.createProviderAction({}, s.form()),
      /redirect:\/admin\/providers\//,
    );
  assert.notEqual(s.writes[0].value.slug, s.writes[1].value.slug);
});

test("invalid URL and out-of-range coordinates are handled before writing", async () => {
  const s = setup();
  const result = await s.actions.updateProviderAction(
    {},
    s.form({ website: "ejemplo.com", latitude: "91", longitude: "abc" }),
  );
  assert.equal(result.issues.length, 3);
  assert.equal(s.writes.length, 0);
});

test("database failures return a recoverable form error", async () => {
  const s = setup({ failure: new Error("query failed", { cause: { code: "23503" } }) });
  for (const action of [
    s.actions.createProviderAction,
    s.actions.updateProviderAction,
    s.actions.deleteProviderAction,
  ]) {
    assert.match((await action({}, s.form())).error, /Intentá nuevamente/);
  }
});

test("delete validates the ID and handles already-deleted records", async () => {
  const s = setup({ missing: true });
  assert.match(
    (await s.actions.deleteProviderAction({}, s.form({ id: "invalid" }))).error,
    /no es válido/,
  );
  assert.equal(s.writes.length, 0);
  assert.match((await s.actions.deleteProviderAction({}, s.form())).error, /ya no existe/);
});

test("deletion is independent of invalid contact fields and refreshes the public page", async () => {
  const s = setup();
  await assert.rejects(
    s.actions.deleteProviderAction({}, s.form({ email: "invalid" })),
    /redirect:\/admin\/providers$/,
  );
  assert.equal(s.writes[0].operation, "delete");
  assert.ok(s.paths.includes("/"));
});

test("all mutations enforce admin authentication before writing", async () => {
  const s = setup({ denied: true });
  for (const action of [
    s.actions.createProviderAction,
    s.actions.updateProviderAction,
    s.actions.deleteProviderAction,
  ]) {
    await assert.rejects(action({}, s.form()), /unauthorized/);
  }
  assert.equal(s.writes.length, 0);
});

import {
  createAuthorizationCode,
  getOAuthClient,
  isAllowedRedirectUri,
  isAllowedResource,
  parseScopes,
  verifyAdminSecret,
} from "@/lib/mcp/oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function oauthError(error: string, errorDescription: string, status = 400) {
  return Response.json(
    {
      error,
      error_description: errorDescription,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function htmlPage(params: URLSearchParams, clientName: string) {
  const hiddenFields = [
    "client_id",
    "redirect_uri",
    "response_type",
    "code_challenge",
    "code_challenge_method",
    "scope",
    "state",
    "resource",
  ]
    .map((name) => {
      const value = params.get(name);
      return value === null
        ? ""
        : `<input type="hidden" name="${name}" value="${escapeHtml(value)}" />`;
    })
    .join("");

  return `<!doctype html>
<html lang="es-AR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Autorizar MCP - Mía Hilados</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f6f3ef; color: #1f2933; margin: 0; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      section { width: min(520px, 100%); background: #fff; border: 1px solid #e8dfd4; border-radius: 8px; padding: 28px; box-shadow: 0 12px 32px rgba(31, 41, 51, 0.08); }
      h1 { margin: 0 0 8px; color: #6f4e37; font-size: 24px; }
      p { line-height: 1.5; }
      label { display: grid; gap: 6px; margin: 20px 0; font-weight: 600; }
      input[type="password"] { border: 1px solid #d8cabc; border-radius: 6px; padding: 12px; font-size: 16px; }
      button { background: #6f4e37; border: 0; border-radius: 6px; color: white; cursor: pointer; font-size: 16px; font-weight: 700; padding: 12px 16px; }
      small { color: #64748b; display: block; margin-top: 16px; }
    </style>
  </head>
  <body>
    <main>
      <section>
        <h1>Autorizar backoffice MCP</h1>
        <p><strong>${escapeHtml(clientName)}</strong> solicita acceso al MCP de Mía Hilados para leer formularios y actualizar estados internos.</p>
        <form method="post">
          ${hiddenFields}
          <label>
            Clave de autorización MCP
            <input name="admin_secret" type="password" autocomplete="current-password" required autofocus />
          </label>
          <button type="submit">Autorizar conexión</button>
        </form>
        <small>No autorices esta conexión si no la iniciaste vos desde Claude, OpenAI o MCP Inspector.</small>
      </section>
    </main>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function validateAuthorizationRequest(request: Request, formData?: FormData) {
  const source = formData ?? new URL(request.url).searchParams;
  const clientId = String(source.get("client_id") ?? "");
  const redirectUri = String(source.get("redirect_uri") ?? "");
  const responseType = String(source.get("response_type") ?? "");
  const codeChallenge = String(source.get("code_challenge") ?? "");
  const codeChallengeMethod = String(source.get("code_challenge_method") ?? "");
  const scope = String(source.get("scope") ?? "");
  const state = String(source.get("state") ?? "");
  const resource = String(source.get("resource") ?? "");

  if (!clientId || !redirectUri || responseType !== "code") {
    return {
      ok: false as const,
      response: oauthError("invalid_request", "Invalid authorization request."),
    };
  }

  if (!codeChallenge || codeChallengeMethod !== "S256") {
    return {
      ok: false as const,
      response: oauthError("invalid_request", "PKCE S256 is required."),
    };
  }

  if (resource && !isAllowedResource(request, resource)) {
    return { ok: false as const, response: oauthError("invalid_target", "Invalid resource.") };
  }

  const client = await getOAuthClient(clientId);

  if (!client) {
    return { ok: false as const, response: oauthError("invalid_client", "Invalid client_id.") };
  }

  if (!isAllowedRedirectUri(redirectUri, client.redirectUris)) {
    return {
      ok: false as const,
      response: oauthError("invalid_request", "Unregistered redirect_uri."),
    };
  }

  return {
    ok: true as const,
    client,
    params: {
      clientId,
      redirectUri,
      codeChallenge,
      scopes: parseScopes(scope),
      state,
      resource: resource || undefined,
    },
  };
}

export async function GET(request: Request) {
  const validation = await validateAuthorizationRequest(request);

  if (!validation.ok) {
    return validation.response;
  }

  return new Response(
    htmlPage(new URL(request.url).searchParams, validation.client.clientName ?? "Cliente MCP"),
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const validation = await validateAuthorizationRequest(request, formData);

  if (!validation.ok) {
    return validation.response;
  }

  if (!verifyAdminSecret(String(formData.get("admin_secret") ?? ""))) {
    return oauthError("access_denied", "Invalid MCP authorization secret.", 403);
  }

  const code = await createAuthorizationCode(validation.params);
  const redirectUrl = new URL(validation.params.redirectUri);

  redirectUrl.searchParams.set("code", code);

  if (validation.params.state) {
    redirectUrl.searchParams.set("state", validation.params.state);
  }

  return Response.redirect(redirectUrl, 302);
}

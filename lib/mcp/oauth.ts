import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { mcpOauthAuthorizationCodes, mcpOauthClients, mcpOauthTokens } from "@/db/schema";
import { getDb } from "@/lib/db/client";

export const MCP_OAUTH_SCOPES = ["backoffice:read", "backoffice:write"] as const;

const tokenEndpointAuthMethods = new Set(["none", "client_secret_post"]);

export type OAuthClientRegistration = {
  redirect_uris: string[];
  token_endpoint_auth_method?: string;
  grant_types?: string[];
  response_types?: string[];
  client_name?: string;
  client_uri?: string;
  logo_uri?: string;
  scope?: string;
  contacts?: string[];
  tos_uri?: string;
  policy_uri?: string;
  jwks_uri?: string;
  jwks?: unknown;
  software_id?: string;
  software_version?: string;
  software_statement?: string;
};

export const clientRegistrationSchema = z.object({
  redirect_uris: z.array(z.string().url()).min(1),
  token_endpoint_auth_method: z.string().optional().default("none"),
  grant_types: z.array(z.string()).optional(),
  response_types: z.array(z.string()).optional(),
  client_name: z.string().optional(),
  client_uri: z.string().url().optional(),
  logo_uri: z.string().url().or(z.literal("")).optional(),
  scope: z.string().optional(),
  contacts: z.array(z.string()).optional(),
  tos_uri: z.string().url().or(z.literal("")).optional(),
  policy_uri: z.string().optional(),
  jwks_uri: z.string().url().optional(),
  jwks: z.unknown().optional(),
  software_id: z.string().optional(),
  software_version: z.string().optional(),
  software_statement: z.string().optional(),
});

export function getBaseUrl(request: Request) {
  const configuredBaseUrl = process.env.MIA_MCP_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");

  if (host) {
    return `${forwardedProto ?? "https"}://${host}`.replace(/\/$/, "");
  }

  return new URL(request.url).origin.replace(/\/$/, "");
}

export function getMcpResourceUrl(request: Request) {
  return `${getBaseUrl(request)}/api/mcp`;
}

export function getProtectedResourceMetadataUrl(request: Request) {
  return `${getBaseUrl(request)}/.well-known/oauth-protected-resource/api/mcp`;
}

export function getIssuerUrl(request: Request) {
  return getBaseUrl(request);
}

export function getAuthorizationServerMetadata(request: Request) {
  const baseUrl = getBaseUrl(request);

  return {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/api/mcp/oauth/authorize`,
    token_endpoint: `${baseUrl}/api/mcp/oauth/token`,
    registration_endpoint: `${baseUrl}/api/mcp/oauth/register`,
    revocation_endpoint: `${baseUrl}/api/mcp/oauth/revoke`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post"],
    revocation_endpoint_auth_methods_supported: ["none", "client_secret_post"],
    code_challenge_methods_supported: ["S256"],
    scopes_supported: MCP_OAUTH_SCOPES,
  };
}

export function getProtectedResourceMetadata(request: Request) {
  return {
    resource: getMcpResourceUrl(request),
    authorization_servers: [getIssuerUrl(request)],
    scopes_supported: MCP_OAUTH_SCOPES,
    bearer_methods_supported: ["header"],
    resource_name: "Mía Hilados Backoffice MCP",
  };
}

export function jsonResponse(payload: unknown, init: ResponseInit = {}) {
  return Response.json(payload, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init.headers ?? {}),
    },
  });
}

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export function hashSecret(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

export function verifySecret(secret: string, expectedHash: string | null | undefined) {
  if (!expectedHash) {
    return false;
  }

  const actual = Buffer.from(hashSecret(secret), "hex");
  const expected = Buffer.from(expectedHash, "hex");

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function verifyAdminSecret(secret: string) {
  const configuredSecret = process.env.MIA_MCP_OAUTH_ADMIN_SECRET;

  if (!configuredSecret) {
    return false;
  }

  const actual = Buffer.from(secret);
  const expected = Buffer.from(configuredSecret);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function parseScopes(scope: string | null | undefined) {
  const requested = (scope ?? "").split(/\s+/).filter(Boolean);

  if (!requested.length) {
    return [...MCP_OAUTH_SCOPES];
  }

  return requested.filter((value) =>
    MCP_OAUTH_SCOPES.includes(value as (typeof MCP_OAUTH_SCOPES)[number]),
  );
}

export function normalizeScopes(scopes: string[]) {
  return [...new Set(scopes)].sort().join(" ");
}

export function isAllowedRedirectUri(requested: string, registeredUris: string[]) {
  if (registeredUris.includes(requested)) {
    return true;
  }

  try {
    const requestedUrl = new URL(requested);

    if (!["localhost", "127.0.0.1", "[::1]"].includes(requestedUrl.hostname)) {
      return false;
    }

    return registeredUris.some((registered) => {
      const registeredUrl = new URL(registered);

      return (
        requestedUrl.protocol === registeredUrl.protocol &&
        requestedUrl.hostname === registeredUrl.hostname &&
        requestedUrl.pathname === registeredUrl.pathname &&
        requestedUrl.search === registeredUrl.search
      );
    });
  } catch {
    return false;
  }
}

export function isAllowedResource(request: Request, resource: string | null | undefined) {
  if (!resource) {
    return true;
  }

  return resource.replace(/\/$/, "") === getMcpResourceUrl(request).replace(/\/$/, "");
}

export async function registerOAuthClient(input: OAuthClientRegistration) {
  const parsed = clientRegistrationSchema.parse(input);
  const tokenEndpointAuthMethod = parsed.token_endpoint_auth_method ?? "none";

  if (!tokenEndpointAuthMethods.has(tokenEndpointAuthMethod)) {
    return {
      ok: false as const,
      status: 400,
      payload: {
        error: "invalid_client_metadata",
        error_description: "Unsupported token_endpoint_auth_method.",
      },
    };
  }

  const clientId = `mia_${randomToken(24)}`;
  const clientSecret =
    tokenEndpointAuthMethod === "none" ? undefined : `mia_secret_${randomToken(32)}`;
  const nowSeconds = Math.floor(Date.now() / 1000);
  const metadata = {
    ...parsed,
    token_endpoint_auth_method: tokenEndpointAuthMethod,
  };

  await getDb()
    .insert(mcpOauthClients)
    .values({
      clientId,
      clientSecretHash: clientSecret ? hashSecret(clientSecret) : null,
      redirectUris: parsed.redirect_uris,
      clientName: parsed.client_name ?? null,
      tokenEndpointAuthMethod,
      metadata,
    });

  return {
    ok: true as const,
    status: 201,
    payload: {
      ...metadata,
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: nowSeconds,
      client_secret_expires_at: clientSecret ? 0 : undefined,
    },
  };
}

export async function getOAuthClient(clientId: string) {
  return getDb().query.mcpOauthClients.findFirst({
    where: eq(mcpOauthClients.clientId, clientId),
  });
}

export async function createAuthorizationCode(input: {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  scopes: string[];
  resource?: string;
}) {
  const code = randomToken(32);

  await getDb()
    .insert(mcpOauthAuthorizationCodes)
    .values({
      codeHash: hashSecret(code),
      clientId: input.clientId,
      redirectUri: input.redirectUri,
      codeChallenge: input.codeChallenge,
      scopes: normalizeScopes(input.scopes),
      resource: input.resource ?? null,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

  return code;
}

export async function consumeAuthorizationCode(code: string) {
  const db = getDb();
  const codeHash = hashSecret(code);
  const existing = await db.query.mcpOauthAuthorizationCodes.findFirst({
    where: eq(mcpOauthAuthorizationCodes.codeHash, codeHash),
  });

  if (!existing || existing.usedAt || existing.expiresAt.getTime() < Date.now()) {
    return null;
  }

  await db
    .update(mcpOauthAuthorizationCodes)
    .set({ usedAt: new Date() })
    .where(eq(mcpOauthAuthorizationCodes.codeHash, codeHash));

  return existing;
}

export async function issueOAuthTokens(input: {
  clientId: string;
  scopes: string;
  resource: string | null;
}) {
  const accessToken = `mia_at_${randomToken(32)}`;
  const refreshToken = `mia_rt_${randomToken(32)}`;
  const expiresIn = 60 * 60;

  await getDb()
    .insert(mcpOauthTokens)
    .values({
      tokenHash: hashSecret(accessToken),
      refreshTokenHash: hashSecret(refreshToken),
      clientId: input.clientId,
      scopes: input.scopes,
      resource: input.resource,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
      refreshExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

  return {
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: expiresIn,
    refresh_token: refreshToken,
    scope: input.scopes,
  };
}

export async function refreshOAuthToken(refreshToken: string, resource?: string) {
  const db = getDb();
  const token = await db.query.mcpOauthTokens.findFirst({
    where: eq(mcpOauthTokens.refreshTokenHash, hashSecret(refreshToken)),
  });

  if (
    !token ||
    token.revokedAt ||
    !token.refreshExpiresAt ||
    token.refreshExpiresAt.getTime() < Date.now()
  ) {
    return null;
  }

  const accessToken = `mia_at_${randomToken(32)}`;
  const expiresIn = 60 * 60;

  await db
    .update(mcpOauthTokens)
    .set({
      tokenHash: hashSecret(accessToken),
      resource: resource ?? token.resource,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
    })
    .where(eq(mcpOauthTokens.refreshTokenHash, hashSecret(refreshToken)));

  return {
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: expiresIn,
    refresh_token: refreshToken,
    scope: token.scopes,
  };
}

export async function verifyOAuthAccessToken(token: string) {
  const row = await getDb().query.mcpOauthTokens.findFirst({
    where: eq(mcpOauthTokens.tokenHash, hashSecret(token)),
  });

  if (!row || row.revokedAt || row.expiresAt.getTime() < Date.now()) {
    return null;
  }

  return {
    token,
    clientId: row.clientId,
    scopes: row.scopes.split(/\s+/).filter(Boolean),
    expiresAt: Math.floor(row.expiresAt.getTime() / 1000),
    resource: row.resource ? new URL(row.resource) : undefined,
  };
}

export async function revokeOAuthToken(token: string) {
  const tokenHash = hashSecret(token);
  const db = getDb();
  await db
    .update(mcpOauthTokens)
    .set({ revokedAt: new Date() })
    .where(eq(mcpOauthTokens.tokenHash, tokenHash));
  await db
    .update(mcpOauthTokens)
    .set({ revokedAt: new Date() })
    .where(eq(mcpOauthTokens.refreshTokenHash, tokenHash));
}

export async function authenticateOAuthClient(formData: FormData) {
  const clientId = String(formData.get("client_id") ?? "");
  const clientSecret = String(formData.get("client_secret") ?? "");

  if (!clientId) {
    return null;
  }

  const client = await getOAuthClient(clientId);

  if (!client) {
    return null;
  }

  if (client.tokenEndpointAuthMethod === "none") {
    return client;
  }

  if (!clientSecret || !verifySecret(clientSecret, client.clientSecretHash)) {
    return null;
  }

  return client;
}

export async function verifyPkce(codeVerifier: string, codeChallenge: string) {
  const actual = createHash("sha256").update(codeVerifier).digest("base64url");

  return actual === codeChallenge;
}

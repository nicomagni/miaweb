import {
  authenticateOAuthClient,
  consumeAuthorizationCode,
  issueOAuthTokens,
  isAllowedResource,
  jsonResponse,
  refreshOAuthToken,
  verifyPkce,
} from "@/lib/mcp/oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenError(error: string, errorDescription: string, status = 400) {
  return jsonResponse(
    {
      error,
      error_description: errorDescription,
    },
    { status },
  );
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const client = await authenticateOAuthClient(formData);

  if (!client) {
    return tokenError("invalid_client", "Invalid OAuth client.", 401);
  }

  const grantType = String(formData.get("grant_type") ?? "");

  if (grantType === "authorization_code") {
    const code = String(formData.get("code") ?? "");
    const codeVerifier = String(formData.get("code_verifier") ?? "");
    const redirectUri = String(formData.get("redirect_uri") ?? "");
    const resource = String(formData.get("resource") ?? "");

    if (!code || !codeVerifier) {
      return tokenError("invalid_request", "Missing code or code_verifier.");
    }

    if (resource && !isAllowedResource(request, resource)) {
      return tokenError("invalid_target", "Invalid resource.");
    }

    const authorizationCode = await consumeAuthorizationCode(code);

    if (
      !authorizationCode ||
      authorizationCode.clientId !== client.clientId ||
      (redirectUri && authorizationCode.redirectUri !== redirectUri)
    ) {
      return tokenError("invalid_grant", "Invalid authorization code.");
    }

    if (!(await verifyPkce(codeVerifier, authorizationCode.codeChallenge))) {
      return tokenError("invalid_grant", "Invalid PKCE verifier.");
    }

    const tokens = await issueOAuthTokens({
      clientId: client.clientId,
      scopes: authorizationCode.scopes,
      resource: resource || authorizationCode.resource,
    });

    return jsonResponse(tokens);
  }

  if (grantType === "refresh_token") {
    const refreshToken = String(formData.get("refresh_token") ?? "");
    const resource = String(formData.get("resource") ?? "");

    if (!refreshToken) {
      return tokenError("invalid_request", "Missing refresh_token.");
    }

    if (resource && !isAllowedResource(request, resource)) {
      return tokenError("invalid_target", "Invalid resource.");
    }

    const tokens = await refreshOAuthToken(refreshToken, resource || undefined);

    if (!tokens) {
      return tokenError("invalid_grant", "Invalid refresh token.");
    }

    return jsonResponse(tokens);
  }

  return tokenError("unsupported_grant_type", "Unsupported grant type.");
}

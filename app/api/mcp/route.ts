import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createAdminMcpServer } from "@/lib/mcp/admin-server";
import { getProtectedResourceMetadataUrl, verifyOAuthAccessToken } from "@/lib/mcp/oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Authorization, Content-Type, Last-Event-ID, MCP-Protocol-Version, mcp-session-id",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version, mcp-session-id",
};

function unauthorizedResponse(request: Request) {
  return Response.json(
    { ok: false, error: "Unauthorized MCP request." },
    {
      status: 401,
      headers: {
        ...corsHeaders,
        "WWW-Authenticate": `Bearer realm="mia-hilados-mcp", resource_metadata="${getProtectedResourceMetadataUrl(
          request,
        )}"`,
      },
    },
  );
}

async function isAuthorized(request: Request) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return false;
  }

  const bearerToken = authorizationHeader.slice("Bearer ".length).trim();
  const oauthToken = await verifyOAuthAccessToken(bearerToken);

  return Boolean(oauthToken);
}

async function handleMcpRequest(request: Request) {
  if (!(await isAuthorized(request))) {
    return unauthorizedResponse(request);
  }

  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
    sessionIdGenerator: undefined,
  });
  const server = createAdminMcpServer();
  await server.connect(transport);
  const response = await transport.handleRequest(request);
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(corsHeaders)) {
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request: Request) {
  return handleMcpRequest(request);
}

export async function POST(request: Request) {
  return handleMcpRequest(request);
}

export async function DELETE(request: Request) {
  return handleMcpRequest(request);
}

import { MyMCP } from './my-mcp';

// Durable Objects のエクスポート
export { MyMCP };

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    // /sse エンドポイントの場合は SSE で応答する
    if (url.pathname === '/sse' || url.pathname === '/sse/message') {
      return MyMCP.serveSSE('/sse').fetch(request, env, ctx);
    }

    // /mcp エンドポイントの場合は Streamable HTTP で応答する
    if (url.pathname === '/mcp') {
      return MyMCP.serve('/mcp').fetch(request, env, ctx);
    }

    return new Response('Not found', { status: 404 });
  },
};

import { createServer, request as httpRequest } from 'node:http';
import { describe, expect, it } from 'vitest';
import { silentLogger } from '@baocut/harness';
import { McpEndpoint } from './mcp-endpoint.ts';
import { ToolCatalog } from './tool-catalog.ts';

// Both the agent bridge and external MCP service use this endpoint.
describe('local MCP submissions', () => {
  for (const chunked of [false, true]) {
    it(`accepts bodies above the former 1 MiB and proposed 8 MiB limits (${chunked ? 'chunked' : 'content-length'})`, async () => {
      const endpoint = new McpEndpoint({ tools: new ToolCatalog([], silentLogger), authenticate: () => ({ kind: 'local', connectionId: 'test', client: 'cli', cwd: '/tmp', projectDir: null, name: 'test' }), log: silentLogger });
      const server = createServer((request, response) => endpoint.handle(request, response));
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
      const port = (server.address() as { port: number }).port;
      try {
        const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping', params: { document: '词'.repeat(3 * 1024 * 1024) } });
        const result = await new Promise<{ status: number; body: string }>((resolve, reject) => {
          const request = httpRequest({ hostname: '127.0.0.1', port, path: '/mcp', method: 'POST', headers: { 'Content-Type': 'application/json', ...(chunked ? {} : { 'Content-Length': Buffer.byteLength(body) }) } }, (response) => {
            let text = '';
            response.on('data', (part) => text += part);
            response.on('end', () => resolve({ status: response.statusCode!, body: text }));
          });
          request.on('error', reject);
          if (chunked) { request.write(body.slice(0, 500000)); request.end(body.slice(500000)); }
          else request.end(body);
        });
        expect(result.status).toBe(200);
        expect(JSON.parse(result.body)).toEqual({ jsonrpc: '2.0', id: 1, result: {} });
      } finally {
        await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
      }
    });
  }
});

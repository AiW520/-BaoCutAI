/**
 * `/docs/<grant>/api/mux`：编辑器（原 Claude Docs 应用的独立模式）唯一的长连接（docs/design/docs §4）。
 * 文本帧是 JSON（`sub` / `unsub` / `msg` / `ping`）；二进制帧以「2 字节小端长度 + 标签」开头，标签是 `~d:<rid>:<o|b>:<地址>`
 * 时是一次 door 调用（`o` 单个、`b` batch），用 `{op:"doorack", rid, status, body}` 回复（body 是 JSON 字符串）。
 */
import type { IncomingMessage } from 'node:http';
import type { Duplex } from 'node:stream';
import { WebSocketServer, type WebSocket } from 'ws';

export interface DoorReply {
  status: number;
  body: unknown;
}

export type DoorCallKind = 'one' | 'batch';

export interface MuxSubscribeFrame {
  op: 'sub';
  topic: string;
  since?: number | string;
  base?: string;
  uid?: string;
}

/** 某一类主题（`chat`、`feed:`、`room:`）的服务端逻辑。 */
export interface TopicHandler {
  matches(topic: string): boolean;
  subscribe?(connection: MuxConnection, frame: MuxSubscribeFrame): void;
  unsubscribe?(connection: MuxConnection, topic: string): void;
  message?(connection: MuxConnection, topic: string, data: string): void;
}

export interface MuxOptions {
  door(address: string, body: string, kind: DoorCallKind, connection: MuxConnection): Promise<DoorReply> | DoorReply;
  topics: TopicHandler[];
  onError?: (message: string, error: unknown) => void;
}

/** 一条 door 调用（含标签）最大多少字节：编辑器整篇粘贴的 ops 也远小于这个数。 */
const MAX_FRAME_BYTES = 32 * 1024 * 1024;

let nextConnectionId = 1;

export class MuxConnection {
  readonly id = `c${nextConnectionId++}`;
  readonly topics = new Set<string>();
  readonly socket: WebSocket;
  readonly query: URLSearchParams;
  /** 这条连接能不能写（Web 服务只读会话为 false）。 */
  readonly canEdit: boolean;

  constructor(socket: WebSocket, query: URLSearchParams, canEdit: boolean) {
    this.socket = socket;
    this.query = query;
    this.canEdit = canEdit;
  }

  send(frame: object): void {
    if (this.socket.readyState === this.socket.OPEN) this.socket.send(JSON.stringify(frame));
  }

  /** 主题消息：feed / room 的 data 是 JSON 字符串，chat 的 data 是对象。 */
  publish(topic: string, data: string | object): void {
    this.send({ op: 'msg', topic, data });
  }

  ack(topic: string): void {
    this.send({ op: 'ack', topic });
  }

  close(): void {
    this.socket.close();
  }
}

export class MuxServer {
  readonly #sockets = new WebSocketServer({ noServer: true, maxPayload: MAX_FRAME_BYTES });
  readonly connections = new Set<MuxConnection>();
  readonly #options: MuxOptions;

  constructor(options: MuxOptions) {
    this.#options = options;
  }

  handleUpgrade(request: IncomingMessage, socket: Duplex, head: Buffer, canEdit: boolean): void {
    const url = new URL(request.url ?? '/', 'http://localhost');
    this.#sockets.handleUpgrade(request, socket, head, (ws) => this.#accept(ws, url.searchParams, canEdit));
  }

  /** 发给订阅了某主题的所有连接（可排除发起方）。 */
  broadcast(topic: string, data: string, except?: unknown): void {
    for (const connection of this.connections) if (connection !== except && connection.topics.has(topic)) connection.publish(topic, data);
  }

  close(): void {
    for (const connection of this.connections) connection.close();
    this.connections.clear();
    this.#sockets.close();
  }

  #accept(ws: WebSocket, query: URLSearchParams, canEdit: boolean): void {
    const connection = new MuxConnection(ws, query, canEdit);
    this.connections.add(connection);
    ws.on('message', (data, isBinary) => {
      const buffer = Array.isArray(data) ? Buffer.concat(data) : Buffer.isBuffer(data) ? data : Buffer.from(data);
      if (isBinary) void this.#onBinary(connection, buffer);
      else this.#onText(connection, buffer.toString('utf8'));
    });
    ws.on('error', (error) => this.#options.onError?.('docs mux socket failed', error));
    ws.on('close', () => {
      for (const topic of connection.topics) this.#handlerFor(topic)?.unsubscribe?.(connection, topic);
      connection.topics.clear();
      this.connections.delete(connection);
    });
  }

  #handlerFor(topic: string): TopicHandler | undefined {
    return this.#options.topics.find((handler) => handler.matches(topic));
  }

  #onText(connection: MuxConnection, text: string): void {
    let frame: { op?: unknown; topic?: unknown; data?: unknown };
    try {
      frame = JSON.parse(text) as typeof frame;
    } catch {
      return;
    }
    if (typeof frame !== 'object' || frame === null) return;
    // 客户端 18 秒收不到任何帧就判定断线
    if (frame.op === 'ping') return connection.send({ op: 'pong' });
    const topic = frame.topic;
    if (typeof topic !== 'string' || topic.length > 512) return;
    const handler = this.#handlerFor(topic);
    if (frame.op === 'sub') {
      connection.topics.add(topic);
      if (handler?.subscribe) handler.subscribe(connection, frame as MuxSubscribeFrame);
      else connection.ack(topic);
    } else if (frame.op === 'unsub') {
      connection.topics.delete(topic);
      handler?.unsubscribe?.(connection, topic);
    } else if (frame.op === 'msg') {
      handler?.message?.(connection, topic, typeof frame.data === 'string' ? frame.data : JSON.stringify(frame.data));
    }
  }

  async #onBinary(connection: MuxConnection, buffer: Buffer): Promise<void> {
    if (buffer.length < 2) return;
    const labelLength = buffer[0]! | (buffer[1]! << 8);
    const label = buffer.subarray(2, 2 + labelLength).toString('utf8');
    const payload = buffer.subarray(2 + labelLength);
    const door = /^~d:(\d+):([ob]):(.*)$/s.exec(label);
    // 本服务没有用二进制帧的主题
    if (!door) return;
    const rid = Number(door[1]);
    const kind: DoorCallKind = door[2] === 'b' ? 'batch' : 'one';
    let reply: DoorReply;
    try {
      reply = await this.#options.door(door[3]!, payload.toString('utf8'), kind, connection);
    } catch (error) {
      this.#options.onError?.('docs door call failed', error);
      reply = { status: 500, body: { verdict: 'deny', reason: 'internal', detail: 'internal error' } };
    }
    connection.send({ op: 'doorack', rid, status: reply.status, body: JSON.stringify(reply.body) });
  }
}

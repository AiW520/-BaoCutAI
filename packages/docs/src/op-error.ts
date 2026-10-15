/** 编辑被拒：`reason` 是机器读的拒绝码，消息给人看。正文编辑、markdown 解析与 door 共用。 */
export class OpError extends Error {
  readonly reason: string;
  readonly data: Record<string, unknown> | undefined;

  constructor(reason: string, detail: string, data?: Record<string, unknown>) {
    super(detail);
    this.name = 'OpError';
    this.reason = reason;
    this.data = data;
  }
}

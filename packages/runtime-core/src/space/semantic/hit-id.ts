import type { Id, SpaceSearchDocumentKind } from '@baocut/protocol';

/**
 * `hitId`（EmbeddingGemma 2 检索集成方案 v0.1 §11.3、§12.2）：自带定位所需的身份，不在服务端存会话状态。解析时（`space.resolveSearchHit`）
 * 按调用方的主体重新核对可见性：知道一个 hitId 不等于能看到它的视频。内容只是身份，不是凭据。
 */
export interface HitIdentity {
  v: 1;
  videoId: Id;
  documentId: Id | null;
  kind: SpaceSearchDocumentKind;
  /** 稳定句子身份；章节是 `marker:<标记 ID>`；字面命中对不回句子时为空。 */
  sentenceIds: string[];
  /** 命中时的视频版本。 */
  revision: string;
  clock: 'sequence' | 'source';
  start: number;
  end: number;
  /** 语义索引的 chunk（字面命中对不回时没有）。 */
  chunkId: string | null;
  text: string;
}

export function encodeHitId(identity: Omit<HitIdentity, 'v'>): string {
  return Buffer.from(JSON.stringify({ v: 1, ...identity }), 'utf8').toString('base64url');
}

export function decodeHitId(hitId: string): HitIdentity | null {
  try {
    const value = JSON.parse(Buffer.from(hitId, 'base64url').toString('utf8')) as HitIdentity;
    if (
      value?.v !== 1 ||
      typeof value.videoId !== 'string' ||
      typeof value.revision !== 'string' ||
      !Array.isArray(value.sentenceIds) ||
      !value.sentenceIds.every((id) => typeof id === 'string') ||
      (value.clock !== 'sequence' && value.clock !== 'source') ||
      typeof value.start !== 'number' ||
      typeof value.end !== 'number' ||
      !['speech', 'caption', 'translation', 'chapter'].includes(value.kind)
    ) {
      return null;
    }
    return { ...value, documentId: value.documentId ?? null, chunkId: value.chunkId ?? null, text: typeof value.text === 'string' ? value.text : '' };
  } catch {
    return null;
  }
}

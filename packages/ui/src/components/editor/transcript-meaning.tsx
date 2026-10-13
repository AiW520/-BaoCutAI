import { useEffect, useRef, useState } from 'react';
import { Button as RACButton } from 'react-aria-components';
import { ToastQueue } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import type { Id, SemanticReason } from '@baocut/protocol';
import { formatClock } from '../../model/format.ts';
import { meaningInVideoRequest, meaningInVideoRows, meaningQueryReady, SEARCH_DEBOUNCE_MS, type SemanticHitRow } from '../../model/space-search.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useConnection } from '../../state/connection-store.ts';
import { SemanticNote } from '../semantic-note.tsx';
import { SPACE_COPY as COPY } from '../space/space-copy.ts';

/*
 * 文稿查找条下面的「意思相近」（创作辅助集成设计 §2.1：编辑器里的查找片段与 Space 搜索是同一服务；设计稿 panel-shared.jsx
 * `FindMeaning`）。字面命中照旧在文稿里高亮；这里只列这部视频里意思相近、原句里没有这些字的句子（`space.searchV2` 限这部视频的
 * 讲话内容），按时间排，点了跳过去。停下打字 300ms 再查，只用最后一次的结果；新结果回来前留着上一次的，免得一闪一闪。
 * 没装模型或索引没好时只有入口的那一句（`SemanticNote entry="search"`），正则查找时不按意思找。
 */

const block = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  paddingTop: '[6px]',
  borderTopWidth: 1,
  borderStartWidth: 0,
  borderEndWidth: 0,
  borderBottomWidth: 0,
  borderStyle: 'solid',
  borderColor: 'gray-200',
});
const head = style({ display: 'flex', alignItems: 'baseline', gap: '[6px]', font: 'ui-xs', fontWeight: 'bold', color: 'gray-800' });
const count = style({ font: 'ui-xs', color: 'gray-600' });
const list = style({ display: 'flex', flexDirection: 'column', gap: 2, margin: 0, padding: 0, listStyleType: 'none' });
const row = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  width: 'full',
  minWidth: 0,
  paddingX: '[6px]',
  paddingY: 4,
  borderRadius: 'default',
  borderWidth: 0,
  backgroundColor: { default: 'transparent', isHovered: 'gray-100', isFocusVisible: 'gray-100' },
  font: 'ui-sm',
  color: 'gray-900',
  textAlign: 'start',
  cursor: 'default',
  outlineStyle: 'none',
});
const time = style({ flexShrink: 0, font: 'code-xs', color: 'accent-1000' });
const text = style({ flexGrow: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });

interface Found {
  key: string;
  rows: SemanticHitRow[];
  reason: SemanticReason | null;
}

export function TranscriptMeaning({ videoId, query, regex, onSeek }: { videoId: Id | null; query: string; regex: boolean; onSeek(seconds: number): void }) {
  const runtime = useRuntime();
  const connected = useConnection((s) => s.state.status === 'connected');
  const [found, setFound] = useState<Found | null>(null);
  const seq = useRef(0);
  const ready = !!videoId && connected && meaningQueryReady(query, regex);
  const key = `${videoId ?? ''}\n${query.trim()}`;

  useEffect(() => {
    const id = ++seq.current;
    if (!ready || !videoId) return;
    const timer = setTimeout(() => {
      runtime.client.request('space.searchV2', meaningInVideoRequest(query, videoId)).then(
        (result) => {
          if (id === seq.current) setFound({ key, rows: meaningInVideoRows(result.hits), reason: result.degraded?.reason ?? null });
        },
        () => {
          if (id === seq.current) setFound(null);
        },
      );
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [runtime, ready, videoId, query, key]);

  // 换了视频就不留上一部的结果。
  if (!ready || !found || !found.key.startsWith(`${videoId}\n`)) return null;
  const open = async (hit: SemanticHitRow) => {
    if (hit.inTimeline && !hit.needsResolve && hit.time.clock === 'sequence') {
      onSeek(hit.time.start);
      return;
    }
    try {
      const resolved = await runtime.client.request('space.resolveSearchHit', { hitId: hit.hitId });
      const span = resolved.spans.find((s) => s.clock === 'sequence');
      if (resolved.status === 'resolved' && span) onSeek(span.startSec);
      else ToastQueue.neutral(resolved.status === 'gone' ? COPY.hitGone : COPY.hitNotInTimeline, { timeout: 5000 });
    } catch {
      ToastQueue.neutral(COPY.hitNotInTimeline, { timeout: 5000 });
    }
  };
  return (
    <>
      <SemanticNote entry="search" reason={found.reason} />
      {found.rows.length ? (
        <section className={block} aria-label={COPY.bySemantic}>
          <div className={head}>
            <span>{COPY.bySemantic}</span>
            <span className={count}>{found.rows.length}</span>
          </div>
          <ul className={list}>
            {found.rows.map((hit) => (
              <li key={hit.hitId}>
                <RACButton className={(state) => row(state)} onPress={() => void open(hit)}>
                  <span className={time}>{formatClock(hit.time.start)}</span>
                  <span className={text} title={hit.snippet}>
                    {hit.snippet.replace(/\s+/g, ' ').trim()}
                  </span>
                </RACButton>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

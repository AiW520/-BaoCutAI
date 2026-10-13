import { useEffect, useMemo, useRef, useState } from 'react';
import type { DocumentRecord, Id, LibrarySelection } from '@baocut/protocol';
import type { GlossaryCandidate } from '../../model/translate-setup.ts';
import type { RuntimeSession } from '../../runtime/session.ts';
import { onLibraryEntries } from '../../state/library-feed.ts';

/*
 * 翻译用术语表的读取（翻译设置页的术语表一节与字幕对照列表的术语一致共用）：库里的翻译用术语表与视频里启用了哪几张。
 */

const messageOf = (error: unknown) => (error instanceof Error ? error.message : String(error));

/** 库里的翻译用术语表（`library` 主题的摘要，再按版本读内容拿方向与词条）。 */
export function useTranslationGlossaries(runtime: RuntimeSession): { ready: boolean; candidates: GlossaryCandidate[] } {
  const [summaries, setSummaries] = useState<{ id: Id; name: string; version: number }[] | null>(null);
  const [contents, setContents] = useState<Record<string, GlossaryCandidate['content']>>({});
  useEffect(
    () =>
      onLibraryEntries((entries) =>
        setSummaries(
          entries.filter((e) => e.library === 'glossaries' && e.kind === 'translation').map((e) => ({ id: e.id, name: e.name, version: e.version })),
        ),
      ),
    [],
  );
  // 读过（或正在读）的版本记一笔：换了摘要时只读新的；在读的不会因为重排被丢下。
  const requested = useRef(new Set<string>());
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (!summaries) return;
    for (const summary of summaries) {
      const key = `${summary.id}@${summary.version}`;
      if (requested.current.has(key)) continue;
      requested.current.add(key);
      runtime.getLibraryEntry({ library: 'glossaries', id: summary.id, version: summary.version }).then(
        (entry) => {
          if (!mounted.current) return;
          const content = entry.content as GlossaryCandidate['content'] & { kind?: string };
          setContents((c) => ({ ...c, [key]: content && content.kind === 'translation' ? content : null }));
        },
        () => mounted.current && setContents((c) => ({ ...c, [key]: null })),
      );
    }
  }, [runtime, summaries]);
  const candidates = useMemo(
    () => (summaries ?? []).map((s) => ({ id: s.id, name: s.name, content: contents[`${s.id}@${s.version}`] })),
    [summaries, contents],
  );
  return { ready: summaries !== null, candidates };
}

/**
 * 视频里启用的条目（`library.getVideoSelection`）：跟着视频里那份 `library-selection` 文档的版本重读，
 * 撤销、别处改了都跟得上；界面不另存一份。`enabled` 为 false 时不读（浏览器页面没有用户库的权限）。
 */
export function useVideoSelection(runtime: RuntimeSession, videoId: Id, documents: Record<Id, DocumentRecord>, enabled = true) {
  const doc = Object.values(documents).find((d) => d.kind === 'library-selection');
  const key = `${videoId}:${doc?.id ?? ''}:${doc?.currentRevision ?? ''}`;
  const [state, setState] = useState<{ key: string; selection: LibrarySelection | null; error: string | null } | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    runtime.getVideoSelection(videoId).then(
      (result) => alive && setState({ key, selection: result.selection, error: null }),
      (error) => alive && setState({ key, selection: null, error: messageOf(error) }),
    );
    return () => {
      alive = false;
    };
  }, [runtime, videoId, key, enabled]);
  // 换了版本、新的还没读回来时先用上一份，免得勾选框闪一下。
  return state;
}


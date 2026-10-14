import { useEffect, useRef, useState } from 'react';
import type { LibraryEntrySummary } from '@baocut/protocol';
import type { VoiceEntry } from '../../model/voices-library.ts';
import type { RuntimeSession } from '../../runtime/session.ts';
import { loadVoice } from './voice-actions.ts';

/** 克隆建好或过期不改条目版本：键里带上各家克隆的状态，voice id 才跟着更新。 */
function entryKey(voice: LibraryEntrySummary): string {
  const clones = (voice.clones ?? []).map((c) => `${c.providerId}:${c.state}`).join(',');
  return `${voice.id}@${voice.version}#${clones}`;
}

/**
 * 每只音色的完整条目（语言、逐字稿、录音大小、种子与 voice id 不在摘要里）：按版本与克隆状态记着，变了才重读；
 * 列表与标签不等它，读到之前那一行写「正在读取…」。我的声音与模型页那一行（model-voices-line.tsx）共用。
 */
export function useVoiceEntries(
  runtime: RuntimeSession,
  voices: readonly LibraryEntrySummary[],
): (voice: LibraryEntrySummary) => VoiceEntry | null {
  const [entries, setEntries] = useState<Record<string, VoiceEntry>>({});
  const asked = useRef(new Set<string>());
  useEffect(() => {
    for (const voice of voices) {
      const key = entryKey(voice);
      if (asked.current.has(key)) continue;
      asked.current.add(key);
      loadVoice(runtime, voice.id).then(
        (entry) => setEntries((prev) => ({ ...prev, [key]: entry })),
        () => {
          // 读不到（例如刚被删掉）：那一行就不显示细节，不反复重读。
        },
      );
    }
  }, [runtime, voices]);
  return (voice) => entries[entryKey(voice)] ?? null;
}

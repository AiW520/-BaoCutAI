import InfoCircle from '@react-spectrum/s2/icons/InfoCircle';
import Refresh from '@react-spectrum/s2/icons/Refresh';
import { iconStyle, style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { entryNote, type SemanticEntry } from '../model/semantic-status.ts';
import { M } from '../model/semantic-copy.ts';
import { useRuntime } from '../runtime/context.tsx';
import { useSemanticStatus } from '../state/semantic-store.ts';
import { useShell } from '../state/shell-store.ts';
import { SectionLink } from './tools/tool-parts.tsx';

/*
 * 一个入口的那一句（创作辅助集成设计 §2.11「每个入口自己说明状态」；设计稿 semantic-state.jsx `SemNote`）：退回或置灰时的原因，
 * 能在设置里解决时给「设置…」；索引在更新时是不阻塞的提醒。能用且最新时不画。浏览器里不给去设置的入口（那边装不了模型、
 * 改不了索引）。
 */

const line = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 8, rowGap: 2, font: 'ui-xs', color: 'gray-700', minWidth: 0 });
const notice = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: 8, rowGap: 2, font: 'ui-xs', color: 'gray-600', minWidth: 0 });
const icon = iconStyle({ size: 'S' });
const textStyle = style({ overflowWrap: 'anywhere', minWidth: 0 });

export function SemanticNote({ entry, reason }: { entry: SemanticEntry; reason?: string | null }) {
  const { status } = useSemanticStatus();
  const web = useRuntime().host.platform === 'web';
  const go = useShell((s) => s.go);
  const note = entryNote(entry, status, reason);
  if (!note) return null;
  return (
    <div className={note.tone === 'notice' ? notice : line} role="note">
      {note.tone === 'notice' ? <Refresh styles={icon} /> : <InfoCircle styles={icon} />}
      <span className={textStyle}>{note.text}</span>
      {note.settingsLink && !web ? <SectionLink onPress={() => go({ tab: 'settings', section: 'semantic' })}>{M.note.openSettings}</SectionLink> : null}
    </div>
  );
}

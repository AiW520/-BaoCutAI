import { ActionButton, Text } from '@react-spectrum/s2';
import MicrophoneIcon from '@react-spectrum/s2/icons/Microphone';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { voicesBoundTo, type CloneTarget } from '../../model/voice-capture.ts';
import type { VoiceEntry } from '../../model/voices-library.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useConnection } from '../../state/connection-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { useVoiceHandoff } from '../../state/voice-handoff-store.ts';
import { useVoices } from '../../state/voices-store.ts';
import { useVoiceEntries } from './use-voice-entries.ts';
import { CAPTURE_COPY as CC } from './voices-copy.ts';

const line = style({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 8, rowGap: 4, minWidth: 0, paddingTop: 4 });
const lab = style({ font: 'ui-xs', color: 'gray-700', fontWeight: 'medium' });
const list = style({
  flexGrow: 1,
  flexBasis: 0,
  minWidth: 160,
  font: 'ui-xs',
  color: 'gray-600',
  overflowWrap: 'anywhere',
  userSelect: 'text',
});

/**
 * 模型页那一行的「克隆的音色」（设计稿 settings-voice-capture.jsx `ModelVoicesLine`）：本机能克隆的模型列每只音色与它在这只引擎上的
 * 种子，能克隆的云端只列在这家建过克隆的与 voice ID；末尾「克隆新音色」带着这只模型去我的声音直接打开采集。
 */
export function ModelVoicesLine({ target, name }: { target: Pick<CloneTarget, 'kind' | 'id'>; name: string }) {
  const runtime = useRuntime();
  const connected = useConnection((s) => s.state.status === 'connected');
  const voices = useVoices((s) => s.voices);
  const entryOf = useVoiceEntries(runtime, connected ? voices : []);
  const route = useShell((s) => s.route);
  const goTo = useShell((s) => s.go);
  const setHandoff = useVoiceHandoff((s) => s.setHandoff);
  const entries = voices.map(entryOf).filter((e): e is VoiceEntry => !!e);
  const bound = voicesBoundTo(entries, target);
  if (runtime.host.platform === 'web') return null;

  const cloneNew = () => {
    setHandoff({ key: `model:${target.id}`, from: name, route, target: { kind: target.kind, id: target.id }, open: 'mic' });
    goTo({ tab: 'models', category: 'tts', page: 'voices' });
  };
  const text = bound.length
    ? bound
        .map((v) =>
          target.kind === 'cloud'
            ? `${v.name} ${v.voiceId}${v.stale ? ` (${CC.voiceIdStale})` : ''}`
            : `${v.name} (${v.seed === null ? CC.lineSeedRandom : CC.lineSeed(v.seed)})`,
        )
        .join(' · ')
    : target.kind === 'cloud'
      ? CC.lineNoneCloud
      : CC.lineNone;

  return (
    <div className={line}>
      <span className={lab}>{CC.lineLabel}</span>
      <span className={list}>{text}</span>
      <ActionButton isQuiet size="S" isDisabled={!runtime.host.writeRecording} onPress={cloneNew}>
        <MicrophoneIcon />
        <Text>{bound.length ? CC.lineNew : CC.lineFirst}</Text>
      </ActionButton>
    </div>
  );
}

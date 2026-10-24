import { ActionButton, Text, Tooltip, TooltipTrigger } from '@react-spectrum/s2';
import FileAdd from '@react-spectrum/s2/icons/FileAdd';
import Captions from '@react-spectrum/s2/icons/CloseCaptions';
import Translate from '@react-spectrum/s2/icons/Translate';
import Microphone from '@react-spectrum/s2/icons/Microphone';
import MusicNote from '@react-spectrum/s2/icons/MusicNote';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { HOME_COPY } from '../../copy.ts';
import { homeStarters, type HomeStarter } from '../../model/home-starters.ts';
import { shelfHead, shelfHeading } from './home-template-shelf.tsx';

const section = style({ marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: 'gray-100' });
const grid = style({ display: 'grid', gridTemplateColumns: { default: '[repeat(4, minmax(0, 1fr))]', isCompact: '[repeat(2, minmax(0, 1fr))]', isNarrow: '[minmax(0, 1fr)]' }, gap: 12 });
// Compact task cards use neutral surfaces and the existing prompt-only actions.
const card = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  gap: 12,
  width: 'full',
  padding: 16,
  minHeight: '[104px]',
  boxSizing: 'border-box',
  textAlign: 'start',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'gray-100',
  borderRadius: 'lg',
  cursor: 'pointer',
  backgroundColor: { default: 'gray-25', ':hover': 'blue-100' },
  boxShadow: 'emphasized',
  transition: 'default',
  outlineStyle: { default: 'none', ':focus-visible': 'solid' },
  outlineWidth: 2,
  outlineOffset: 2,
  outlineColor: 'focus-ring',
});
const name = style({
  paddingX: 2,
  font: 'ui',
  fontWeight: 'bold',
  color: 'gray-900',
});
const art = style({ display: 'grid', placeItems: 'center', size: 40, flexShrink: 0, borderRadius: 'lg', backgroundColor: 'blue-100', color: 'blue-1000' });
const copy = style({ display: 'flex', flexDirection: 'column', minWidth: 0, gap: 4 });
const description = style({ font: 'ui-sm', color: 'gray-600', lineClamp: 2 });
const STARTER_ICONS = { sub: Captions, trans: Translate, clean: Microphone, a2v: MusicNote };

/**
 * 起始页「快捷开始」那一节（原型 new-agent.jsx `HomeStarters`）：比模板常用，排在模板前面，四张紧凑卡片，
 * 图标、名称与下一步说明并排。点一下把一句提示词放进输入框，不发送。
 * 标题行尾的「新建空白视频」不经过 Agent，直接建一个空视频在功能区打开。`target` 是上次「转录并翻译」填的目标语言，没有时那句话留待填项。
 * 中宽改为两列，`narrow` 时改为一列，避免说明挤在窄卡片里。
 */
export function HomeStarters({
  target,
  compact,
  narrow,
  onPick,
  onBlank,
}: {
  target: string | null;
  compact: boolean;
  narrow: boolean;
  onPick(starter: HomeStarter): void;
  onBlank(): void;
}) {
  return (
    <section className={section} aria-labelledby="home-quick-title">
      <div className={shelfHead}>
        <h2 id="home-quick-title" className={shelfHeading}>
          {HOME_COPY.quickStart}
        </h2>
        <TooltipTrigger placement="bottom">
          <ActionButton isQuiet size="S" onPress={onBlank}>
            <FileAdd />
            <Text>{HOME_COPY.blankVideo}</Text>
          </ActionButton>
          <Tooltip>{HOME_COPY.blankVideoTip}</Tooltip>
        </TooltipTrigger>
      </div>
      <div className={grid({ isCompact: compact, isNarrow: narrow })}>
        {homeStarters(target).map((starter) => {
          const Icon = STARTER_ICONS[starter.key];
          return (
            <button
              key={starter.key}
              type="button"
              className={card}
              title={starter.tip}
              aria-label={starter.title}
              onClick={() => onPick(starter)}>
              <span className={art} aria-hidden="true"><Icon /></span>
              <span className={copy}><span className={name}>{starter.title}</span><span className={description}>{starter.tip}</span></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

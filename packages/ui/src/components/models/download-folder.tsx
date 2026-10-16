import { useState } from 'react';
import { Button, Content, Heading, InlineAlert, ToastQueue } from '@react-spectrum/s2';
import Folder from '@react-spectrum/s2/icons/Folder';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { MODELS_DIR_COPY, shortenDir } from '../../model/models-dir.ts';
import { INSTALL_FOLDER_COPY as COPY, type InstallFolderView } from '../../model/models-install.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { SectionLink } from '../tools/tool-parts.tsx';
import { Chips } from './model-parts.tsx';

const box = style({ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 });
const head = style({ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 });
const label = style({ flexShrink: 0, font: 'ui-xs', color: 'gray-600' });
const pathRow = style({
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  gap: '[6px]',
  minWidth: 0,
  font: 'code-xs',
  color: 'gray-900',
  '--iconPrimary': { type: 'fill', value: 'gray-700' },
});
const pathText = style({ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', userSelect: 'text' });
const note = style({ margin: 0, font: 'ui-xs', color: 'gray-600', overflowWrap: 'anywhere' });

/**
 * 下载确认框里的「存放位置」（架构设计 §6.3；设计稿 download-dialog.jsx `Where`）：路径（中间省略，悬停看全）+ chip + 「更改…」。
 * 「更改…」打开系统的文件夹面板，选的文件夹只用于这一次下载、模型目录不变；交给调用方按它重新做计划（`onPick`，null 为改回模型目录）。
 * 文件夹不在或不能写时就地写明，调用方不让确认。浏览器里不能安装，不会走到这里。
 */
export function DownloadFolder({
  view,
  isDisabled,
  onPick,
}: {
  view: InstallFolderView;
  isDisabled?: boolean;
  onPick: (dir: string | null) => void;
}) {
  const runtime = useRuntime();
  const [picking, setPicking] = useState(false);

  const pick = async () => {
    setPicking(true);
    try {
      const next = await runtime.host.pickDirectory({ title: COPY.pickTitle });
      if (next) onPick(next);
    } catch (error) {
      ToastQueue.negative(MODELS_DIR_COPY.pickFailed((error as Error).message), { timeout: 5000 });
    } finally {
      setPicking(false);
    }
  };

  const chip = view.chip === 'env' ? { label: COPY.envChip, tone: 'notice' as const } : view.chip ? { label: COPY.modelsDirChip, tone: 'neutral' as const } : null;
  return (
    <div className={box} role="group" aria-label={COPY.label}>
      <div className={head}>
        <span className={label}>{COPY.label}</span>
        <span className={pathRow} title={view.path}>
          <Folder />
          <span className={pathText}>{shortenDir(view.path, 40)}</span>
        </span>
        {chip ? <Chips chips={[chip]} /> : null}
        {view.canChange ? (
          <Button variant="secondary" size="S" isDisabled={isDisabled} isPending={picking} onPress={() => void pick()}>
            {COPY.change}
          </Button>
        ) : null}
      </div>
      {view.problem ? (
        <InlineAlert variant="negative">
          <Heading>{view.problem.title}</Heading>
          <Content>{view.problem.text}</Content>
        </InlineAlert>
      ) : null}
      {view.note || view.picked ? (
        <p className={note}>
          {view.note}
          {view.picked ? (
            <>
              {' '}
              <SectionLink isDisabled={isDisabled} onPress={() => onPick(null)}>
                {COPY.reset}
              </SectionLink>
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}

import { useMemo, type ComponentType } from 'react';
import { NotificationBadge, Tooltip, TooltipTrigger } from '@react-spectrum/s2';
import { Button } from 'react-aria-components';
import Clock from '@react-spectrum/s2/icons/Clock';
import Asset from '@react-spectrum/s2/icons/Asset';
import GlobeGrid from '@react-spectrum/s2/icons/GlobeGrid';
import Home from '@react-spectrum/s2/icons/Home';
import Lightbulb from '@react-spectrum/s2/icons/Lightbulb';
import Tools from '@react-spectrum/s2/icons/Tools';
import Settings from '@react-spectrum/s2/icons/Settings';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { S } from './shell-copy.ts';
import { useShell, railTabOf, type Tab } from '../state/shell-store.ts';
import { isJobLive, useJobs } from '../state/jobs-store.ts';
import { useLegacyImport } from '../state/legacy-import-store.ts';
import { isLive, useTasks } from '../state/tasks-store.ts';
import { listedTasks } from '../model/task-list.ts';
import { UpdateRailButton } from './app-update/update-rail-button.tsx';
import { useShellPeekControls } from './shell-peek.tsx';
import { useServicesAlert } from './services/use-share-status.ts';

interface RailTab {
  tab: Tab;
  label: string;
  Icon: ComponentType;
}

/** 主要入口贴顶，横线下方是服务与后台任务，设置固定在底部（产品设计 §2.1 用户修订）。 */
const PRIMARY: RailTab[] = [
  { tab: 'home', label: 'Home', Icon: Home },
  { tab: 'space', label: 'Space', Icon: Asset },
  // Skills 在 Space 下面一格（产品设计 §6.9）；名字同 Home、Space 不翻译（术语表：Skill）。
  { tab: 'skills', label: 'Skills', Icon: Lightbulb },
  { tab: 'tools', get label() { return S.common.tools; }, Icon: Tools },
];
/** 辅助入口（产品设计 §2.1）：服务在前，后台任务在后。 */
const SECONDARY: RailTab[] = [
  { tab: 'services', get label() { return S.common.services; }, Icon: GlobeGrid },
  { tab: 'tasks', get label() { return S.common.tasks; }, Icon: Clock },
];
const END: RailTab[] = [{ tab: 'settings', get label() { return S.common.settings; }, Icon: Settings }];

const rail = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexShrink: 0,
  width: 80,
  paddingY: 12,
  backgroundColor: 'gray-50',
});
const group = style({ display: 'flex', flexDirection: 'column' });
/** Confirmed Tuzi navigation: always-visible labels, with the full name in the tooltip. */
const cell = style({ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 56 });
const railButton = style({
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 68, height: 48, padding: 4, borderWidth: 0, borderRadius: 'lg', cursor: 'pointer',
  backgroundColor: { default: 'transparent', isHovered: 'gray-100', isCurrent: { default: 'blue-100', isHovered: 'blue-200' } },
  color: { default: 'gray-700', isCurrent: 'blue-1000' },
  '--iconPrimary': { type: 'fill', value: 'currentColor' },
  outlineStyle: { default: 'none', isFocusVisible: 'solid' }, outlineWidth: 2, outlineOffset: 0, outlineColor: 'focus-ring',
  transform: { isPressed: 'scale(0.96)' }, transition: 'default',
});
const buttonContent = style({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 0, width: 'full' });
const buttonLabel = style({ font: 'ui-xs', fontWeight: 'normal', lineHeight: '[14px]', maxWidth: 'full', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
const badgePosition = style({ position: 'absolute', top: 4, insetEnd: 8, pointerEvents: 'none' });
const divider = style({ borderWidth: 0, borderTopWidth: 1, borderStyle: 'solid', borderColor: 'gray-200', marginX: 16, marginY: 8 });
/** Selected entry uses a blue marker and a quiet blue background. */
const indicator = style({
  position: 'absolute',
  insetStart: '[5px]',
  top: '50%',
  width: '[3px]',
  height: 24,
  borderRadius: 'full',
  backgroundColor: 'blue-800',
  transform: 'translateY(-50%)',
});
/**
 * 服务出错的角标（原型 apprail.jsx `services.badge`、apprail.css `.apprail__badge--dot` / `.apprail__alert`）：
 * 8px 纯圆点，橙色同服务页「出错」那颗灯。S2 的 NotificationBadge 只有红色，所以自己画；只给视觉，读屏走按钮名。
 */
const alertDot = style({
  position: 'absolute',
  top: '[7px]',
  insetEnd: '[15px]',
  size: 8,
  borderRadius: 'full',
  backgroundColor: 'orange-900',
  pointerEvents: 'none',
});

export function Rail() {
  const route = useShell((s) => s.route);
  const goTab = useShell((s) => s.goTab);
  // 在跑的后台任务：进任务表的 Agent 任务（只检索、问答的不算，产品设计 §6.1）、Job，和正在导入旧版项目的那一轮。
  const tasks = useTasks((s) => s.tasks);
  const jobs = useJobs((s) => s.jobs);
  const legacy = useLegacyImport((s) => (s.run && s.run.state !== 'finished' ? 1 : 0));
  const running = useMemo(
    () => listedTasks(tasks, jobs).filter(isLive).length + jobs.filter(isJobLive).length + legacy,
    [tasks, jobs, legacy],
  );
  // 只有服务出错才亮（原型：每项服务各自的灯在服务页里）；顺带在连上 Runtime 时读一次共享状态。
  const servicesAlert = useServicesAlert();
  // 侧栏隐藏时悬停入口浮出该区域的侧栏（产品设计 §2.5；设置没有侧栏，在 shell-peek 里跳过）。
  const peek = useShellPeekControls();

  const button = ({ tab, label, Icon }: RailTab) => {
    const badge = tab === 'tasks' && running ? <span className={badgePosition}><NotificationBadge value={running} /></span> : null;
    const name = tab === 'tasks' && running ? S.rail.running(label, running) : tab === 'services' && servicesAlert ? servicesAlert : label;
    return (
      <div key={tab} className={cell} onPointerEnter={() => peek?.peekSidebar(tab)} onPointerLeave={() => peek?.leaveSidebar()}>
        {railTabOf(route) === tab ? <span className={indicator} /> : null}
        <TooltipTrigger placement="end" delay={300}>
          <Button
            className={(state) => railButton({ ...state, isCurrent: railTabOf(route) === tab })}
            aria-label={name}
            aria-current={railTabOf(route) === tab ? 'page' : undefined}
            onPress={() => goTab(tab)}>
            <span className={buttonContent}><Icon /><span className={buttonLabel}>{label}</span></span>
          </Button>
          <Tooltip>{name}</Tooltip>
        </TooltipTrigger>
        {badge}
        {tab === 'services' && servicesAlert ? <span className={alertDot} aria-hidden="true" /> : null}
      </div>
    );
  };

  return (
    // `data-shell-peek-keep`：在 Rail 上按下不关侧栏浮层。
    <nav className={rail} data-bc-icons="primary" data-shell-peek-keep="" aria-label={S.rail.nav}>
      <div>
        <div className={group} aria-label={S.rail.primary}>{PRIMARY.map(button)}</div>
        <hr className={divider} />
        <div className={group} aria-label={S.rail.secondary}>{SECONDARY.map(button)}</div>
      </div>
      <div className={group}>
        {/* 设置正上方：有新版本、下载中、已下载时才占这一格（设计稿 apprail.jsx `apprail__upd`）。 */}
        <UpdateRailButton />
        {END.map(button)}
      </div>
    </nav>
  );
}

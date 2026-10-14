import { useEffect, useRef, useState } from 'react';
import type { Id, ModelBundleStatus, SemanticChannel, SemanticFolderStatus, SemanticIndexDir, SemanticIndexDirMode } from '@baocut/protocol';
import {
  ActionButton,
  ActionMenu,
  AlertDialog,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Content,
  Dialog,
  DialogContainer,
  Heading,
  InlineAlert,
  MenuItem,
  ProgressBar,
  Radio,
  RadioGroup,
  Switch,
  Text,
  ToastQueue,
} from '@react-spectrum/s2';
import Delete from '@react-spectrum/s2/icons/Delete';
import Download from '@react-spectrum/s2/icons/Download';
import Folder from '@react-spectrum/s2/icons/Folder';
import FolderAdd from '@react-spectrum/s2/icons/FolderAdd';
import Refresh from '@react-spectrum/s2/icons/Refresh';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { revealLabel } from '../../copy.ts';
import {
  downloadView,
  installFailure,
  installFailureText,
  problemText,
  removedToast,
  rpcProblem,
} from '../../model/models-install.ts';
import { shortenDir } from '../../model/models-dir.ts';
import { bundleName } from '../../model/models-local.ts';
import { M as LOCAL } from '../../model/models-local-copy.ts';
import { M as COPY } from '../../model/semantic-copy.ts';
import { folderRowView } from '../../model/semantic-folders.ts';
import { packageView, scopeView, type PackagePartKind, type ScopeProject } from '../../model/semantic-package.ts';
import {
  coverageLine,
  deviceName,
  etaLine,
  indexProgressView,
  indexState,
  pausedNote,
  visualCostLine,
  visualCoverageLine,
} from '../../model/semantic-status.ts';
import { fmtSize } from '../../model/task-facts.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useDirectory } from '../../state/directory-store.ts';
import { useJobs } from '../../state/jobs-store.ts';
import { useModels } from '../../state/models-store.ts';
import { useSemanticStatus, useSemanticState } from '../../state/semantic-store.ts';
import { useSetting } from '../../state/settings-store.ts';
import { useSpace } from '../../state/space-store.ts';
import { BatchInstallDialog } from '../models/batch-install-dialog.tsx';
import { removeBundle } from '../models/local-model-actions.ts';
import { LOCAL_INSTALL_COPY as INSTALL } from '../models/local-models-copy.ts';
import { GATE_COPY } from '../tools/tools-copy.ts';
import { M as GENERAL } from './general-settings-copy.ts';
import { Group, Row } from './general-settings.tsx';
import { useSaveSettings, useSettingsReady } from './save-settings.ts';

/*
 * 设置 › 语义索引（创作辅助集成设计 §2.11；检索集成方案 v0.1 §4.2、§4.4、§11.3、§13.2；设计稿 settings-semantic.jsx、
 * settings-semantic-scope.jsx）。偏好设置一组。
 *
 * - 模型：「语义搜索」一个包（文字模型与多模态模型两个 `capability: 'embed'` 模型包，不在模型页里列；model/semantic-package.ts）。
 *   一起装：一个对话框列出文字、多模态与共享运行时，分别选本次来源；缺一个时是「补齐」；删除两个一起删。
 * - 装好后按索引范围给视频建：讲话内容，再是画面（`semantic.channels` 默认含 `visual`）。画面在「索引」里一个开关：没开时写
 *   打开后要建多少（`estimates` 里 `ifEnabled` 的画面一项），打开先确认。缺多模态模型、或画面这一路用不了时开关置灰并写原因。
 *   声音这一版没有。
 * - 索引：状态、暂停 / 恢复、缓存大小与清理（`space.indexControl`）、位置（`space.indexSetDir`：换到别的文件夹时把现有的
 *   索引移过去或在那里重新建，移的时候写进度；检索规格 §8.1）、实际运行的设备。在更新时状态下面一根进度条：画面排在讲话
 *   内容后面建，两路按估算时间合成一根（`progress` 与 `estimates`，检索规格 §13.2），下面按路写计数与两路合起来还要多久；
 *   用电池、过热降频时 Runtime 自动停下，状态写原因（`pauseReason`，§16.1），「用电池时暂停」（`semantic.pauseOnBattery`）
 *   可关。恢复只撤掉用户的暂停。
 * - 索引范围：所有 BaoCut 项目（新建的自动加入）与项目之外的视频，减去排除的项目（`semantic.excludedProjects`）与 Space 里
 *   单独设了不索引的视频（`semantic.excludedVideos`）；两者都能在这里恢复，排除项目走一个勾选对话框。成片不另建。
 * - 索引文件夹（检索规格 §9.1）：项目之外再加的只读文件夹（`space.folderAdd`，系统的文件夹面板选）。每个写建到哪了、认出了什么、
 *   跳过了什么；⋯ 里在文件夹中显示 / 重新索引 / 移除（移除只删它的索引，不动文件）。只在桌面端改，Web 只列出。
 * - 用到它的两项开关：翻译记忆（`semantic.translationMemory`，Runtime 执行）、术语候选（`semantic.glossaryCandidates`，润色面板读它）。
 *
 * 浏览器里（Web）只看不改：能取状态（`space.indexStatus` 在白名单里），装模型、控制索引与改设置都不开放；索引位置只写路径
 * （选不了 Runtime 那台电脑上的文件夹）。
 */

const lead = style({ marginTop: -8, marginBottom: 24, font: 'ui-sm', color: 'gray-600' });
const pkg = style({ display: 'flex', flexDirection: 'column', gap: 8, paddingY: 16, minWidth: 0 });
const pkgHead = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, minWidth: 0 });
const pkgName = style({ flexGrow: 1, font: 'ui', fontWeight: 'medium', color: 'gray-900', minWidth: 0 });
const pkgActions = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 });
const parts = style({ display: 'flex', flexDirection: 'column', gap: 4, paddingStart: 4 });
const muted = style({ margin: 0, font: 'ui-xs', color: 'gray-600', overflowWrap: 'anywhere' });
const failed = style({ margin: 0, font: 'ui-xs', color: 'negative-900', overflowWrap: 'anywhere' });
const body = style({ margin: 0, font: 'ui-sm', color: 'gray-700', overflowWrap: 'anywhere' });
const strong = style({ margin: 0, marginBottom: 24, font: 'ui-sm', color: 'gray-800', overflowWrap: 'anywhere' });
const alert = style({ marginBottom: 24 });
const progressRow = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui-sm', color: 'gray-800' });
const progressBar = style({ width: 160 });
const moveBar = style({ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 });
const moveBarTrack = style({ width: 'full', maxWidth: 320 });
const progressStack = style({ display: 'flex', flexDirection: 'column', gap: 4 });
const progressTrack = style({ width: 'full', maxWidth: 'none' });
const value = style({ font: 'ui-sm', color: 'gray-800' });
const note = style({ paddingY: 12, font: 'ui-xs', color: 'gray-600', overflowWrap: 'anywhere' });
const dialogStack = style({ display: 'flex', flexDirection: 'column', gap: 16 });
const pathText = style({ font: 'code-xs', color: 'gray-800', minWidth: 0, overflowWrap: 'anywhere', userSelect: 'text' });
const dialogPath = style({ font: 'code-sm', overflowWrap: 'anywhere', userSelect: 'text' });
const addRow = style({ display: 'flex', paddingY: 12 });

export function SemanticSettings() {
  const web = useRuntime().host.platform === 'web';
  const { status, error } = useSemanticStatus({ poll: true });
  const bundles = useModels((s) => s.bundles).filter((b) => b.capability === 'embed');
  const view = packageView(bundles);
  const installed = status?.model ?? null;
  // 画面一路用多模态模型：看它装没装，不看讲话内容在用的是哪个。
  const multimodal = view.parts.some((p) => p.kind === 'multimodal' && p.installed);
  return (
    <>
      <p className={lead}>{COPY.settings.lead}</p>
      {web ? <p className={strong}>{GENERAL.webViewOnly}</p> : null}
      {view.state === 'unsupported' ? (
        <InlineAlert variant="notice" styles={alert}>
          <Heading>{COPY.settings.unsupportedTitle}</Heading>
          <Content>{COPY.settings.unsupportedBody}</Content>
        </InlineAlert>
      ) : null}
      <PackageGroup bundles={bundles} web={web} />
      {!status ? (
        <p className={body}>{error ? COPY.settings.loadFailed(error) : COPY.settings.loading}</p>
      ) : installed ? (
        <>
          <IndexGroup web={web} multimodal={multimodal} />
          <ScopeGroup web={web} />
        </>
      ) : null}
      <FeaturesGroup web={web} installed={installed !== null} />
    </>
  );
}

// ---- 语义搜索（一个包） ----

const partName = (kind: PackagePartKind) => (kind === 'text' ? COPY.settings.partText : COPY.settings.partMultimodal);

function PackageGroup({ bundles, web }: { bundles: ModelBundleStatus[]; web: boolean }) {
  const runtime = useRuntime();
  const jobs = useJobs((s) => s.jobs);
  const status = useSemanticState((s) => s.status);
  const [installing, setInstalling] = useState<ModelBundleStatus[] | null>(null);
  const [removing, setRemoving] = useState(false);
  const view = packageView(bundles);
  if (view.parts.length === 0) return null;
  const S = COPY.settings;
  const size = view.bytes ? fmtSize(view.bytes) : null;
  const missing = view.parts.filter((p) => !p.installed).map((p) => partName(p.kind));
  const chip: [string, 'positive' | 'neutral' | 'notice'] =
    view.state === 'unsupported'
      ? [S.unsupported, 'notice']
      : view.state === 'installed'
        ? [S.installed, 'positive']
        : view.state === 'partial'
          ? [LOCAL.chipMissing(missing), 'notice']
          : [S.notInstalled, 'neutral'];
  const failure = view.parts.map((p) => (p.installed ? null : installFailure(p.bundle, jobs))).find((f) => f !== null) ?? null;
  const running = view.running ? downloadView(view.running) : null;
  const runningKind = view.parts.find((p) => p.bundle === view.running)?.kind ?? 'text';
  const cost = visualCostLine(status?.estimates?.find((e) => e.channel === 'visual' && e.ifEnabled));
  const remove = async () => {
    try {
      for (const part of view.parts.filter((p) => p.installed)) {
        const result = await removeBundle(runtime, part.bundle.bundleId);
        ToastQueue.positive(removedToast(bundleName(part.bundle), result), { timeout: 4000 });
      }
    } catch (err) {
      ToastQueue.negative(INSTALL.removeFailed(problemText(rpcProblem(err))), { timeout: 8000 });
    }
  };
  return (
    <Group title={S.modelGroup}>
      <div className={pkg}>
        <div className={pkgHead}>
          <span className={pkgName}>{S.packageName}</span>
          {size && view.state !== 'installed' ? <span className={muted}>{size}</span> : null}
          <Badge variant={chip[1]} size="S" fillStyle="subtle">
            {chip[0]}
          </Badge>
        </div>
        <p className={muted}>{S.packageDesc}</p>
        <div className={parts}>
          {view.parts.map((p) => (
            <span key={p.bundle.bundleId} className={muted}>
              {`${partName(p.kind)} · ${bundleName(p.bundle)} · ${p.installed ? S.installed : S.notInstalled}`}
            </span>
          ))}
        </div>
        {failure && !running ? <p className={failed}>{installFailureText(failure, view.state === 'partial')}</p> : null}
        {running ? (
          <span className={progressRow} role="status">
            <ProgressBar
              size="S"
              aria-label={GATE_COPY.downloading(running.percent)}
              isIndeterminate={running.percent === null}
              {...(running.percent === null ? {} : { value: running.percent })}
              styles={progressBar}
            />
            {`${S.installing} · ${partName(runningKind)} · ${GATE_COPY.downloading(running.percent)}`}
          </span>
        ) : web ? null : (
          <div className={pkgActions}>
            {view.queue.length > 0 && view.state !== 'unsupported' ? (
              <Button size="S" variant="accent" onPress={() => setInstalling(view.parts.map((p) => p.bundle))}>
                <Download />
                <Text>
                  {view.paused
                    ? S.resume
                    : view.state === 'partial'
                      ? size
                        ? INSTALL.completeSize(size)
                        : INSTALL.complete
                      : S.install(size)}
                </Text>
              </Button>
            ) : null}
            {view.parts.some((p) => p.installed) ? (
              <ActionButton size="S" isQuiet onPress={() => setRemoving(true)}>
                {S.remove}
              </ActionButton>
            ) : null}
          </div>
        )}
      </div>
      {view.state === 'installed' ? null : <div className={note}>{S.packageNote(cost)}</div>}
      {installing ? (
        <BatchInstallDialog bundles={installing} name={S.packageName}
          onStarted={() => ToastQueue.neutral(INSTALL.started(S.packageName), { timeout: 4000 })}
          onClose={() => setInstalling(null)} />
      ) : null}
      <DialogContainer onDismiss={() => setRemoving(false)}>
        {removing ? (
          <AlertDialog
            variant="destructive"
            title={INSTALL.removeTitle(S.packageName)}
            primaryActionLabel={INSTALL.removeConfirm}
            cancelLabel={INSTALL.cancel}
            onPrimaryAction={() => void remove()}>
            {S.removeBody}
          </AlertDialog>
        ) : null}
      </DialogContainer>
    </Group>
  );
}

// ---- 索引 ----

function IndexGroup({ web, multimodal }: { web: boolean; multimodal: boolean }) {
  const runtime = useRuntime();
  const { status, refresh } = useSemanticStatus();
  const [clearing, setClearing] = useState(false);
  const [confirmVisual, setConfirmVisual] = useState(false);
  const [busy, setBusy] = useState(false);
  const save = useSaveSettings();
  const ready = useSettingsReady();
  const pauseOnBattery = useSetting('semantic.pauseOnBattery') ?? true;
  const channelSetting = useSetting('semantic.channels');
  if (!status?.model) return null;
  const state = indexState(status);
  const control = async (action: 'pause' | 'resume' | 'clear', done: string) => {
    setBusy(true);
    try {
      const { paused } = await runtime.client.request('space.indexControl', { action });
      useSemanticState.setState((s) => (s.status ? { status: { ...s.status, paused } } : {}));
      ToastQueue.positive(done, { timeout: 3000 });
    } catch (err) {
      ToastQueue.negative(COPY.settings.controlFailed(err instanceof Error ? err.message : String(err)), { timeout: 6000 });
    } finally {
      setBusy(false);
      void refresh();
    }
  };
  // 用户自己按的暂停：按钮是「恢复」；自动停下时按钮仍是「暂停」（恢复撤不掉供电的停下）。旧的 Runtime 没给原因时按 `paused`。
  const userPaused = status.pauseReason ? status.pauseReason === 'user' : status.paused;
  const desc =
    state === 'paused'
      ? userPaused
        ? COPY.settings.pausedDesc
        : pausedNote(status)
      : state === 'updating'
        ? COPY.note.stale
        : state === 'unavailable'
          ? COPY.reason.INDEX_NOT_READY
          : COPY.settings.readyDesc;
  // 建索引的进度（设计稿 settings-semantic.jsx）：讲话内容与画面合在状态下面一根条里，下面按路写计数与两路合起来还要多久。
  // 旧的 Runtime 没给 `progress` 时照旧只在状态里写讲话内容还要多久。
  const progress = state === 'updating' || state === 'paused' ? indexProgressView(status) : null;
  const eta =
    state === 'updating' && !status.progress ? etaLine(status.estimates?.find((e) => e.channel === 'text' && !e.ifEnabled)) : null;
  const P = COPY.settings.progress;
  // 停着又估不出时间时不画条（不定量的条会一直动），只写那两行。
  const progressFooter = progress ? (
    <div className={progressStack}>
      {progress.value !== null || !status.paused ? (
        <ProgressBar
          size="S"
          aria-label={P.label}
          isIndeterminate={progress.value === null}
          value={progress.value ?? undefined}
          styles={progressTrack}
        />
      ) : null}
      <span className={muted}>{progress.line}</span>
      <span className={muted}>{progress.eta}</span>
    </div>
  ) : null;
  // 画面：设置为准（刚改完、状态还没刷新时也对）；没取到设置时看状态。
  const enabled = channelSetting ?? (Object.keys(status.channels) as SemanticChannel[]).filter((c) => status.channels[c].enabled);
  const visualOn = enabled.includes('visual');
  const visualAvailable = multimodal && status.channels.visual.available;
  const cost = visualCostLine(status.estimates?.find((e) => e.channel === 'visual' && e.ifEnabled));
  const V = COPY.settings.visualIndex;
  const visualText = !multimodal
    ? V.needsPackage
    : !visualAvailable
      ? V.unavailable
      : visualOn
        ? V.scopeOnDesc
        : cost
          ? V.offCost(cost)
          : V.desc;
  const setVisual = async (on: boolean) => {
    const next: SemanticChannel[] = on ? [...enabled.filter((c) => c !== 'visual'), 'visual'] : enabled.filter((c) => c !== 'visual');
    if (await save({ 'semantic.channels': next }, on ? V.turnedOn : V.turnedOff)) void refresh();
  };
  const tone = state === 'ready' ? 'positive' : state === 'paused' ? 'notice' : state === 'updating' ? 'informative' : 'neutral';
  return (
    <Group title={COPY.settings.indexGroup}>
      <Row label={COPY.settings.status} desc={desc} footer={progressFooter} {...(eta ? { note: eta } : {})}>
        <Badge variant={tone} size="S" fillStyle="subtle">
          {COPY.settings.state[state]}
        </Badge>
        {web ? null : (
          <Button
            size="S"
            variant="secondary"
            isDisabled={busy || state === 'unavailable'}
            onPress={() => void (userPaused ? control('resume', COPY.settings.resumed) : control('pause', COPY.settings.paused))}>
            {userPaused ? COPY.settings.resumeIndex : COPY.settings.pause}
          </Button>
        )}
      </Row>
      <Row label={V.label} desc={visualText}>
        <Switch
          aria-label={V.label}
          isDisabled={web || !ready || !visualAvailable}
          isSelected={visualAvailable && visualOn}
          onChange={(on) => (on ? setConfirmVisual(true) : void setVisual(false))}
        />
      </Row>
      <Row label={COPY.settings.pauseOnBattery} desc={COPY.settings.pauseOnBatteryDesc}>
        <Switch
          aria-label={COPY.settings.pauseOnBattery}
          isDisabled={web || !ready}
          isSelected={pauseOnBattery}
          onChange={(on) => void save({ 'semantic.pauseOnBattery': on }).then(() => refresh())}
        />
      </Row>
      <Row label={COPY.settings.cache} desc={COPY.settings.cacheDesc}>
        <span className={value}>{fmtSize(status.cacheBytes)}</span>
        {web ? null : (
          <ActionButton
            size="S"
            isQuiet
            isDisabled={busy || status.cacheBytes === 0 || !!status.indexDir?.moving}
            onPress={() => setClearing(true)}>
            {COPY.settings.clear}
          </ActionButton>
        )}
      </Row>
      {status.indexDir ? <LocationRow web={web} dir={status.indexDir} bytes={status.cacheBytes} /> : null}
      <Row label={COPY.settings.runsOn} desc={COPY.settings.runsOnDesc}>
        <span className={value}>
          {status.model.device
            ? `${status.model.label} · ${deviceName(status.model.device)}`
            : `${status.model.label} · ${COPY.settings.notLoaded}`}
        </span>
      </Row>
      <DialogContainer onDismiss={() => setConfirmVisual(false)}>
        {confirmVisual ? (
          <AlertDialog
            variant="confirmation"
            title={V.confirmTitle}
            primaryActionLabel={V.turnOn}
            cancelLabel={INSTALL.cancel}
            onPrimaryAction={() => void setVisual(true)}>
            {cost ? V.scopeConfirmBody(cost) : V.scopeConfirmBodyNoCost}
          </AlertDialog>
        ) : null}
      </DialogContainer>
      <DialogContainer onDismiss={() => setClearing(false)}>
        {clearing ? (
          <AlertDialog
            variant="destructive"
            title={COPY.settings.clearTitle}
            primaryActionLabel={COPY.settings.clear}
            cancelLabel={INSTALL.cancel}
            onPrimaryAction={() => void control('clear', COPY.settings.cleared)}>
            {COPY.settings.clearBody(fmtSize(status.cacheBytes))}
          </AlertDialog>
        ) : null}
      </DialogContainer>
    </Group>
  );
}

// ---- 索引位置 ----

/** 「索引」里的「位置」一行：路径、在文件夹中显示、更改…、恢复默认；移动时写进度，移不成时写原因。Web 只写路径。 */
function LocationRow({ web, dir, bytes }: { web: boolean; dir: SemanticIndexDir; bytes: number }) {
  const runtime = useRuntime();
  const L = COPY.location;
  const [dialog, setDialog] = useState<{ target: string | null } | null>(null);
  const [picking, setPicking] = useState(false);
  // 移完（`moving` 从有到无、没有失败）时提示一次。
  const movingTo = useRef<string | null>(null);
  useEffect(() => {
    const to = dir.moving?.to ?? null;
    if (movingTo.current && !to && !dir.moveError) {
      ToastQueue.positive(COPY.location.movedToast(shortenDir(movingTo.current, 40)), { timeout: 4000 });
    }
    movingTo.current = to;
  }, [dir.moving?.to, dir.moveError]);
  const moving = dir.moving;
  const pct = moving && moving.totalBytes > 0 ? Math.min(100, Math.floor((moving.doneBytes / moving.totalBytes) * 100)) : null;
  const text = moving
    ? L.moving(fmtSize(moving.totalBytes || bytes), shortenDir(moving.to, 36))
    : !dir.exists
      ? L.missingDesc
      : dir.source === 'default'
        ? L.defaultDesc
        : L.customDesc;
  const desc = (
    <>
      {text}
      {moving ? (
        <span className={moveBar} role="status">
          <ProgressBar
            size="S"
            aria-label={L.movingLabel}
            isIndeterminate={pct === null}
            value={pct ?? undefined}
            styles={moveBarTrack}
          />
        </span>
      ) : null}
      {dir.moveError ? <span className={failed}>{dir.moveError}</span> : null}
    </>
  );
  const pick = async () => {
    setPicking(true);
    try {
      const next = await runtime.host.pickDirectory();
      if (next) setDialog({ target: next });
    } catch (error) {
      ToastQueue.negative(L.pickFailed(error instanceof Error ? error.message : String(error)), { timeout: 5000 });
    } finally {
      setPicking(false);
    }
  };
  return (
    <>
      <Row label={L.label} desc={desc}>
        <span className={pathText} title={dir.path}>
          {shortenDir(dir.path, 36)}
        </span>
        {web ? null : (
          <>
            <ActionButton size="S" isQuiet isDisabled={!!moving || !dir.exists} onPress={() => void runtime.host.revealPath(dir.path)}>
              <Folder />
              <Text>{revealLabel()}</Text>
            </ActionButton>
            <Button size="S" variant="secondary" isDisabled={!!moving || picking} isPending={picking} onPress={() => void pick()}>
              {L.change}
            </Button>
            {dir.source === 'custom' ? (
              <ActionButton size="S" isQuiet isDisabled={!!moving} onPress={() => setDialog({ target: null })}>
                {L.restore}
              </ActionButton>
            ) : null}
          </>
        )}
      </Row>
      {dialog ? <LocationDialog target={dialog.target} dir={dir} bytes={bytes} onClose={() => setDialog(null)} /> : null}
    </>
  );
}

/**
 * 更改索引位置：选好的文件夹（`target` 为 null 时是放回缺省位置）；有索引时在「移过去」与「重新建」之间选（没有「只切换」：
 * 留在原处的索引没人用）。Runtime 拒绝时原因留在框里。
 */
function LocationDialog({
  target,
  dir,
  bytes,
  onClose,
}: {
  target: string | null;
  dir: SemanticIndexDir;
  bytes: number;
  onClose: () => void;
}) {
  const runtime = useRuntime();
  const { refresh } = useSemanticStatus();
  const L = COPY.location;
  const [mode, setMode] = useState<SemanticIndexDirMode>('move');
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const shown = target ?? dir.defaultPath;
  const same = shown === dir.path;
  const hasIndex = bytes > 0;
  // 还没有索引时没什么可移：直接换（那里已经有库时沿用它）。
  const picked: SemanticIndexDirMode = hasIndex ? mode : 'rebuild';
  const submit = async (close: () => void) => {
    setBusy(true);
    setFailure(null);
    try {
      const next = await runtime.client.request('space.indexSetDir', { path: target, mode: picked });
      useSemanticState.setState((s) => (s.status ? { status: { ...s.status, indexDir: next } } : {}));
      const where = shortenDir(shown, 40);
      const toast = next.moving ? L.movingToast(where) : hasIndex && picked === 'rebuild' ? L.rebuiltToast(where) : L.changedToast(where);
      ToastQueue.positive(toast, { timeout: 4000 });
      close();
      void refresh();
    } catch (error) {
      setFailure(problemText(rpcProblem(error)));
    } finally {
      setBusy(false);
    }
  };
  return (
    <DialogContainer onDismiss={onClose}>
      <Dialog size="M">
        {({ close }) => (
          <>
            <Heading slot="title">{target === null ? L.restoreTitle : L.changeTitle}</Heading>
            <Content>
              <div className={dialogStack}>
                <p className={body}>
                  <span className={dialogPath} title={shown}>
                    {shortenDir(shown, 60)}
                  </span>
                </p>
                {same ? <p className={body}>{L.same}</p> : null}
                {!same && hasIndex ? (
                  <RadioGroup label={L.howTo} value={picked} onChange={(v) => setMode(v as SemanticIndexDirMode)}>
                    <Radio value="move" description={L.moveDesc(fmtSize(bytes))}>
                      {L.moveOption}
                    </Radio>
                    <Radio value="rebuild" description={L.rebuildDesc}>
                      {L.rebuildOption}
                    </Radio>
                  </RadioGroup>
                ) : null}
                {!same ? <p className={muted}>{L.keyframesNote}</p> : null}
                {failure ? <p className={failed}>{failure}</p> : null}
              </div>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                {INSTALL.cancel}
              </Button>
              <Button variant="accent" isPending={busy} isDisabled={same || busy} onPress={() => void submit(close)}>
                {!hasIndex ? L.confirmChange : picked === 'move' ? L.confirmMove : L.confirmRebuild}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Dialog>
    </DialogContainer>
  );
}

// ---- 索引范围 ----

function ScopeGroup({ web }: { web: boolean }) {
  const { status, refresh } = useSemanticStatus();
  const projects = useDirectory((s) => s.projects);
  const entries = useSpace((s) => s.entries);
  const excludedProjects = useSetting('semantic.excludedProjects') ?? [];
  const excludedVideos = useSetting('semantic.excludedVideos') ?? [];
  const save = useSaveSettings();
  const ready = useSettingsReady();
  const [picking, setPicking] = useState(false);
  const C = COPY.scope;
  const list: ScopeProject[] = projects.map((p) => ({ id: p.id, name: p.name }));
  const view = scopeView(list, excludedProjects, excludedVideos, entries);
  const coverage = status
    ? [coverageLine(status.coverage), visualCoverageLine(status.coverage)]
        .filter((l): l is string => l !== null)
        .join(COPY.coverage.channelSeparator)
    : null;
  const saveProjects = async (next: Id[], toast: string) => {
    if (await save({ 'semantic.excludedProjects': next }, toast)) void refresh();
  };
  const restoreVideo = async (id: Id, name: string) => {
    if (await save({ 'semantic.excludedVideos': excludedVideos.filter((v) => v !== id) }, COPY.spaceIndex.includedToast(name)))
      void refresh();
  };
  const restoreButton = (onPress: () => void) =>
    web ? null : (
      <ActionButton size="S" isQuiet isDisabled={!ready} onPress={onPress}>
        {C.restore}
      </ActionButton>
    );
  return (
    <Group title={C.group} lead={C.lead}>
      <Row
        label={C.all}
        desc={
          <>
            {C.allLine(view.projects, view.excluded.length)}
            <br />
            {C.outside}
          </>
        }
        {...(coverage ? { note: coverage } : {})}
      />
      <Row label={C.excludedGroup} desc={view.excluded.length ? undefined : C.none}>
        {web ? null : (
          <ActionButton size="S" isDisabled={!ready} onPress={() => setPicking(true)}>
            {C.exclude}
          </ActionButton>
        )}
      </Row>
      {view.excluded.map((p) => (
        <Row key={p.id} label={p.name} desc={C.onlyExact}>
          {restoreButton(
            () =>
              void saveProjects(
                excludedProjects.filter((id) => id !== p.id),
                C.toastRestored(1),
              ),
          )}
        </Row>
      ))}
      {view.videos.length ? <div className={note}>{C.videosHead}</div> : null}
      {view.videos.map((v) => (
        <Row key={v.id} label={v.name} desc={C.onlyExact}>
          {restoreButton(() => void restoreVideo(v.id, v.name))}
        </Row>
      ))}
      <IndexFolders web={web} folders={status?.folders ?? []} refresh={refresh} />
      {picking ? (
        <ExcludeDialog
          projects={list}
          excluded={excludedProjects}
          onClose={() => setPicking(false)}
          onSave={(next, toast) => void saveProjects(next, toast)}
        />
      ) : null}
    </Group>
  );
}

// ---- 索引文件夹 ----

/** 「索引范围」里项目下面的索引文件夹与「添加文件夹…」。 */
function IndexFolders({ web, folders, refresh }: { web: boolean; folders: readonly SemanticFolderStatus[]; refresh: () => Promise<void> }) {
  const runtime = useRuntime();
  const visualOn = (useSetting('semantic.channels') ?? []).includes('visual');
  const F = COPY.folders;
  const [adding, setAdding] = useState<string | null>(null);
  const [removing, setRemoving] = useState<SemanticFolderStatus | null>(null);
  const [picking, setPicking] = useState(false);
  const failedToast = (error: unknown) => ToastQueue.negative(F.failed(problemText(rpcProblem(error))), { timeout: 5000 });
  const pick = async () => {
    setPicking(true);
    try {
      const next = await runtime.host.pickDirectory();
      if (next) setAdding(next);
    } catch (error) {
      ToastQueue.negative(COPY.location.pickFailed(error instanceof Error ? error.message : String(error)), { timeout: 5000 });
    } finally {
      setPicking(false);
    }
  };
  const act = async (key: string, folder: SemanticFolderStatus) => {
    if (key === 'reveal') void runtime.host.revealPath(folder.path);
    else if (key === 'remove') setRemoving(folder);
    else if (key === 'reindex') {
      try {
        await runtime.client.request('space.folderReindex', { folderId: folder.id });
        ToastQueue.positive(F.reindexedToast(folder.name), { timeout: 4000 });
        void refresh();
      } catch (error) {
        failedToast(error);
      }
    }
  };
  const remove = async (folder: SemanticFolderStatus) => {
    try {
      await runtime.client.request('space.folderRemove', { folderId: folder.id });
      ToastQueue.positive(F.removedToast(folder.name), { timeout: 4000 });
      void refresh();
    } catch (error) {
      failedToast(error);
    }
  };
  if (web && folders.length === 0) return null;
  return (
    <>
      <div className={note}>{F.head}</div>
      {folders.map((folder) => {
        const view = folderRowView(folder, visualOn);
        return (
          <Row
            key={folder.id}
            label={folder.name}
            desc={
              <>
                <span className={pathText} title={folder.path}>
                  {shortenDir(folder.path, 48)}
                </span>
                <br />
                {view.what}
                {view.notes.map((n) => (
                  <span key={n} className={view.tone === 'notice' ? failed : muted}>
                    <br />
                    {n}
                  </span>
                ))}
              </>
            }>
            <span className={view.tone === 'notice' ? failed : value}>{view.line}</span>
            {web ? null : (
              <ActionMenu aria-label={F.actions(folder.name)} isQuiet size="S" onAction={(key) => void act(String(key), folder)}>
                <MenuItem id="reveal" textValue={revealLabel()} isDisabled={!folder.exists}>
                  <Folder />
                  <Text>{revealLabel()}</Text>
                </MenuItem>
                <MenuItem id="reindex" textValue={F.reindex} isDisabled={!folder.exists}>
                  <Refresh />
                  <Text>{F.reindex}</Text>
                  <Text slot="description">{F.reindexDesc}</Text>
                </MenuItem>
                <MenuItem id="remove" textValue={F.remove}>
                  <Delete />
                  <Text>{F.remove}</Text>
                  <Text slot="description">{F.removeDesc}</Text>
                </MenuItem>
              </ActionMenu>
            )}
          </Row>
        );
      })}
      {web ? null : (
        <div className={addRow}>
          <ActionButton size="S" isDisabled={picking} onPress={() => void pick()}>
            <FolderAdd />
            <Text>{F.add}</Text>
          </ActionButton>
        </div>
      )}
      {adding ? (
        <AddFolderDialog
          path={adding}
          visualOn={visualOn}
          onClose={() => setAdding(null)}
          onAdded={(folder) => {
            ToastQueue.positive(F.addedToast(folder.name), { timeout: 4000 });
            void refresh();
          }}
        />
      ) : null}
      <DialogContainer onDismiss={() => setRemoving(null)}>
        {removing ? (
          <AlertDialog
            variant="destructive"
            title={F.removeTitle(removing.name)}
            primaryActionLabel={F.remove}
            cancelLabel={INSTALL.cancel}
            onPrimaryAction={() => void remove(removing)}>
            {F.removeBody}
          </AlertDialog>
        ) : null}
      </DialogContainer>
    </>
  );
}

/** 添加索引文件夹：选好的文件夹、会建什么；画面没开时提醒视频文件与图片要画面。Runtime 拒绝（重叠、找不到）时原因留在框里。 */
function AddFolderDialog({
  path,
  visualOn,
  onClose,
  onAdded,
}: {
  path: string;
  visualOn: boolean;
  onClose: () => void;
  onAdded: (folder: SemanticFolderStatus) => void;
}) {
  const runtime = useRuntime();
  const F = COPY.folders;
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const submit = async (close: () => void) => {
    setBusy(true);
    setFailure(null);
    try {
      onAdded(await runtime.client.request('space.folderAdd', { path }));
      close();
    } catch (error) {
      setFailure(problemText(rpcProblem(error)));
    } finally {
      setBusy(false);
    }
  };
  return (
    <DialogContainer onDismiss={onClose}>
      <Dialog size="M">
        {({ close }) => (
          <>
            <Heading slot="title">{F.addTitle}</Heading>
            <Content>
              <div className={dialogStack}>
                <p className={body}>
                  <span className={dialogPath} title={path}>
                    {shortenDir(path, 60)}
                  </span>
                </p>
                <p className={body}>{F.addBody}</p>
                <p className={muted}>{F.addWhat(visualOn)}</p>
                {visualOn ? null : (
                  <InlineAlert variant="informative">
                    <Heading>{F.visualOffTitle}</Heading>
                    <Content>{F.visualOffBody}</Content>
                  </InlineAlert>
                )}
                {failure ? <p className={failed}>{failure}</p> : null}
              </div>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                {INSTALL.cancel}
              </Button>
              <Button variant="accent" isPending={busy} isDisabled={busy} onPress={() => void submit(close)}>
                {F.confirmAdd}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Dialog>
    </DialogContainer>
  );
}

/** 勾选要排除的项目。状态放在对话框外层：S2 的 Dialog 会把 children 在几个 slot 里各渲染一遍。 */
function ExcludeDialog({
  projects,
  excluded,
  onClose,
  onSave,
}: {
  projects: readonly ScopeProject[];
  excluded: readonly Id[];
  onClose: () => void;
  onSave: (next: Id[], toast: string) => void;
}) {
  const C = COPY.scope;
  const known = new Set(projects.map((p) => p.id));
  const [picked, setPicked] = useState<string[]>(() => excluded.filter((id) => known.has(id)));
  const before = new Set(excluded);
  const added = picked.filter((id) => !before.has(id)).length;
  const removed = excluded.filter((id) => known.has(id) && !picked.includes(id)).length;
  const done = () => {
    if (added || removed) {
      // 已经删掉的项目留在设置里（不碰），只改列出来的。
      const next = [...excluded.filter((id) => !known.has(id)), ...projects.filter((p) => picked.includes(p.id)).map((p) => p.id)];
      const toast = [added ? C.toastExcluded(added) : null, removed ? C.toastRestored(removed) : null]
        .filter((t): t is string => t !== null)
        .join(C.toastSeparator);
      onSave(next, toast);
    }
  };
  return (
    <DialogContainer onDismiss={onClose}>
      <Dialog size="M">
        {({ close }) => (
          <>
            <Heading slot="title">{C.dialogTitle}</Heading>
            <Content>
              <div className={dialogStack}>
                <p className={body}>{C.dialogBody}</p>
                {projects.length ? (
                  <CheckboxGroup label={C.dialogPick} value={picked} onChange={setPicked}>
                    {projects.map((p) => (
                      <Checkbox key={p.id} value={p.id}>
                        {p.name}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                ) : (
                  <p className={muted}>{C.noProjects}</p>
                )}
                {added ? <p className={muted}>{C.dialogAdded(added)}</p> : null}
              </div>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                {C.cancel}
              </Button>
              <Button
                variant="accent"
                onPress={() => {
                  done();
                  close();
                }}>
                {C.done}
              </Button>
            </ButtonGroup>
          </>
        )}
      </Dialog>
    </DialogContainer>
  );
}

// ---- 用到它的功能 ----

function FeaturesGroup({ web, installed }: { web: boolean; installed: boolean }) {
  const save = useSaveSettings();
  const ready = useSettingsReady();
  const tm = useSetting('semantic.translationMemory') ?? true;
  const terms = useSetting('semantic.glossaryCandidates') ?? true;
  return (
    <Group title={COPY.settings.featuresGroup}>
      <Row label={COPY.settings.tm} desc={installed ? COPY.settings.tmDesc : COPY.settings.tmDescLexical}>
        <Switch
          aria-label={COPY.settings.tm}
          isDisabled={web || !ready}
          isSelected={tm}
          onChange={(on) => void save({ 'semantic.translationMemory': on })}
        />
      </Row>
      <Row label={COPY.settings.terms} desc={installed ? COPY.settings.termsDesc : COPY.settings.termsDescLexical}>
        <Switch
          aria-label={COPY.settings.terms}
          isDisabled={web || !ready}
          isSelected={terms}
          onChange={(on) => void save({ 'semantic.glossaryCandidates': on })}
        />
      </Row>
    </Group>
  );
}

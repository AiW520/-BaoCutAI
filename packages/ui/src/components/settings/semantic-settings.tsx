import { useEffect, useState, type ReactNode } from 'react';
import type { Id, ModelBundleStatus, SemanticCoverage } from '@baocut/protocol';
import {
  ActionButton,
  AlertDialog,
  Badge,
  Button,
  Content,
  DialogContainer,
  Heading,
  InlineAlert,
  ProgressBar,
  Switch,
  Text,
  ToastQueue,
} from '@react-spectrum/s2';
import Download from '@react-spectrum/s2/icons/Download';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { downloadView, inlineInstallMode, problemText, removedToast, rpcProblem } from '../../model/models-install.ts';
import { bundleName, isBundleInstalled } from '../../model/models-local.ts';
import { M as COPY } from '../../model/semantic-copy.ts';
import { coverageLine, indexState } from '../../model/semantic-status.ts';
import { fmtSize } from '../../model/task-facts.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useDirectory } from '../../state/directory-store.ts';
import { useModels } from '../../state/models-store.ts';
import { useSemanticStatus, useSemanticState } from '../../state/semantic-store.ts';
import { useSetting } from '../../state/settings-store.ts';
import { InstallDialog } from '../models/install-dialog.tsx';
import { removeBundle } from '../models/local-model-actions.ts';
import { LOCAL_INSTALL_COPY as INSTALL } from '../models/local-models-copy.ts';
import { GATE_COPY } from '../tools/tools-copy.ts';
import { M as GENERAL } from './general-settings-copy.ts';
import { Group, Row } from './general-settings.tsx';
import { useSaveSettings, useSettingsReady } from './save-settings.ts';

/*
 * 设置 › 语义索引（创作辅助集成设计 §2.11；检索集成方案 v0.1 §4.2、§4.4、§13.2；设计稿 settings-semantic.jsx）。偏好设置一组。
 *
 * - 模型：「文字搜索」「多模态搜索」两个本机模型包（`capability: 'embed'`，不在模型页里列）；多模态包含文字，装了它不必再装文字包。
 *   安装走模型页同一个安装对话框（先看大小与许可）。
 * - 安装不等于扫描：装好后只给已有文稿建文字索引。画面与声音这一版没有索引：每个项目照样列出，开关置灰并写明原因。
 * - 索引：状态、暂停 / 恢复、缓存大小与清理（`space.indexControl`）、实际运行的设备。
 * - 用到它的两项开关：翻译记忆（`semantic.translationMemory`，Runtime 执行）、术语候选（`semantic.glossaryCandidates`，润色面板读它）。
 *
 * 浏览器里（Web）只看不改：能取状态（`space.indexStatus` 在白名单里），装模型、控制索引与改设置都不开放。
 */

const lead = style({ marginTop: -8, marginBottom: 24, font: 'ui-sm', color: 'gray-600' });
const pkg = style({ display: 'flex', flexDirection: 'column', gap: 8, paddingY: 16, minWidth: 0 });
const pkgHead = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, minWidth: 0 });
const pkgName = style({ flexGrow: 1, font: 'ui', fontWeight: 'medium', color: 'gray-900', minWidth: 0 });
const pkgActions = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 });
const muted = style({ margin: 0, font: 'ui-xs', color: 'gray-600', overflowWrap: 'anywhere' });
const body = style({ margin: 0, font: 'ui-sm', color: 'gray-700', overflowWrap: 'anywhere' });
const strong = style({ margin: 0, marginBottom: 24, font: 'ui-sm', color: 'gray-800', overflowWrap: 'anywhere' });
const alert = style({ marginBottom: 24 });
const progressRow = style({ display: 'flex', alignItems: 'center', gap: 8, font: 'ui-sm', color: 'gray-800' });
const progressBar = style({ width: 160 });
const value = style({ font: 'ui-sm', color: 'gray-800' });
const note = style({ paddingY: 12, font: 'ui-xs', color: 'gray-600', overflowWrap: 'anywhere' });
const project = style({ display: 'flex', flexDirection: 'column', gap: 8, paddingY: 16, minWidth: 0 });
const channels = style({ display: 'flex', flexDirection: 'column', gap: 4, paddingStart: 4 });
const channelRow = style({ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 });

const TEXT_BUNDLE = 'embeddinggemma2-text@litert-lm';

export function SemanticSettings() {
  const web = useRuntime().host.platform === 'web';
  const { status, error } = useSemanticStatus({ poll: true });
  const bundles = useModels((s) => s.bundles).filter((b) => b.capability === 'embed');
  const unsupported = bundles.length > 0 && bundles.every((b) => b.reason === 'unsupported');
  const installed = status?.model ?? null;
  return (
    <>
      <p className={lead}>{COPY.settings.lead}</p>
      {web ? <p className={strong}>{GENERAL.webViewOnly}</p> : null}
      {unsupported ? (
        <InlineAlert variant="notice" styles={alert}>
          <Heading>{COPY.settings.unsupportedTitle}</Heading>
          <Content>{COPY.settings.unsupportedBody}</Content>
        </InlineAlert>
      ) : null}
      <ModelGroup bundles={bundles} inUse={installed?.bundleId ?? null} web={web} />
      {!status ? (
        <p className={body}>{error ? COPY.settings.loadFailed(error) : COPY.settings.loading}</p>
      ) : installed ? (
        <>
          <IndexGroup web={web} />
          <ProjectsGroup multimodal={installed.bundleId !== TEXT_BUNDLE} />
        </>
      ) : null}
      <FeaturesGroup web={web} installed={installed !== null} />
    </>
  );
}

// ---- 模型 ----

function ModelGroup({ bundles, inUse, web }: { bundles: ModelBundleStatus[]; inUse: string | null; web: boolean }) {
  const runtime = useRuntime();
  const all = useModels((s) => s.bundles);
  const [installing, setInstalling] = useState<{ bundle: ModelBundleStatus; mode: 'install' | 'complete' } | null>(null);
  const [removing, setRemoving] = useState<ModelBundleStatus | null>(null);
  const multimodal = bundles.find((b) => b.bundleId !== TEXT_BUNDLE && isBundleInstalled(b));
  const remove = async (bundle: ModelBundleStatus) => {
    try {
      const result = await removeBundle(runtime, bundle.bundleId);
      ToastQueue.positive(removedToast(bundleName(bundle), result), { timeout: 4000 });
    } catch (err) {
      ToastQueue.negative(INSTALL.removeFailed(problemText(rpcProblem(err))), { timeout: 8000 });
    }
  };
  return (
    <Group title={COPY.settings.modelGroup}>
      {bundles.map((bundle) => {
        const text = bundle.bundleId === TEXT_BUNDLE;
        const own = isBundleInstalled(bundle);
        const covered = text && !own && !!multimodal;
        const view = downloadView(bundle);
        const chip: [string, 'positive' | 'neutral' | 'notice'] =
          bundle.reason === 'unsupported'
            ? [COPY.settings.unsupported, 'notice']
            : covered
              ? [COPY.settings.coveredBy, 'neutral']
              : bundle.bundleId === inUse
                ? [COPY.settings.inUse, 'positive']
                : own
                  ? [COPY.settings.installed, 'positive']
                  : [COPY.settings.notInstalled, 'neutral'];
        return (
          <div key={bundle.bundleId} className={pkg}>
            <div className={pkgHead}>
              <span className={pkgName}>{text ? COPY.settings.textName : COPY.settings.multimodalName}</span>
              {view.size && !own ? <span className={muted}>{view.size}</span> : null}
              <Badge variant={chip[1]} size="S" fillStyle="subtle">
                {chip[0]}
              </Badge>
            </div>
            <p className={muted}>{`${text ? COPY.settings.textDesc : COPY.settings.multimodalDesc} · ${bundleName(bundle)}`}</p>
            {view.state === 'running' ? (
              <span className={progressRow} role="status">
                <ProgressBar
                  size="S"
                  aria-label={GATE_COPY.downloading(view.percent)}
                  isIndeterminate={view.percent === null}
                  {...(view.percent === null ? {} : { value: view.percent })}
                  styles={progressBar}
                />
                {GATE_COPY.downloading(view.percent)}
              </span>
            ) : web ? null : (
              <div className={pkgActions}>
                {!own && !covered && bundle.reason !== 'unsupported' ? (
                  <Button
                    size="S"
                    variant={text ? 'accent' : 'secondary'}
                    onPress={() => setInstalling({ bundle, mode: inlineInstallMode(bundle, all) })}>
                    <Download />
                    <Text>{view.state === 'paused' ? COPY.settings.resume : COPY.settings.install(view.size)}</Text>
                  </Button>
                ) : null}
                {own ? (
                  <ActionButton size="S" isQuiet onPress={() => setRemoving(bundle)}>
                    {COPY.settings.remove}
                  </ActionButton>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
      {bundles.some(isBundleInstalled) ? null : <div className={note}>{COPY.settings.installNote}</div>}
      {installing ? (
        <InstallDialog
          bundleId={installing.bundle.bundleId}
          name={bundleName(installing.bundle)}
          license={installing.bundle.license ?? null}
          mode={installing.mode}
          onClose={() => setInstalling(null)}
        />
      ) : null}
      <DialogContainer onDismiss={() => setRemoving(null)}>
        {removing ? (
          <AlertDialog
            variant="destructive"
            title={INSTALL.removeTitle(bundleName(removing))}
            primaryActionLabel={INSTALL.removeConfirm}
            cancelLabel={INSTALL.cancel}
            onPrimaryAction={() => void remove(removing)}>
            {COPY.settings.removeBody}
          </AlertDialog>
        ) : null}
      </DialogContainer>
    </Group>
  );
}

// ---- 索引 ----

function IndexGroup({ web }: { web: boolean }) {
  const runtime = useRuntime();
  const { status, refresh } = useSemanticStatus();
  const [clearing, setClearing] = useState(false);
  const [busy, setBusy] = useState(false);
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
  const desc =
    state === 'paused'
      ? COPY.settings.pausedDesc
      : state === 'updating'
        ? COPY.note.stale
        : state === 'unavailable'
          ? COPY.reason.INDEX_NOT_READY
          : COPY.settings.readyDesc;
  const tone = state === 'ready' ? 'positive' : state === 'paused' ? 'notice' : state === 'updating' ? 'informative' : 'neutral';
  return (
    <Group title={COPY.settings.indexGroup}>
      <Row label={COPY.settings.status} desc={desc}>
        <Badge variant={tone} size="S" fillStyle="subtle">
          {COPY.settings.state[state]}
        </Badge>
        {web ? null : (
          <Button
            size="S"
            variant="secondary"
            isDisabled={busy || state === 'unavailable'}
            onPress={() =>
              void (status.paused ? control('resume', COPY.settings.resumed) : control('pause', COPY.settings.paused))
            }>
            {status.paused ? COPY.settings.resumeIndex : COPY.settings.pause}
          </Button>
        )}
      </Row>
      <Row label={COPY.settings.cache} desc={COPY.settings.cacheDesc}>
        <span className={value}>{fmtSize(status.cacheBytes)}</span>
        {web ? null : (
          <ActionButton size="S" isQuiet isDisabled={busy || status.cacheBytes === 0} onPress={() => setClearing(true)}>
            {COPY.settings.clear}
          </ActionButton>
        )}
      </Row>
      <Row label={COPY.settings.runsOn} desc={COPY.settings.runsOnDesc}>
        <span className={value}>{status.model.device ? `${status.model.label} · ${status.model.device.toUpperCase()}` : `${status.model.label} · ${COPY.settings.notLoaded}`}</span>
      </Row>
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

// ---- 已索引的项目 ----

/** 每个项目（与不属于项目的视频）的文字完整性；跟着总体状态一起刷新。 */
function useProjectCoverage(): Map<Id | null, SemanticCoverage[]> {
  const runtime = useRuntime();
  const projects = useDirectory((s) => s.projects);
  const at = useSemanticState((s) => s.at);
  const [coverage, setCoverage] = useState(new Map<Id | null, SemanticCoverage[]>());
  const ids = projects.map((p) => p.id).join(',');
  useEffect(() => {
    let live = true;
    const scopes: (Id | null)[] = [...(ids ? ids.split(',') : []), null];
    void Promise.all(
      scopes.map((projectId) =>
        runtime.client.request('space.indexStatus', { projectId }).then(
          (status) => [projectId, status.coverage] as const,
          () => [projectId, [] as SemanticCoverage[]] as const,
        ),
      ),
    ).then((rows) => live && setCoverage(new Map(rows)));
    return () => {
      live = false;
    };
  }, [runtime, ids, at]);
  return coverage;
}

function ProjectsGroup({ multimodal }: { multimodal: boolean }) {
  const projects = useDirectory((s) => s.projects);
  const coverage = useProjectCoverage();
  const rows: { id: Id | null; name: string }[] = [...projects.map((p) => ({ id: p.id, name: p.name })), { id: null, name: COPY.settings.noProject }];
  const later = multimodal ? COPY.settings.channelLater : COPY.settings.channelNeedsMultimodal;
  return (
    <Group title={COPY.settings.projectsGroup}>
      <div className={note}>{COPY.settings.projectsLead}</div>
      {rows.map((row) => {
        const lines = coverage.get(row.id);
        return (
          <div key={row.id ?? '-'} className={project}>
            <div className={pkgHead}>
              <span className={pkgName}>{row.name}</span>
              <span className={muted}>{lines ? coverageLine(lines) : COPY.settings.loading}</span>
            </div>
            <div className={channels}>
              <Channel label={COPY.settings.visual} name={row.name} why={later} />
              <Channel label={COPY.settings.audio} name={row.name} why={later} />
            </div>
          </div>
        );
      })}
    </Group>
  );
}

function Channel({ label, name, why }: { label: string; name: string; why: string }): ReactNode {
  return (
    <div className={channelRow}>
      <Switch size="S" isDisabled isSelected={false} aria-label={`${name} · ${label}`} />
      <span className={body}>{label}</span>
      <span className={muted}>{why}</span>
    </div>
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

import { useEffect } from 'react';
import { create } from 'zustand';
import type { ExternalToolStatus, Id } from '@baocut/protocol';
import { ActionButton, Badge, Button, ProgressBar, Text, ToastQueue } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { jobErrorText } from '../../model/localized-text.ts';
import { MUSIC_ENGINE_TOOL, engineCard, type EngineCardState } from '../../model/music-engine.ts';
import { M } from '../../model/music-engine-copy.ts';
import { useRuntime } from '../../runtime/context.tsx';
import type { RuntimeSession } from '../../runtime/session.ts';
import { isJobLive, useJobs } from '../../state/jobs-store.ts';

/*
 * 设置 › 音乐生成 › 音乐引擎（设计稿 settings-model-check.jsx `MusicEngineRow`；架构设计 §6.5、§12.9）。音乐模型跑在 audio.cpp
 * 引擎上，引擎不随应用分发，是受管外部工具 `audiocpp`：进来先在本机看一眼（`externalTools.detect`，只跑 `--version`），
 * 用户点「安装引擎」才下载（`externalTools.install`），进度读 `jobs` 主题里那条 `toolInstall` 任务，结束后重新检测，失败时提示原因。
 * 也可以指定自己构建的那一份（`externalTools.setPath`）。与视频下载工具卡片同一套做法（start/downloader-card.tsx），状态分开存。
 * 浏览器里只说去哪里装：Web 白名单不含 `externalTools.*`。
 */

interface EngineState {
  status: ExternalToolStatus | null;
  checking: boolean;
  checked: boolean;
  /** 用户刚按了安装、任务事件还没到。 */
  installing: boolean;
  installJobId: Id | null;
  /** 检测本身失败（Runtime 没连上等）。 */
  error: string | null;
  /** 正在提交安装或指定路径。 */
  busy: boolean;
}

export const useMusicEngine = create<EngineState>()(() => ({
  status: null,
  checking: false,
  checked: false,
  installing: false,
  installJobId: null,
  error: null,
  busy: false,
}));

const messageOf = (error: unknown) => (error instanceof Error ? error.message : String(error));

let detecting: Promise<void> | null = null;

/** 重新检测（只在本机看一眼版本、不联网）。同时只跑一次。 */
export function detectMusicEngine(runtime: Pick<RuntimeSession, 'detectExternalTool'>): Promise<void> {
  if (detecting) return detecting;
  useMusicEngine.setState({ checking: true });
  detecting = runtime
    .detectExternalTool(MUSIC_ENGINE_TOOL)
    .then(
      (status) => useMusicEngine.setState({ status, checked: true, error: null }),
      (error: unknown) => useMusicEngine.setState({ checked: true, error: messageOf(error) }),
    )
    .finally(() => {
      useMusicEngine.setState({ checking: false });
      detecting = null;
    });
  return detecting;
}

async function installMusicEngine(runtime: RuntimeSession): Promise<void> {
  useMusicEngine.setState({ busy: true, installing: true });
  try {
    const { tool, jobId } = await runtime.installExternalTool(MUSIC_ENGINE_TOOL);
    useMusicEngine.setState({ status: tool, installJobId: jobId });
  } catch (error) {
    useMusicEngine.setState({ installing: false });
    ToastQueue.negative(M.installFailed(messageOf(error)), { timeout: 6000 });
  } finally {
    useMusicEngine.setState({ busy: false });
  }
}

/** 指定自己构建的那一份（Runtime 先跑一次 `--version` 核对）。宿主没有打开对话框时不显示这一项。 */
async function pickMusicEngine(runtime: RuntimeSession): Promise<void> {
  const pick = runtime.host.pickFiles;
  if (!pick) return;
  const [path] = await pick({ title: M.pickTitle, buttonLabel: M.pickButton, multiple: false });
  if (!path) return;
  useMusicEngine.setState({ busy: true });
  try {
    const status = await runtime.setExternalToolPath(MUSIC_ENGINE_TOOL, path);
    useMusicEngine.setState({ status });
  } catch (error) {
    ToastQueue.negative(M.pickFailed(messageOf(error)), { timeout: 6000 });
  } finally {
    useMusicEngine.setState({ busy: false });
  }
}

const section = style({ marginTop: 4, marginBottom: 20 });
const sectionTitle = style({ margin: 0, marginBottom: 4, font: 'title-sm', color: 'gray-900' });
const row = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingY: 12 });
const main = style({ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1, flexBasis: 0, minWidth: 220 });
const name = style({ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, font: 'ui', fontWeight: 'medium', color: 'gray-900' });
const body = style({ margin: 0, font: 'ui-sm', color: 'gray-700', overflowWrap: 'anywhere' });
const facts = style({ margin: 0, font: 'ui-xs', color: 'gray-600', overflowWrap: 'anywhere' });
const actions = style({ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 });
const progress = style({ width: 160, flexShrink: 0 });

const BADGE: Record<EngineCardState, 'positive' | 'informative' | 'notice' | 'negative' | 'neutral'> = {
  checking: 'neutral',
  unknown: 'negative',
  install: 'notice',
  installing: 'informative',
  blocked: 'notice',
  broken: 'negative',
  ready: 'positive',
};

/**
 * 音乐引擎一行：放在音乐生成的本机模型之前（设计稿把它排在「默认模型」上面）。只在音乐生成这一类用。
 */
export function MusicEngineCard() {
  const runtime = useRuntime();
  const web = runtime.host.platform === 'web';
  const state = useMusicEngine();
  const jobId = state.installJobId ?? state.status?.installJobId ?? null;
  const job = useJobs((s) => (jobId ? (s.jobs.find((j) => j.jobId === jobId) ?? null) : null));
  const ended = !!job && !isJobLive(job);

  useEffect(() => {
    if (!web && !useMusicEngine.getState().checked) void detectMusicEngine(runtime);
  }, [web, runtime]);

  useEffect(() => {
    if (!ended || !job) return;
    useMusicEngine.setState({ installing: false, installJobId: null });
    if (job.state === 'failed') ToastQueue.negative(M.installFailed(jobErrorText(job.error) ?? M.installFailedFallback), { timeout: 6000 });
    void detectMusicEngine(runtime).then(() => {
      const status = useMusicEngine.getState().status;
      if (job.state === 'completed' && status?.state === 'installed') ToastQueue.positive(M.installed(status.version), { timeout: 4000 });
    });
    // 只在这条安装任务结束的那一下收尾。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended, job?.jobId, runtime]);

  if (web) {
    return (
      <section className={section} aria-label={M.heading}>
        <h2 className={sectionTitle}>{M.heading}</h2>
        <p className={body}>{M.webNote}</p>
      </section>
    );
  }

  const installing = state.installing || (!!job && !ended);
  const c = engineCard(state.status, { checking: state.checking, installing, error: state.error });
  const p = job?.progress;
  const pct = p && p.total ? Math.max(0, Math.min(100, Math.floor((p.done / p.total) * 100))) : null;
  const canPick = !!runtime.host.pickFiles;
  const settled = c.state !== 'checking' && c.state !== 'installing';
  return (
    <section className={section} aria-label={M.heading}>
      <h2 className={sectionTitle}>{M.heading}</h2>
      <div className={row}>
        <div className={main}>
          <span className={name}>
            audio.cpp
            <Badge variant={BADGE[c.state]} fillStyle="subtle" size="S">
              {M.badge[c.state]}
            </Badge>
          </span>
          <p className={body}>{c.body}</p>
          {c.facts.map((f) => (
            <p key={f} className={facts}>
              {f}
            </p>
          ))}
        </div>
        {c.state === 'installing' ? (
          <div className={progress}>
            <ProgressBar aria-label={M.progress} size="S" isIndeterminate={pct === null} value={pct ?? undefined} />
          </div>
        ) : null}
        <div className={actions}>
          {c.action ? (
            <Button variant="accent" size="S" isPending={state.busy} onPress={() => void installMusicEngine(runtime)}>
              {c.action}
            </Button>
          ) : null}
          {settled ? (
            <ActionButton size="S" isQuiet isPending={state.checking} onPress={() => void detectMusicEngine(runtime)}>
              <Text>{M.recheck}</Text>
            </ActionButton>
          ) : null}
          {settled && canPick && c.state !== 'unknown' ? (
            <ActionButton size="S" isQuiet isDisabled={state.busy} onPress={() => void pickMusicEngine(runtime)}>
              <Text>{M.pick}</Text>
            </ActionButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

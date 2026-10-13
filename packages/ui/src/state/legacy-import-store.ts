import { create } from 'zustand';
import type { LegacyImportPrompt, LegacyImportRun, LegacyImportSnapshot, LegacySettingsReport } from '@baocut/protocol';

/**
 * 旧版项目导入（`legacy-import` 主题，架构设计 §2.7）：启动询问与这次启动的导入进度、结果。只有外壳根上的
 * LegacyImportHost 订阅并写这里（一个主题只有一个处理函数）；任务页、Home 顶上那一条与 rail 读这里。Web 一直是空的。
 */
export interface LegacyImportStore {
  prompt: LegacyImportPrompt | null;
  run: LegacyImportRun | null;
  settingsReport: LegacySettingsReport | null;
  settingsReportOpen: boolean;
  readSettingsReports: string[];
  settingsReadLoaded: boolean;
  /** Home 顶上那一条关掉的是哪一次结果（`runId:finishedAt`）：再有新的结果（重试跑完）会再出来。 */
  bannerClosed: string | null;
  set(state: LegacyImportSnapshot): void;
  closeBanner(key: string): void;
  openSettingsReport(): void;
  closeSettingsReport(): void;
}

const SETTINGS_READ_KEY = 'baocut.legacySettingsRead';

/** Read acknowledgements only after Runtime supplies a report; ordinary users never enter this storage path. */
function readSettingsReports(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_READ_KEY) ?? 'null');
    const ids: unknown = saved?.version === 1 ? saved.state?.readSettingsReports : null;
    return Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string' && id.length > 0) : [];
  } catch { return []; }
}

export const useLegacyImport = create<LegacyImportStore>()((set) => ({
  prompt: null,
  run: null,
  settingsReport: null,
  settingsReportOpen: false,
  readSettingsReports: [],
  settingsReadLoaded: false,
  bannerClosed: null,
  set: ({ prompt, run, settingsReport }) => set((current) => {
    const report = settingsReport ?? null;
    const read = report && !current.settingsReadLoaded ? readSettingsReports() : current.readSettingsReports;
    return {
      prompt, run, settingsReport: report,
      readSettingsReports: read,
      settingsReadLoaded: current.settingsReadLoaded || report !== null,
      settingsReportOpen: !!report && (
        (current.settingsReport?.reportId === report.reportId && current.settingsReportOpen)
        || !read.includes(report.reportId)
      ),
    };
  }),
  closeBanner: (key) => set({ bannerClosed: key }),
  openSettingsReport: () => set((current) => ({ settingsReportOpen: current.settingsReport !== null })),
  closeSettingsReport: () => set((current) => {
    if (!current.settingsReport) return { settingsReportOpen: false };
    const read = [...new Set([...current.readSettingsReports, current.settingsReport.reportId])];
    // Persist only opaque identifiers, and only when this user actually reads a legacy report.
    try { localStorage.setItem(SETTINGS_READ_KEY, JSON.stringify({ state: { readSettingsReports: read }, version: 1 })); }
    catch { /* Keep the acknowledgement for this window when local storage is unavailable. */ }
    return { settingsReportOpen: false, readSettingsReports: read };
  }),
}));

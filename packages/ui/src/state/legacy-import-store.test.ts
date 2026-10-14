import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LegacyImportRun, LegacySettingsReport } from '@baocut/protocol';
import { useLegacyImport } from './legacy-import-store.ts';

const report: LegacySettingsReport = { reportId: 'report-a', fields: ['transcribe.model'], modelsDirectory: '/legacy/models' };
beforeEach(() => {
  localStorage.removeItem('baocut.legacySettingsRead');
  localStorage.removeItem('baocut.legacyImportBannerDismissed');
  useLegacyImport.setState({ prompt: null, run: null, settingsReport: null, settingsReportOpen: false, readSettingsReports: [], settingsReadLoaded: false, bannerDismissed: false, bannerDismissalLoaded: false, bannerRunId: null });
  vi.restoreAllMocks();
});

describe('legacy settings report', () => {
  it('does no acknowledgement storage work and opens no report for ordinary users', () => {
    const read = vi.spyOn(localStorage, 'getItem');
    const write = vi.spyOn(localStorage, 'setItem');
    useLegacyImport.getState().set({ prompt: null, run: null });
    useLegacyImport.getState().openSettingsReport();
    useLegacyImport.getState().closeSettingsReport();
    expect(useLegacyImport.getState()).toMatchObject({ settingsReport: null, settingsReportOpen: false, settingsReadLoaded: false });
    expect(read).not.toHaveBeenCalled();
    expect(write).not.toHaveBeenCalled();
  });
  it('shows recovery independently of project imports, then remains closed across snapshots and reopening the client', async () => {
    const snapshot = { prompt: null, run: null, settingsReport: report };
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState().settingsReportOpen).toBe(true);
    useLegacyImport.getState().closeSettingsReport();
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState().settingsReportOpen).toBe(false);
    const persisted = localStorage.getItem('baocut.legacySettingsRead')!;
    expect(JSON.parse(persisted).state).toEqual({ readSettingsReports: ['report-a'] });
    expect(persisted).not.toContain('/legacy/models');
    // Simulate a fresh window's memory, then hydrate its stored acknowledgement.
    useLegacyImport.setState({ readSettingsReports: [], settingsReadLoaded: false });
    localStorage.setItem('baocut.legacySettingsRead', persisted);
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState().settingsReportOpen).toBe(false);
    expect(useLegacyImport.getState().settingsReport).toEqual(report);
  });

  it('allows manual reopening after acknowledgement and shows a different report once', () => {
    useLegacyImport.getState().set({ prompt: null, run: null, settingsReport: report });
    useLegacyImport.getState().closeSettingsReport();
    useLegacyImport.getState().openSettingsReport();
    expect(useLegacyImport.getState().settingsReportOpen).toBe(true);
    useLegacyImport.getState().closeSettingsReport();
    useLegacyImport.getState().set({ prompt: null, run: null, settingsReport: { ...report, reportId: 'report-b' } });
    expect(useLegacyImport.getState().settingsReportOpen).toBe(true);
    useLegacyImport.getState().closeSettingsReport();
    expect(useLegacyImport.getState().readSettingsReports).toEqual(['report-a', 'report-b']);
    useLegacyImport.getState().set({ prompt: null, run: null });
    useLegacyImport.getState().openSettingsReport();
    expect(useLegacyImport.getState()).toMatchObject({ settingsReport: null, settingsReportOpen: false });
  });

  it('does not let malformed persisted data replace live reports or actions', async () => {
    localStorage.setItem('baocut.legacySettingsRead', JSON.stringify({ version: 1, state: { readSettingsReports: [null, 2, '', 'report-a'], settingsReportOpen: true } }));
    useLegacyImport.getState().set({ prompt: null, run: null, settingsReport: report });
    expect(useLegacyImport.getState()).toMatchObject({ readSettingsReports: ['report-a'], settingsReportOpen: false });
    useLegacyImport.getState().set({ prompt: null, run: null, settingsReport: report });
    expect(useLegacyImport.getState().settingsReportOpen).toBe(false);
  });
});

describe('legacy import banner dismissal', () => {
  const run: LegacyImportRun = {
    runId: 'run-a', directory: '/projects', state: 'finished',
    startedAt: '2026-10-13T10:00:00Z', finishedAt: '2026-10-13T10:01:00Z', items: [],
  };
  const snapshot = { prompt: null, run };

  it('restores a finished task without showing its old Home result again', () => {
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState()).toMatchObject({ run, bannerRunId: null });
    useLegacyImport.getState().set({ ...snapshot, run: { ...run, state: 'importing', finishedAt: null } });
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState().bannerRunId).toBe(run.runId);
    useLegacyImport.getState().set({ ...snapshot, run: { ...run, runId: 'another-finished-run' } });
    expect(useLegacyImport.getState().bannerRunId).toBe(run.runId);
  });

  it('remains dismissed across updates, retries, and a fresh client with a new run', () => {
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState().bannerDismissed).toBe(false);
    useLegacyImport.getState().closeBanner();
    useLegacyImport.getState().set({ ...snapshot, run: { ...run, state: 'importing', finishedAt: null } });
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState().bannerDismissed).toBe(true);
    expect(localStorage.getItem('baocut.legacyImportBannerDismissed')).toBe('true');
    useLegacyImport.setState({ bannerDismissed: false, bannerDismissalLoaded: false, bannerRunId: null });
    useLegacyImport.getState().set({ prompt: null, run: null });
    useLegacyImport.getState().set({ ...snapshot, run: { ...run, runId: 'run-b' } });
    expect(useLegacyImport.getState()).toMatchObject({ bannerDismissed: true, run: { runId: 'run-b' } });
  });

  it('only accepts an explicit saved dismissal', () => {
    for (const value of ['false', 'null', '{bad json', '{"bannerDismissed":true}']) {
      localStorage.setItem('baocut.legacyImportBannerDismissed', value);
      useLegacyImport.setState({ bannerDismissed: false, bannerDismissalLoaded: false, bannerRunId: null });
      useLegacyImport.getState().set(snapshot);
      expect(useLegacyImport.getState().bannerDismissed).toBe(false);
    }
  });

  it('still closes in memory when storage cannot be read or written', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => { throw new Error('unavailable'); });
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => { throw new Error('unavailable'); });
    useLegacyImport.getState().set(snapshot);
    useLegacyImport.getState().closeBanner();
    useLegacyImport.getState().set(snapshot);
    expect(useLegacyImport.getState().bannerDismissed).toBe(true);
  });
});

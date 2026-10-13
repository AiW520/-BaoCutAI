import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LegacySettingsReport } from '@baocut/protocol';
import { useLegacyImport } from './legacy-import-store.ts';

const report: LegacySettingsReport = { reportId: 'report-a', fields: ['transcribe.model'], modelsDirectory: '/legacy/models' };
beforeEach(() => {
  localStorage.removeItem('baocut.legacySettingsRead');
  useLegacyImport.setState({ prompt: null, run: null, settingsReport: null, settingsReportOpen: false, readSettingsReports: [], settingsReadLoaded: false, bannerClosed: null });
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

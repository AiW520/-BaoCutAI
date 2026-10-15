import { afterEach, describe, expect, it, vi } from 'vitest';
import { isFrameArtifact } from "../boot/environment";
import { commentSummonHost, versionHistoryOffered } from './docs-host';

vi.mock("../boot/environment", () => ({ isFrameArtifact: vi.fn(() => false) }));

const inFrame = vi.mocked(isFrameArtifact);

afterEach(() => {
  inFrame.mockReset();
  inFrame.mockReturnValue(false);
  vi.unstubAllGlobals();
});

describe('version history gate', () => {
  it('stays off on standalone pages, even with the BaoCut host installed', () => {
    expect(versionHistoryOffered()).toBe(false);
    vi.stubGlobal('docsHost', {
      comments: { canSendToClaude: async () => 'available', sendToClaude: async () => ({ threadId: 't' }) },
      chat: { focus() {} },
    });
    expect(commentSummonHost()).toBe(true);
    expect(versionHistoryOffered()).toBe(false);
  });

  it('keeps the original behaviour inside the Frame', () => {
    inFrame.mockReturnValue(true);
    expect(versionHistoryOffered()).toBe(true);
  });
});

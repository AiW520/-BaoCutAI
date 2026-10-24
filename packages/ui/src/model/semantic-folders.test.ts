import { describe, expect, it } from 'vitest';
import type { SemanticFolderStatus } from '@baocut/protocol';
import { folderRowView } from './semantic-folders.ts';

const folder = (patch: Partial<SemanticFolderStatus> = {}, counts: Partial<SemanticFolderStatus['counts']> = {}): SemanticFolderStatus => ({
  id: 'fld_1',
  path: '/Users/me/Documents/Footage',
  name: 'Footage',
  exists: true,
  issue: null,
  counts: { videos: 0, videoFiles: 0, images: 0, exports: 0, duplicates: 0, legacy: 0, ...counts },
  visual: null,
  ...patch,
});

describe('设置里的索引文件夹', () => {
  it('写认出了什么、跳过了什么与画面进度', () => {
    const view = folderRowView(folder({ visual: { done: 2, total: 4 } }, { videoFiles: 3, images: 1, exports: 1 }), true);
    expect(view).toEqual({ line: '画面 2/4 个完成', tone: null, what: '3 个视频素材、1 张图片 · 1 个成片跳过', notes: [] });
    expect(folderRowView(folder({ visual: { done: 1, total: 1 } }, { videoFiles: 1 }), true).line).toBe('画面已就绪');
    expect(folderRowView(folder({ visual: { done: 0, total: 0 } }), true)).toMatchObject({
      line: '画面已就绪',
      what: '还没扫到视频和图片',
    });
  });

  it('画面没开时：有 开胡-OpenFox 视频的按文字建，没有的写画面没开', () => {
    expect(folderRowView(folder({}, { videos: 1, videoFiles: 3 }), false).line).toBe('文字按里面的 开胡-OpenFox 视频建');
    expect(folderRowView(folder({}, { videoFiles: 3 }), false).line).toBe('画面索引没开，视频素材与图片还没建');
  });

  it('只扫了前面的、读不了、旧版视频各写一句；文件夹不在时写找不到并说明索引留着', () => {
    const big = folderRowView(folder({ issue: { kind: 'truncated', limit: 2000 } }, { videos: 1, duplicates: 1, legacy: 2 }), true);
    expect(big.what).toBe('1 部 开胡-OpenFox 视频 · 1 部已在项目里 · 2 部旧版视频不读');
    expect(big.notes).toHaveLength(2);
    expect(big.notes[0]).toContain('2000');
    expect(folderRowView(folder({ issue: { kind: 'unreadable', limit: null } }), true).notes).toEqual(['读不了这个文件夹，检查一下权限。']);
    const gone = folderRowView(folder({ exists: false }, { videoFiles: 58 }), true);
    expect(gone).toMatchObject({ line: '找不到这个文件夹', tone: 'notice', what: '58 个视频素材' });
    expect(gone.notes[0]).toContain('索引留着');
  });
});

import { describe, expect, it } from 'vitest';
import { RpcError, type SpaceEntry, type SpaceEntryKind } from '@baocut/protocol';
import { IMAGE_ENTRY_KINDS, withImageEntries, type SpaceFileResolver } from './space-inputs.ts';

/** Space 条目作为生图的输入图（架构设计 §6.1、§7.9）：方法层换成文件与名字，路径与素材原样交下去。 */

function resolver(files: Record<string, { file: string; fileName: string; kind: SpaceEntryKind }>): SpaceFileResolver & { asked: string[][] } {
  const asked: string[][] = [];
  return {
    asked,
    resolveFile(entryId, kinds) {
      asked.push([...kinds]);
      const found = files[entryId];
      if (!found) throw new RpcError('not-found', 'gone');
      if (!kinds.includes(found.kind)) throw new RpcError('invalid-request', 'kind', { code: 'SPACE_ENTRY_UNSUPPORTED' });
      return { entry: { id: entryId, kind: found.kind, fileName: found.fileName } as SpaceEntry, file: found.file };
    },
  };
}

describe('withImageEntries', () => {
  it('{ entryId } 换成文件与名字，顺序不变；路径与 { assetId } 原样；没有条目时原样返回', () => {
    const space = resolver({ ent_1: { file: '/p/cover.png', fileName: 'cover.png', kind: 'image' } });
    const request = { prompt: 'x', images: ['/a.png', { entryId: 'ent_1' }, { assetId: 'ast_1' }], videoId: 'vid_1' };
    expect(withImageEntries(space, request).images).toEqual(['/a.png', { entryId: 'ent_1', file: '/p/cover.png', name: 'cover.png' }, { assetId: 'ast_1' }]);
    expect(space.asked).toEqual([[...IMAGE_ENTRY_KINDS]]);
    const plain = { prompt: 'x', images: ['/a.png'] };
    expect(withImageEntries(space, plain)).toBe(plain);
  });

  it('不是图片的条目、不在的条目照 resolveFile 拒绝', () => {
    const space = resolver({ ent_doc: { file: '/p/a.md', fileName: 'a.md', kind: 'document' } });
    expect(() => withImageEntries(space, { prompt: 'x', images: [{ entryId: 'ent_doc' }] })).toThrow(
      expect.objectContaining({ details: { code: 'SPACE_ENTRY_UNSUPPORTED' } }),
    );
    expect(() => withImageEntries(space, { prompt: 'x', images: [{ entryId: 'ent_none' }] })).toThrow(expect.objectContaining({ code: 'not-found' }));
  });
});

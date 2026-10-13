import { afterEach, describe, expect, it } from 'vitest';
import { LOCALES, formatRef, localizeText, setLocale, RpcError } from '@baocut/protocol';
import { checkExportSpace, EXPORT_DISK_RESERVE } from './export-space.ts';

const GiB = 1024 ** 3;
describe('导出磁盘空间检查', () => {
  afterEach(() => setLocale('zh-Hans'));
  it('按指定目录探测目标盘，错误包含实际位置、需求、可用量与消息引用', async () => {
    const dir = '/Volumes/外置 SSD/导出';
    let probed = '';
    const error = await checkExportSpace(dir, 10 * GiB, 'temporary', async (path) => {
      probed = path;
      return { bavail: 7n * BigInt(GiB), bsize: 1n };
    }).catch((e: unknown) => e);
    expect(probed).toBe(dir);
    expect(error).toBeInstanceOf(RpcError);
    expect(error).toMatchObject({ details: { code: 'EXPORT_INSUFFICIENT_SPACE', storage: 'temporary', dir, required: 11 * GiB, available: 7 * GiB } });
    const rpc = error as RpcError;
    const english = formatRef(rpc.messageRef!, rpc.message, 'en');
    for (const locale of LOCALES) {
      const message = formatRef(rpc.messageRef!, rpc.message, locale);
      expect(message).toContain(dir);
      expect(message).toContain('11.0 GiB');
      expect(message).toContain('7.0 GiB');
      expect(message).not.toBe('[object Object]');
      if (locale !== 'en') expect(message).not.toBe(english);
    }
    setLocale('zh-Hans');
    expect(localizeText(rpc.message, rpc.messageRef)).toContain('临时文件');
  });

  it('目标盘有空间时通过；预留也算在需求内', async () => {
    await expect(checkExportSpace('D:\\导出', 10 * GiB, 'temporary', async () => ({ bavail: 441 * GiB, bsize: 1 }))).resolves.toBeUndefined();
    await expect(checkExportSpace('D:\\导出', 10 * GiB, 'temporary', async () => ({ bavail: 10 * GiB + EXPORT_DISK_RESERVE, bsize: 1 }))).resolves.toBeUndefined();
  });

  it('持久副本的磁盘不足时说明释放产物库磁盘空间，更换导出目录无效', async () => {
    const error = await checkExportSpace('/runtime/artifacts', 2 * GiB, 'artifact', async () => ({ bavail: GiB, bsize: 1 })).catch((e: RpcError) => e);
    expect(error).toMatchObject({ details: { storage: 'artifact' } });
    expect((error as RpcError).message).toContain('持久副本');
    expect((error as RpcError).details).toMatchObject({ recovery: expect.stringContaining('更换导出目录不会') });
  });

  it('探测失败不会当作空间充足', async () => {
    await expect(checkExportSpace('/missing', GiB, 'temporary', async () => { throw Object.assign(new Error('gone'), { code: 'ENOENT' }); })).rejects.toMatchObject({ details: { code: 'EXPORT_DESTINATION_UNWRITABLE', path: '/missing' } });
  });
});

import { describe, expect, it } from 'vitest';
import { BUILTIN_DRIVER_IDS, cleanExecutablePath, isBuiltinDriverId, isDriverId } from './domain.ts';
import { methodParamSchemas } from './schemas.ts';
import { WEB_DEFAULT_METHODS, WEB_READ_METHODS } from './web.ts';

describe('DriverId', () => {
  it('内置的十个引擎：常驻主列表的六个，以及经 ACP 接入的四个', () => {
    expect(BUILTIN_DRIVER_IDS).toEqual(['claude', 'codex', 'copilot', 'pi', 'opencode', 'antigravity', 'qwen', 'gemini', 'cursor', 'grok', 'kimi']);
    expect(isBuiltinDriverId('pi')).toBe(true);
    expect(isBuiltinDriverId('my-agent')).toBe(false);
  });

  it('协议参数认内置的与写法合规的自定义 id，写法不对的拒绝（是否注册由 Runtime 判断）', () => {
    const setDefault = methodParamSchemas['agents.setDefault'];
    for (const driverId of BUILTIN_DRIVER_IDS) expect(setDefault.safeParse({ driverId }).success).toBe(true);
    expect(setDefault.safeParse({ driverId: 'my-agent2' }).success).toBe(true);
    for (const driverId of ['', 'OpenCode', '1abc', '-abc', 'a_b', 'a.b', 'a b', 'a'.repeat(64)]) {
      expect(setDefault.safeParse({ driverId }).success, driverId).toBe(false);
      expect(isDriverId(driverId)).toBe(false);
    }
  });

  it('agents.addProvider：自定义 id 不得与内置的重名，命令至少一个元素，环境变量名合规', () => {
    const add = methodParamSchemas['agents.addProvider'];
    const ok = { id: 'gemini-pinned', name: 'Gemini 0.52', command: ['npx', '-y', '@google/gemini-cli@0.52.0', '--acp'] };
    expect(add.safeParse(ok).success).toBe(true);
    expect(add.safeParse({ ...ok, env: { GEMINI_API_KEY: 'x' } }).success).toBe(true);
    expect(add.safeParse({ ...ok, id: 'gemini' }).success).toBe(false);
    expect(add.safeParse({ ...ok, id: 'Bad_Id' }).success).toBe(false);
    expect(add.safeParse({ ...ok, command: [] }).success).toBe(false);
    expect(add.safeParse({ ...ok, command: [''] }).success).toBe(false);
    expect(add.safeParse({ ...ok, name: '  ' }).success).toBe(false);
    expect(add.safeParse({ ...ok, env: { 'BAD-NAME': 'x' } }).success).toBe(false);
    expect(add.safeParse({ ...ok, extra: 1 }).success).toBe(false);
    expect(methodParamSchemas['agents.removeProvider'].safeParse({ id: 'gemini-pinned' }).success).toBe(true);
  });

  it('添加与移除不对浏览器开放：它决定这台电脑上运行什么命令，设置页在浏览器里只说明去桌面应用', () => {
    for (const method of ['agents.addProvider', 'agents.removeProvider']) {
      expect(WEB_DEFAULT_METHODS).not.toContain(method);
      expect(WEB_READ_METHODS).not.toContain(method);
    }
  });
});

describe('cleanExecutablePath', () => {
  it('去掉首尾空白与包住整条路径的一对引号；空的为 null', () => {
    expect(cleanExecutablePath('"C:\\Users\\admin\\AppData\\Roaming\\npm\\codex.cmd"')).toBe('C:\\Users\\admin\\AppData\\Roaming\\npm\\codex.cmd');
    expect(cleanExecutablePath("  '/Users/用户 甲/bin/codex'  ")).toBe('/Users/用户 甲/bin/codex');
    expect(cleanExecutablePath(' /opt/codex ')).toBe('/opt/codex');
    // 只去成对的、包住整条的：路径里面的引号、只有一边的引号原样留着。
    expect(cleanExecutablePath('"/opt/codex')).toBe('"/opt/codex');
    expect(cleanExecutablePath(`"/opt/codex'`)).toBe(`"/opt/codex'`);
    expect(cleanExecutablePath('/opt/it"s/codex')).toBe('/opt/it"s/codex');
    for (const empty of ['', '   ', '""', "' '", null, undefined]) expect(cleanExecutablePath(empty)).toBeNull();
  });
});

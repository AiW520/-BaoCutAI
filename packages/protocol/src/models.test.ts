import { describe, expect, it } from 'vitest';
import { MODEL_CHECK_CODES, modelCheckCode, modelCheckRepair } from './models.ts';
import { methodParamSchemas } from './schemas.ts';

describe('检查没通过的原因', () => {
  it('修复帮不帮得上：文件坏了能，输出不对可能，别的都不能；认不得的代码按不能', () => {
    expect(modelCheckRepair('MODEL_FILES_DAMAGED')).toBe('yes');
    expect(modelCheckRepair('MODEL_OUTPUT_WRONG')).toBe('maybe');
    for (const code of ['APP_FILE_MISSING', 'MODEL_OUT_OF_MEMORY', 'MODEL_WORKER_FAILED', 'SOMETHING_NEW', null, undefined]) {
      expect(modelCheckRepair(code), String(code)).toBe('no');
    }
  });

  it('只认得登记过的代码', () => {
    for (const code of MODEL_CHECK_CODES) expect(modelCheckCode(code)).toBe(code);
    expect(modelCheckCode('MODEL_SELF_TEST_FAILED')).toBeNull();
    expect(modelCheckCode(undefined)).toBeNull();
    expect(modelCheckCode(42)).toBeNull();
  });
});

describe('models.generateImage 的输入图（架构设计 §6.1）', () => {
  const schema = methodParamSchemas['models.generateImage'];
  const ok = (params: unknown) => schema.safeParse(params).success;
  const pathOf = (params: unknown) => {
    const parsed = schema.safeParse(params);
    return parsed.success ? null : parsed.error.issues[0]!.path.join('.');
  };

  it('三种输入：本机路径、Space 条目、视频素材（要带 videoId）；用法与强度可选', () => {
    expect(ok({ prompt: 'x', images: ['/a.png', { entryId: 'ent_1' }] })).toBe(true);
    expect(ok({ prompt: 'x', images: [{ assetId: 'ast_1' }], videoId: 'vid_1', imageMode: 'img2img', strength: 0.4 })).toBe(true);
    expect(pathOf({ prompt: 'x', images: [{ assetId: 'ast_1' }] })).toBe('videoId');
    expect(ok({ prompt: 'x', images: [{ entryId: 'ent_1', extra: 1 }] })).toBe(false);
    expect(ok({ prompt: 'x', images: [] })).toBe(false);
  });

  it('用法要有输入图，强度只给 img2img，强度在 0–1 之间', () => {
    expect(pathOf({ prompt: 'x', imageMode: 'ref' })).toBe('images');
    expect(pathOf({ prompt: 'x', images: ['/a.png'], strength: 0.5 })).toBe('strength');
    expect(pathOf({ prompt: 'x', images: ['/a.png'], imageMode: 'ref', strength: 0.5 })).toBe('strength');
    expect(ok({ prompt: 'x', images: ['/a.png'], imageMode: 'img2img', strength: 1.5 })).toBe(false);
    expect(ok({ prompt: 'x', images: ['/a.png'], imageMode: 'other' })).toBe(false);
  });
});

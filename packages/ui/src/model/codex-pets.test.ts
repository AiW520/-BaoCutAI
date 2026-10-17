import { afterEach, describe, expect, it, vi } from 'vitest';
import { COMMUNITY_PETS, OFFICIAL_PETS, PET_IDLE_MS, setLocale } from '@baocut/protocol';
import { matchCommunityPets, matchOfficialPets, petCellStyle, petCredit, petDisplayName, petIdleFrame, petLayer } from './codex-pets.ts';

// 测试默认跑在 zh-Hans（vitest.config.ts 的 BAOCUT_LOCALE）。
const use = (locale: 'en' | 'zh-Hans') => {
  vi.stubEnv('BAOCUT_LOCALE', locale);
  setLocale(locale);
};
afterEach(() => {
  vi.unstubAllEnvs();
  setLocale('zh-Hans');
});

describe('Codex Pets in the elements panel', () => {
  it('walks the idle row with the sheet’s own frame delays and loops', () => {
    // 280 / 110 / 110 / 140 / 140 / 320 ms.
    expect([0, 279, 280, 389, 390, 500, 640, 780, 1099].map(petIdleFrame)).toEqual([0, 0, 1, 1, 2, 3, 4, 5, 5]);
    expect(petIdleFrame(PET_IDLE_MS)).toBe(0);
    expect(petIdleFrame(PET_IDLE_MS + 280)).toBe(1);
    expect(petIdleFrame(-5)).toBe(0);
  });

  it('crops one cell of row 0 out of a v1 or v2 sheet', () => {
    expect(petCellStyle('u', 1, 0)).toMatchObject({ backgroundSize: '800% 900%', backgroundPosition: '0% 0%' });
    expect(petCellStyle('u', 2, 7)).toMatchObject({ backgroundSize: '800% 1100%', backgroundPosition: '100% 0%' });
    expect(petCellStyle('u', 2, 3).backgroundPosition).toBe('42.8571% 0%');
  });

  it('searches official pets by name and community pets by category, name, author and slug', () => {
    expect(matchOfficialPets('')).toHaveLength(OFFICIAL_PETS.length);
    expect(matchOfficialPets(OFFICIAL_PETS[0]!.name.toUpperCase())[0]?.id).toBe(OFFICIAL_PETS[0]!.id);
    expect(matchCommunityPets('all', '')).toHaveLength(COMMUNITY_PETS.length);
    const pet = COMMUNITY_PETS.find((p) => p.zh && p.zh !== p.name)!;
    const inCategory = matchCommunityPets(pet.category, '');
    expect(inCategory.every((p) => p.category === pet.category)).toBe(true);
    expect(matchCommunityPets(pet.category, pet.zh).map((p) => p.slug)).toContain(pet.slug);
    expect(matchCommunityPets('all', pet.author).map((p) => p.slug)).toContain(pet.slug);
    expect(matchCommunityPets('all', 'no-such-pet-anywhere')).toEqual([]);
  });

  it('names community pets in Chinese only in a Chinese UI and credits author and license', () => {
    const pet = COMMUNITY_PETS.find((p) => p.zh && p.zh !== p.name && p.license)!;
    use('en');
    expect(petDisplayName(pet)).toBe(pet.name);
    use('zh-Hans');
    expect(petDisplayName(pet)).toBe(pet.zh);
    expect(petCredit(pet)).toBe(`${pet.author} · ${pet.license}`);
    expect(petCredit({ ...pet, license: '' })).toBe(pet.author);
  });

  it('adds a looping sticker layer drawing the copied APNG', () => {
    const layer = petLayer('Codex', { assetImportRef: 'applied' });
    expect(layer).toMatchObject({ type: 'sticker', name: 'Codex', assetImportRef: 'applied', sticker: { source: 'asset', loop: 'loop' } });
  });
});

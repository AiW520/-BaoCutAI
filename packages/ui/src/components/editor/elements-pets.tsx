import { useEffect, useRef, useState } from 'react';
import { COMMUNITY_PETS, OFFICIAL_PETS, PET_CATEGORIES, type CommunityPet, type OfficialPet, type PetHandleParams } from '@baocut/protocol';
import { ToggleButton, Tooltip, TooltipTrigger } from '@react-spectrum/s2';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { Button as RACButton } from 'react-aria-components';
import {
  matchCommunityPets,
  matchOfficialPets,
  petCategoryLabel,
  petCellStyle,
  petCredit,
  petDisplayName,
  petIdleFrame,
  petNonCommercial,
} from '../../model/codex-pets.ts';
import { PET_COPY as PT } from '../../model/pet-copy.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { openPetHandle } from '../../runtime/pet-commands.ts';
import { useCodexPet } from './use-codex-pet.ts';
import { ELEMENTS_COPY as EL } from './elements-copy.ts';

/**
 * 动态贴纸 › Codex Pets（设计稿 `pet-sticker.jsx` 的 `PetSection`）：官方 9 只与社区 239 只（11 个分类）。官方格子从图集
 * 裁第 0 格、悬停按待机的帧时长播；社区格子是上游的静态缩略图、悬停换成待机动图，作者与许可写在格下（仅限非商用的标橙）。
 * 点一格就贴进视频（`useCodexPet`）。图集与缩略图都经 Runtime 取（`pets.openHandle`），第一次要下载。
 */

/** 动态贴纸的网格（设计稿 .stgrid--anim）：三列。 */
const grid = style({ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '[6px]' });
const stack = style({ display: 'flex', flexDirection: 'column', gap: '[6px]' });
const subRow = style({ display: 'flex', flexWrap: 'wrap', gap: 4, paddingBottom: 8 });
const cell = style({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 });
/** 一格（设计稿 .stile--pet）：方格、灰底、四周 4px，悬停加深，按下微缩。 */
const tile = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: 'full',
  aspectRatio: 'square',
  padding: 4,
  borderWidth: 0,
  borderRadius: 'lg',
  overflow: 'hidden',
  backgroundColor: { default: 'gray-100', isHovered: 'gray-200' },
  cursor: { default: 'pointer', isDisabled: 'default' },
  opacity: { default: 1, isDisabled: 0.5 },
  outlineStyle: { default: 'none', isFocusVisible: 'solid' },
  outlineColor: 'focus-ring',
  outlineWidth: 2,
  transform: { default: 'none', isPressed: 'scale(0.96)' },
  transition: 'default',
});
/** 图集裁出来的那一格（设计稿 .petbox）：按 192:208 撑满格子的高。 */
const sprite = style({ display: 'block', height: 'full', aspectRatio: '[192 / 208]' });
const frame = style({ display: 'block', width: 'full', height: 'full' });
const image = style({ display: 'block', width: 'full', height: 'full', objectFit: 'contain' });
const caption = style({ display: 'flex', flexDirection: 'column', minWidth: 0, paddingX: 2 });
const captionName = style({
  font: 'ui-xs',
  fontWeight: 'bold',
  color: 'gray-800',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
const captionNote = style({
  font: 'ui-xs',
  color: { default: 'gray-600', isNonCommercial: 'orange-900' },
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
const emptyBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  paddingY: 16,
  paddingX: 8,
  textAlign: 'center',
});
const emptyTitle = style({ font: 'ui-sm', fontWeight: 'bold', color: 'gray-900' });
const emptyText = style({ font: 'ui-xs', color: 'gray-600' });
const signpost = style({ marginTop: 8, font: 'ui-xs', color: 'gray-600' });
const hint = style({
  marginTop: 16,
  paddingX: 12,
  paddingY: 8,
  borderRadius: 'lg',
  backgroundColor: 'gray-50',
  font: 'ui-xs',
  color: 'gray-600',
});

/** Runtime 发的读取地址；取不到时是 null（格子留空）。 */
function usePetUrl(params: PetHandleParams | null): string | null {
  const runtime = useRuntime();
  const key = params ? JSON.stringify(params) : null;
  const [state, setState] = useState<{ key: string; url: string | null } | null>(null);
  useEffect(() => {
    if (!params || !key) return;
    let live = true;
    openPetHandle(runtime, params).then(
      (handle) => live && setState({ key, url: handle.url }),
      () => live && setState({ key, url: null }),
    );
    return () => {
      live = false;
    };
    // params 由 key 代表。
  }, [runtime, key]);
  return state && state.key === key ? state.url : null;
}

/** 悬停时按待机的帧时长从第 0 格往后走；不播时停在第 0 格。 */
function useIdleFrame(playing: boolean): number {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!playing) {
      setFrame(0);
      return;
    }
    const start = performance.now();
    let raf = requestAnimationFrame(function step(now) {
      setFrame(petIdleFrame(now - start));
      raf = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [playing]);
  return frame;
}

function OfficialSprite({ pet, playing }: { pet: OfficialPet; playing: boolean }) {
  const url = usePetUrl({ pet: { source: 'official', id: pet.id }, file: 'sheet' });
  const frame = useIdleFrame(playing && !!url);
  return url ? <i className={sprite} aria-hidden="true" style={petCellStyle(url, pet.version, frame)} /> : null;
}

/** 格子滚到可见范围附近过一次就算（之后不再撤回）：社区 239 只的缩略图要从上游下载，不一打开就全取。 */
function useSeen<E extends Element>(): [React.RefObject<E | null>, boolean] {
  const ref = useRef<E>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (seen || !node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.some((entry) => entry.isIntersecting) && setSeen(true), {
      rootMargin: '200px',
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [seen]);
  return [ref, seen];
}

function CommunityImage({ pet, playing }: { pet: CommunityPet; playing: boolean }) {
  const ref = { source: 'community' as const, slug: pet.slug };
  const [box, seen] = useSeen<HTMLSpanElement>();
  const thumbnail = usePetUrl(seen ? { pet: ref, file: 'thumbnail' } : null);
  // 悬停过一次才取动图，之后一直留着地址，不来回请求。
  const [wanted, setWanted] = useState(false);
  useEffect(() => {
    if (playing) setWanted(true);
  }, [playing]);
  const preview = usePetUrl(wanted ? { pet: ref, file: 'preview' } : null);
  const url = playing && preview ? preview : thumbnail;
  return (
    <span ref={box} className={frame}>
      {url ? <img className={image} src={url} alt="" draggable={false} /> : null}
    </span>
  );
}

function PetTile({
  name,
  note,
  nonCommercial = false,
  editable,
  onAdd,
  children,
}: {
  name: string;
  note: string;
  nonCommercial?: boolean;
  editable: boolean;
  onAdd(): void;
  children(playing: boolean): React.ReactNode;
}) {
  const tip = note ? `${name} · ${note}` : name;
  return (
    <div className={cell}>
      <TooltipTrigger delay={600}>
        <RACButton className={tile} aria-label={EL.addNamed(tip)} isDisabled={!editable} onPress={onAdd}>
          {({ isHovered, isFocusVisible }) => children(isHovered || isFocusVisible)}
        </RACButton>
        <Tooltip>{tip}</Tooltip>
      </TooltipTrigger>
      <span className={caption}>
        <span className={captionName}>{name}</span>
        {note ? <span className={captionNote({ isNonCommercial: nonCommercial })}>{note}</span> : null}
      </span>
    </div>
  );
}

/** 官方 pet 的网格（目录页那一段也用它，只摆前几只）。 */
export function OfficialPetGrid({ pets, editable }: { pets: readonly OfficialPet[]; editable: boolean }) {
  const add = useCodexPet();
  return (
    <div className={grid}>
      {pets.map((pet) => (
        <PetTile
          key={pet.id}
          name={pet.name}
          note={PT.version(pet.version)}
          editable={editable}
          onAdd={() => void add({ source: 'official', id: pet.id }, pet.name)}
        >
          {(playing) => <OfficialSprite pet={pet} playing={playing} />}
        </PetTile>
      ))}
    </div>
  );
}

function Chips<K extends string>({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: readonly { key: K; label: string }[];
  value: K;
  onChange(key: K): void;
}) {
  return (
    <div className={subRow} role="group" aria-label={label}>
      {items.map((item) => (
        <ToggleButton key={item.key} size="XS" isSelected={item.key === value} onChange={() => onChange(item.key)}>
          {item.label}
        </ToggleButton>
      ))}
    </div>
  );
}

function NoMatch() {
  return (
    <div className={emptyBox}>
      <span className={emptyTitle}>{PT.noMatch}</span>
      <span className={emptyText}>{PT.noMatchHint}</span>
    </div>
  );
}

function CommunityPetGrid({ pets, editable }: { pets: readonly CommunityPet[]; editable: boolean }) {
  const add = useCodexPet();
  return (
    <div className={grid}>
      {pets.map((pet) => {
        const name = petDisplayName(pet);
        return (
          <PetTile
            key={pet.slug}
            name={name}
            note={petCredit(pet)}
            nonCommercial={petNonCommercial(pet)}
            editable={editable}
            onAdd={() => void add({ source: 'community', slug: pet.slug }, name)}
          >
            {(playing) => <CommunityImage pet={pet} playing={playing} />}
          </PetTile>
        );
      })}
    </div>
  );
}

function CommunityPets({ query, editable }: { query: string; editable: boolean }) {
  const [category, setCategory] = useState('all');
  const pets = matchCommunityPets(category, query);
  const categories = [
    { key: 'all', label: PT.chip(EL.all, COMMUNITY_PETS.length) },
    ...PET_CATEGORIES.map((c) => ({
      key: c.slug,
      label: PT.chip(petCategoryLabel(c.slug), COMMUNITY_PETS.filter((pet) => pet.category === c.slug).length),
    })),
  ];
  return (
    <>
      <Chips label={PT.categoryChips} items={categories} value={category} onChange={setCategory} />
      {pets.length ? <CommunityPetGrid pets={pets} editable={editable} /> : <NoMatch />}
      <div className={signpost}>{PT.communityNote}</div>
    </>
  );
}

/** 「全部」里那一段（设计稿 `PetPeek`）摆几只：不搜索时是官方的前 6 只。 */
export const PET_PEEK = 6;

/** 动态贴纸「全部」里的 Codex Pets 一段有多少只命中：不搜索时只摆官方的前几只，搜索时官方与社区命中的都摆。 */
export function petPeek(query: string): { official: OfficialPet[]; community: CommunityPet[] } {
  const q = query.trim();
  const official = matchOfficialPets(q);
  return q ? { official, community: matchCommunityPets('all', q) } : { official: official.slice(0, PET_PEEK), community: [] };
}

/** 「全部」里那一段的格子（组头由面板摆）。 */
export function PetPeekGrid({ query, editable }: { query: string; editable: boolean }) {
  const { official, community } = petPeek(query);
  return (
    <div className={stack}>
      {official.length ? <OfficialPetGrid pets={official} editable={editable} /> : null}
      {community.length ? <CommunityPetGrid pets={community} editable={editable} /> : null}
    </div>
  );
}

type Source = 'official' | 'community';

/** Codex Pets 子页：官方 / 社区两段，切换在页里（组头由面板摆）。 */
export function PetSection({ query, editable }: { query: string; editable: boolean }) {
  const [source, setSource] = useState<Source>('official');
  const official = matchOfficialPets(query);
  const sources = [
    { key: 'official' as const, label: PT.chip(PT.official, OFFICIAL_PETS.length) },
    { key: 'community' as const, label: PT.chip(PT.community, COMMUNITY_PETS.length) },
  ];
  return (
    <>
      <Chips<Source> label={PT.sources} items={sources} value={source} onChange={setSource} />
      {source === 'official' ? official.length ? <OfficialPetGrid pets={official} editable={editable} /> : <NoMatch /> : null}
      {source === 'community' ? <CommunityPets query={query} editable={editable} /> : null}
      <div className={hint}>{PT.hint}</div>
    </>
  );
}

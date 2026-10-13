import { useMemo, useState, type DragEvent } from 'react';
import type { AssetRecord, Id, SpaceEntry } from '@baocut/protocol';
import {
  ActionButton,
  Button,
  Header,
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
  SegmentedControl,
  SegmentedControlItem,
  Slider,
  Text,
  ToastQueue,
} from '@react-spectrum/s2';
import Add from '@react-spectrum/s2/icons/Add';
import Close from '@react-spectrum/s2/icons/Close';
import ImageIcon from '@react-spectrum/s2/icons/Image';
import Upload from '@react-spectrum/s2/icons/Upload';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { M as IMG } from '../../model/tools-image-copy.ts';
import {
  addRefs,
  imageRefMode,
  imageRefModes,
  refKey,
  refRoom,
  refsCount,
  refsNote,
  strengthFor,
  type ImageDraft,
  type ImageOption,
  type ImageRef,
} from '../../model/tools-image.ts';
import { useRuntime } from '../../runtime/context.tsx';
import { useSpace } from '../../state/space-store.ts';
import { useAssetUrl } from '../editor/use-asset-url.ts';
import { useEntryThumbnail } from '../use-entry-thumbnail.ts';
import { IMAGE_COPY } from './tools-copy.ts';

/*
 * 参考图一行与它的用法（设计稿 image-gen.jsx `RefsRow`、`RefModeRow`）：工具页从 Space 的图片里选，编辑器从这个视频的图片素材里选；
 * 桌面端都还能从文件选、把图片拖进来（浏览器里拿不到本机路径，那一项置灰写原因）。认不认、上限几张、能不能以图为底重画看能力描述。
 */

const ACCEPTED = new Set(['image/png', 'image/jpeg', 'image/webp']);
/** 菜单里最多列几张（最近的在前）。 */
const MENU_LIMIT = 40;

const row = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  minWidth: 0,
  borderRadius: 'default',
  outlineStyle: { default: 'none', isOver: 'dashed' },
  outlineWidth: 2,
  outlineColor: 'blue-800',
  outlineOffset: 4,
});
const head = style({ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 });
const headLabel = style({ font: 'detail', fontWeight: 'bold', color: 'gray-700' });
const counter = style({ font: 'ui-xs', color: { default: 'gray-600', isOver: 'red-900' } });
const chips = style({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, minWidth: 0 });
const chip = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  maxWidth: 220,
  minWidth: 0,
  paddingStart: 4,
  paddingEnd: 0,
  paddingY: 2,
  borderRadius: 'default',
  borderWidth: 1,
  borderStyle: { default: 'solid', isInvalid: 'dashed' },
  borderColor: { default: 'gray-300', isInvalid: 'red-800' },
  backgroundColor: 'gray-50',
});
const chipThumb = style({
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  width: 28,
  height: 28,
  overflow: 'hidden',
  borderRadius: 'sm',
  backgroundColor: 'gray-200',
  color: 'gray-600',
});
const chipImg = style({ display: 'block', width: 'full', height: 'full', objectFit: 'cover' });
const chipName = style({ font: 'ui-xs', color: 'gray-900', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 });
const note = style({ flexGrow: 1, minWidth: 0, font: 'ui-xs', color: 'gray-600', lineHeight: '[1.5]', overflowWrap: 'anywhere' });
const modeRow = style({ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 });
const strengthField = style({ width: 'full', maxWidth: 320 });

/** 参考图从哪儿挑：工具页是 Space，编辑器是这个视频的图片素材。 */
export type RefSource = { kind: 'space' } | { kind: 'video'; videoId: Id; assets: Record<Id, AssetRecord> };

interface RefsProps {
  draft: ImageDraft;
  option: ImageOption;
  patch: (patch: Partial<ImageDraft>) => void;
  source: RefSource;
}

/** 能挑的 Space 图片：没进废纸篓、不是缺失或生成中的。 */
function spaceImages(entries: readonly SpaceEntry[]): SpaceEntry[] {
  return entries.filter((e) => e.kind === 'image' && !e.user.trashedAt && e.status !== 'missing' && e.status !== 'generating' && e.status !== 'failed');
}

/** 能挑的素材：当前版本是 PNG、JPEG、WebP 的图片。 */
function videoImages(assets: Record<Id, AssetRecord>): AssetRecord[] {
  return Object.values(assets).filter((a) => a.kind === 'image' && ACCEPTED.has(a.revisions[a.currentRevision]?.mediaType ?? ''));
}

/** 参考图一行：已选的几张（超出上限、找不到的标出来）、加图的菜单、拖进来，和一句说明。 */
export function ImageRefsRow({ draft, option, patch, source }: RefsProps) {
  const runtime = useRuntime();
  const entries = useSpace((s) => s.entries);
  const [over, setOver] = useState(false);
  const info = option.info;
  const supported = !!info.referenceImages;
  const room = refRoom(draft, info);
  const canPick = !!runtime.host.pickFiles;
  const count = refsCount(draft, info);
  const chosen = new Set(draft.refs.map(refKey));

  const pool = useMemo(() => {
    if (source.kind === 'space') return spaceImages(entries).map((e) => ({ ref: { entryId: e.id, name: e.name } as ImageRef, sub: null }));
    return videoImages(source.assets).map((a) => ({ ref: { assetId: a.id, name: a.name } as ImageRef, sub: null }));
  }, [source, entries]);
  const offered = pool.filter((p) => !chosen.has(refKey(p.ref))).slice(0, MENU_LIMIT);

  const missing = (ref: ImageRef): boolean => {
    if ('entryId' in ref) return !spaceImages(entries).some((e) => e.id === ref.entryId);
    if ('assetId' in ref) return source.kind !== 'video' || !source.assets[ref.assetId];
    return false;
  };

  const add = (more: ImageRef[]) => {
    const { refs, dropped } = addRefs(draft.refs, more, room);
    if (refs.length !== draft.refs.length) patch({ refs });
    if (dropped > 0 && info.referenceImages) ToastQueue.neutral(IMG.refsNotAdded(info.referenceImages.max, dropped), { timeout: 4000 });
  };

  const pickFiles = async () => {
    const pick = runtime.host.pickFiles;
    if (!pick) return;
    const paths = await pick({
      title: IMAGE_COPY.pickRefs,
      buttonLabel: IMAGE_COPY.pickRefs,
      filters: [{ name: IMAGE_COPY.refs, extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
      multiple: true,
    });
    if (paths?.length) add(paths.map((path) => ({ path, name: path.split(/[\\/]/).pop() || path })));
  };

  const acceptsDrop = supported && room > 0 && canPick;
  const onDragOver = (event: DragEvent) => {
    if (!acceptsDrop || !event.dataTransfer.types.includes('Files')) return;
    event.preventDefault();
    setOver(true);
  };
  const onDrop = (event: DragEvent) => {
    if (!acceptsDrop) return;
    event.preventDefault();
    setOver(false);
    const files = [...event.dataTransfer.files];
    const images = files.filter((f) => ACCEPTED.has(f.type));
    if (files.length > images.length) ToastQueue.neutral(IMG.refsSkipped(files.length - images.length), { timeout: 4000 });
    const refs = images.flatMap((f) => {
      const path = runtime.host.pathForFile(f);
      return path ? [{ path, name: f.name }] : [];
    });
    if (refs.length) add(refs);
  };

  const onAction = (key: string) => {
    if (key === 'file') void pickFiles();
    else {
      const hit = offered.find((p) => refKey(p.ref) === key);
      if (hit) add([hit.ref]);
    }
  };

  const max = info.referenceImages?.max ?? 0;
  const text = [refsNote(draft, option), acceptsDrop ? IMG.refsDrop : null].filter(Boolean).join(' · ');

  return (
    <div
      className={row({ isOver: over })}
      onDragOver={onDragOver}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}>
      <div className={head}>
        <span className={headLabel}>{IMAGE_COPY.refs}</span>
        {count ? <span className={counter({ isOver: count.over })}>{count.text}</span> : null}
      </div>
      {draft.refs.length ? (
        <div className={chips} role="list" aria-label={IMAGE_COPY.refs}>
          {draft.refs.map((ref, i) => (
            <RefChip
              key={refKey(ref)}
              refItem={ref}
              source={source}
              invalid={!supported || i >= max || missing(ref)}
              missing={missing(ref)}
              onRemove={() => patch({ refs: draft.refs.filter((r) => refKey(r) !== refKey(ref)) })}
            />
          ))}
        </div>
      ) : null}
      <div className={head}>
        {supported ? (
          <MenuTrigger align="start">
            <Button variant="secondary" size="S" isDisabled={room === 0}>
              <Add />
              <Text>{draft.refs.length ? IMG.refsAddMore : IMAGE_COPY.pickRefs}</Text>
            </Button>
            <Menu aria-label={IMAGE_COPY.pickRefs} onAction={(key) => onAction(String(key))} disabledKeys={canPick ? ['empty'] : ['file', 'empty']}>
              <MenuSection>
                <MenuItem id="file" textValue={IMG.refsFromFile}>
                  <Upload />
                  <Text slot="label">{IMG.refsFromFile}</Text>
                  <Text slot="description">{canPick ? IMG.refsFromFileNote : IMG.refsWebNote}</Text>
                </MenuItem>
              </MenuSection>
              <MenuSection>
                <Header>{source.kind === 'space' ? IMG.refsFromSpace : IMG.refsFromLibrary}</Header>
                {offered.length ? (
                  offered.map((p) => (
                    <MenuItem key={refKey(p.ref)} id={refKey(p.ref)} textValue={p.ref.name}>
                      <ImageIcon />
                      <Text slot="label">{p.ref.name}</Text>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem id="empty" textValue={source.kind === 'space' ? IMG.refsNoSpaceImages : IMG.refsNoLibraryImages}>
                    <Text slot="label">{source.kind === 'space' ? IMG.refsNoSpaceImages : IMG.refsNoLibraryImages}</Text>
                  </MenuItem>
                )}
              </MenuSection>
            </Menu>
          </MenuTrigger>
        ) : (
          <Button variant="secondary" size="S" isDisabled>
            <Add />
            <Text>{IMAGE_COPY.pickRefs}</Text>
          </Button>
        )}
        {!supported && draft.refs.length ? (
          <ActionButton isQuiet size="S" onPress={() => patch({ refs: [] })}>
            <Text>{IMG.refsClear}</Text>
          </ActionButton>
        ) : null}
      </div>
      <span className={note}>{text}</span>
    </div>
  );
}

/** 一张已选的参考图：缩略（Space 条目与素材有，本机文件只有图标）、名字、去掉。 */
function RefChip({
  refItem,
  source,
  invalid,
  missing,
  onRemove,
}: {
  refItem: ImageRef;
  source: RefSource;
  invalid: boolean;
  missing: boolean;
  onRemove: () => void;
}) {
  const title = missing ? IMG.refsMissing(refItem.name) : 'path' in refItem ? refItem.path : refItem.name;
  return (
    <div className={chip({ isInvalid: invalid })} role="listitem" title={title}>
      <span className={chipThumb} aria-hidden>
        {'entryId' in refItem ? (
          <EntryThumb entryId={refItem.entryId} />
        ) : 'assetId' in refItem && source.kind === 'video' && source.assets[refItem.assetId] ? (
          <AssetThumb videoId={source.videoId} asset={source.assets[refItem.assetId]!} />
        ) : (
          <ImageIcon />
        )}
      </span>
      <span className={chipName}>{refItem.name}</span>
      <ActionButton isQuiet size="XS" aria-label={IMG.refsRemove(refItem.name)} onPress={onRemove}>
        <Close />
      </ActionButton>
    </div>
  );
}

function EntryThumb({ entryId }: { entryId: Id }) {
  const entry = useSpace((s) => s.entries.find((e) => e.id === entryId) ?? null);
  const thumbnail = useEntryThumbnail(entry);
  return thumbnail?.kind === 'image' ? <img className={chipImg} src={thumbnail.url} alt="" /> : <ImageIcon />;
}

function AssetThumb({ videoId, asset }: { videoId: Id; asset: AssetRecord }) {
  const { url } = useAssetUrl(videoId, { id: asset.id, revision: asset.currentRevision });
  return url ? <img className={chipImg} src={url} alt="" /> : <ImageIcon />;
}

/**
 * 参考图的用法与改动幅度（设计稿 `RefModeRow`）：模型能以图为底重画时才出这一行；改动幅度只在以图为底重画时出现。
 * 出几张由底图数决定，那时表单不给「数量」。
 */
export function ImageRefModeRow({ draft, option, patch }: Omit<RefsProps, 'source'>) {
  const info = option.info;
  const modes = imageRefModes(info);
  if (modes.length < 2 || !info.img2img) return null;
  const mode = imageRefMode(draft, info);
  const range = info.img2img.strength;
  return (
    <div className={modeRow}>
      <SegmentedControl aria-label={IMG.refModeLabel} selectedKey={mode} onSelectionChange={(key) => patch({ refMode: key === 'img2img' ? 'img2img' : 'ref' })}>
        {modes.map((m) => (
          <SegmentedControlItem key={m.key} id={m.key}>
            {m.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      {mode === 'img2img' ? (
        <>
          <Slider
            label={IMG.strength}
            labelPosition="side"
            size="S"
            styles={strengthField}
            minValue={range.min}
            maxValue={range.max}
            step={range.step}
            formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
            value={strengthFor(draft, info) ?? range.default}
            onChange={(strength) => patch({ strength })}
          />
          <span className={note}>{IMG.strengthNote}</span>
        </>
      ) : null}
    </div>
  );
}

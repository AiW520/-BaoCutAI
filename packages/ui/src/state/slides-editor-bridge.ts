import { create } from 'zustand';

/**
 * 幻灯片标签之外的地方对打开着的编辑器的两个要求（docs/design/slides §8.2），按 deck 的 `targetKey` 找到它：
 *
 * - **发送前保存**：编辑器里改了字还没发布完时，先让它发布完再发消息，智能体读到的是用户看到的版本。
 *   标签页在编辑器载入后登记，卸下时注销；没打开这份 deck 的不用等。
 * - **跳到标注所在的页**：已发送消息里的「幻灯片标注」点一条，先打开（或切到）这份 deck 的标签，
 *   标签页在编辑器载入后取走这个要求再跳。
 */

/** 一个打开着的编辑器：`flush` 让它发布完，返回保存成了没有；`name` 是这份幻灯片当前的名字，没保存成时提示里写出来。 */
interface Flusher {
  flush(): Promise<boolean>;
  name(): string;
}
const flushers = new Map<string, Set<Flusher>>();

/** 标签页登记它的编辑器；返回注销函数。 */
export function registerSlidesFlush(deckKey: string, flusher: Flusher): () => void {
  let set = flushers.get(deckKey);
  if (!set) flushers.set(deckKey, (set = new Set()));
  set.add(flusher);
  return () => {
    set.delete(flusher);
    if (!set.size) flushers.delete(deckKey);
  };
}

/**
 * 让这几份 deck 打开着的编辑器都把改动发布完；返回没保存成的那几份的名字（同名的只算一次），都保存好了时为空。
 * 不拦发送，由调用方决定。
 */
export async function flushSlides(deckKeys: Iterable<string>): Promise<string[]> {
  const pending = [...new Set(deckKeys)].flatMap((key) =>
    [...(flushers.get(key) ?? [])].map(async (flusher) => ((await flusher.flush().catch(() => false)) ? null : flusher.name())),
  );
  const failed = (await Promise.all(pending)).filter((name): name is string => name !== null);
  return [...new Set(failed)];
}

/** 等着跳过去的一处：`id` 是编辑器里这条标注的 id，`anchor` 是它的锚点。`seq` 让同一处再点一次也算新的要求。 */
export interface SlidesReveal {
  id: string;
  anchor: string;
  seq: number;
}

interface SlidesRevealStore {
  reveals: Record<string, SlidesReveal>;
  request(deckKey: string, id: string, anchor: string): void;
  /** 标签页取走（取走后清掉）。 */
  take(deckKey: string, seq: number): void;
}

let seq = 0;

export const useSlidesReveal = create<SlidesRevealStore>()((set) => ({
  reveals: {},
  request: (deckKey, id, anchor) => set((s) => ({ reveals: { ...s.reveals, [deckKey]: { id, anchor, seq: ++seq } } })),
  take: (deckKey, taken) =>
    set((s) => {
      if (s.reveals[deckKey]?.seq !== taken) return {};
      const { [deckKey]: _done, ...reveals } = s.reveals;
      return { reveals };
    }),
}));

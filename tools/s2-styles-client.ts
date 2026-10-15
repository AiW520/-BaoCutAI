// 开发时 S2 样式的合并去重（由 `s2-styles.ts` 的开发插件引入，生产构建不用）：
// 每份 CSS（style 宏的一处调用、S2 的一个组件）按第一次用到的先后登记进来，按 `s2-styles-merge.ts` 合成一个 <style>，
// 相同的规则只留最后一次、层的先后不变——与 Vite 给每份各插一个 <style> 的层叠结果相同。拆不准的那份照旧单独插一个 <style>。
// 登记以模块为单位：开发插件把一个模块末尾的样式导入内联成一次 `addStyles`，一份 CSS 在没有模块再用到时才注销。

import { type LayeredCss, mergeLayeredCss, parseLayeredCss } from './s2-styles-merge.ts';

/** 已登记的 CSS，Map 的先后就是登记的先后。 */
const sheets = new Map<string, LayeredCss>();
/** 拆不准、单独插的 <style>。 */
const loose = new Map<string, HTMLStyleElement>();
/** 每份已登记 CSS 的原文，内容变了（文件改了）才重新登记。 */
const texts = new Map<string, string>();
/** 每个模块用到的 CSS。 */
const owners = new Map<string, Set<string>>();
/** 每份 CSS 有几个模块用到。 */
const users = new Map<string, number>();
let element: HTMLStyleElement | null = null;
let scheduled = false;

/**
 * 登记一个模块用到的全部 CSS（`[id, css]` 按导入的先后）；同一模块再次登记（热更新后重新执行）时换掉它上次的那组，传空表示不再用到。
 * 已经登记的 CSS 留在原位，与 ES 模块只执行一次、先执行的样式表在前一致；第一次用到的排到最后；没有模块再用到的注销。
 */
export function addStyles(owner: string, entries: readonly (readonly [id: string, css: string])[]): void {
  const before = owners.get(owner);
  const after = new Set<string>();
  for (const [id, css] of entries) {
    if (after.has(id)) continue;
    after.add(id);
    if (texts.has(id) && texts.get(id) !== css) {
      // 同一份 CSS 的内容变了：挪到最后，与文件改了之后新插的样式表一致。
      remove(id);
      insert(id, css);
    }
    if (before?.has(id)) continue;
    const count = users.get(id) ?? 0;
    users.set(id, count + 1);
    if (count === 0 && !texts.has(id)) insert(id, css);
  }
  for (const id of before ?? []) {
    if (after.has(id)) continue;
    const count = (users.get(id) ?? 1) - 1;
    if (count > 0) {
      users.set(id, count);
    } else {
      users.delete(id);
      remove(id);
    }
  }
  if (after.size > 0) owners.set(owner, after);
  else owners.delete(owner);
}

function insert(id: string, css: string): void {
  texts.set(id, css);
  const parsed = parseLayeredCss(css);
  if (parsed) {
    sheets.set(id, parsed);
    schedule();
    return;
  }
  const style = document.createElement('style');
  style.setAttribute('data-vite-dev-id', id);
  style.textContent = css;
  document.head.appendChild(style);
  loose.set(id, style);
}

function remove(id: string): void {
  texts.delete(id);
  loose.get(id)?.remove();
  loose.delete(id);
  if (sheets.delete(id)) schedule();
}

/** 同一轮里的登记与注销合在一起，在微任务里重写一次样式表。 */
function schedule(): void {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    if (!element) {
      element = document.createElement('style');
      element.setAttribute('data-vite-dev-id', 'baocut:s2-styles');
      document.head.appendChild(element);
    }
    element.textContent = mergeLayeredCss(sheets.values());
  });
}

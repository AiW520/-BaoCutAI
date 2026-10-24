import { defineMessages, intlLocale } from '@baocut/protocol';
import { zhHans } from './docs-copy.zh-Hans.ts';
import { zhHant } from './docs-copy.zh-Hant.ts';
import { ja } from './docs-copy.ja.ts';
import { ko } from './docs-copy.ko.ts';
import { es } from './docs-copy.es.ts';
import { fr } from './docs-copy.fr.ts';
import { de } from './docs-copy.de.ts';
import { nl } from './docs-copy.nl.ts';
import { ptBR } from './docs-copy.pt-BR.ts';
import { it } from './docs-copy.it.ts';
import { ru } from './docs-copy.ru.ts';
import { pl } from './docs-copy.pl.ts';
import { tr } from './docs-copy.tr.ts';
import { vi } from './docs-copy.vi.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat(intlLocale('en'), { type: 'conjunction' }).format(labels);

/**
 * 协作文档的界面文案（docs/design/docs）：功能区的文档标签、线程里的文档卡片、composer 上方的文档标注、文件标签与 Space 里的打开入口。
 * 英文叫 doc（种类名 Docs），中文叫「协作文档」，与 Space 里普通的文档文件（Document /「文档」）分开；助手叫智能体（agent）。
 * 键名与幻灯片的 `SLIDES`、设计稿的 `DESIGN` 对齐（编辑器标签 `EditorPane` 与标注标签 `AnnotationsToken` 共用一套）。
 * 文档标注不经批注框：编辑器里点「发给智能体」直接进草稿，所以没有 `annotate`、`noteLabel` 这些。
 */
const en = {
  /** 标签页数：标签头、线程卡片与 Space 的「时长或尺寸」一列。 */
  tabs: (n: number) => (n === 1 ? '1 tab' : `${n} tabs`),
  paneLabel: (name: string) => `Doc “${name}”`,
  /** 编辑器 iframe 的读屏名称。 */
  frameTitle: (name: string) => `Docs editor: ${name}`,
  opening: 'Opening doc…',
  /** 这台机器没有构建编辑器（`docs.open` 的 `editorAvailable` 为 false）。 */
  unavailableTitle: 'Docs editor unavailable',
  unavailableBody: 'This build of OpenFox doesn’t include the docs editor. The doc’s files are still in their folder.',
  openFailed: (reason: string) => `Couldn’t open the doc: ${reason}`,
  /** Space 的条目菜单与查看框里的按钮。 */
  open: 'Open doc',
  openCard: (name: string) => `Open doc “${name}”`,
  /** 文件标签里打开 `doc.json` 时，头部的动作。 */
  openInEditor: 'Open in Docs Editor',

  // 标注（docs/design/docs §8）：编辑器里把评论「发给智能体」，或在空行上写给智能体的请求
  /** 一条标注是哪一种：评论线程（comment）与请求（ask）。 */
  comment: 'Comment',
  ask: 'Request',
  /** composer 上方与已发送消息里的那一行。 */
  token: (n: number) => (n === 1 ? 'Doc annotations · 1' : `Doc annotations · ${n}`),
  added: (token: string) => `Added to chat · ${token}`,
  removeAll: 'Remove all doc annotations',
  removeOne: (n: number) => `Remove annotation ${n}`,
  /** 列表里一条的读屏名称。 */
  item: (n: number, label: string, text: string) => `Annotation ${n}, ${label}: ${text}`,
  empty: 'This comment is empty, so it wasn’t added to the chat',
  tooLong: (max: number) => `An annotation can be at most ${max} characters`,
  tooMany: (max: number) => `A message can carry at most ${max} doc annotations. Send these first.`,
  /** 文档标签所在的位置还没有会话。 */
  noConversation: 'This tab isn’t part of a session yet. Send a message to start one, then send comments to the agent.',
  /** 只带标注、没写话时发给智能体的那句。 */
  message: 'Please handle these doc comments and requests.',
  /** 发送前编辑器里有改动没保存成（产品设计 §3.2.4 写出具体对象）：`names` 是这几份文档的名字。 */
  flushFailed: (names: readonly string[]) =>
    `Changes to ${names.length === 1 ? 'the doc' : 'the docs'} ${list(names.map((n) => `“${n}”`))} haven’t finished saving, so the message wasn’t sent. Try again, or remove the doc annotations first.`,
};
export type DocsMessages = typeof en;
export const DOCS = defineMessages(en, { 'zh-Hans': zhHans, 'zh-Hant': zhHant, ja, ko, es, fr, de, nl, 'pt-BR': ptBR, it, ru, pl, tr, vi });

// i18n-ignore-file: 给模型的工具说明、错误与下一步
import { z } from 'zod';
import type { Id } from '@baocut/protocol';
import type { Harness } from '@baocut/harness';
import { ToolError, type ToolInfo, type ToolSet } from './tool-catalog.ts';
import type { ToolAccess, ToolPrincipal, ToolScope } from './tool-scope.ts';

/**
 * 会话自己的标题（产品设计 §3.1、架构设计 §3.10）：只给会话里的智能体（`surfaces` 只有 `agent`），对外服务与 CLI 没有会话。
 *
 * `conversations_set_title`：用户的第一句话是泛泛的指令、标题认不出是哪部视频时，智能体读懂内容后起一个短标题。规则与链接视频的
 * 平台标题相同（`Harness.retitleIfAuto`）：标题还是按第一句话自动起的才换，只换一次，用户改过的、创建时给了的都不动。只改这个会话
 * 在 BaoCut 里的标题，不碰视频与文件、不外发，所以不确认，规划模式下也能用（与任务合同的工具同理）。
 */

export interface ConversationToolsDeps {
  harness: Pick<Harness, 'retitleIfAuto' | 'conversationOf'>;
  scope: ToolScope;
}

/** 标题的上限与按第一句话起的相同（第一行，最多 40 个字符）：超出时拒绝，让智能体改短，不显示被截断的标题。 */
const TITLE_MAX = 40;

const schemas = {
  conversations_set_title: z.strictObject({
    title: z
      .string()
      .trim()
      .min(1)
      .max(TITLE_MAX)
      .regex(/^[^\r\n]+$/, '标题只能是一行')
      .describe(`标题：一行，最多 ${TITLE_MAX} 个字符，用用户的语言；写视频讲什么、是谁的，不写要做的任务`),
  }),
};

const DEFINITIONS: Record<keyof typeof schemas, ToolInfo> = {
  conversations_set_title: {
    title: '起会话标题',
    description: [
      '给这个会话起一个能认出内容的标题，显示在 BaoCut 的会话列表里。',
      '用户的第一句话是泛泛的指令（如「转录这个视频并翻译成中文」），标题认不出是哪部视频时用：读懂素材的内容（文稿、画面）之后，用用户的语言写一个短标题，点出视频讲什么、是谁的，不加引号或书名号，不写「转录」「翻译」这类任务词。',
      '只在标题还是按用户第一句话自动起的时才换，只换一次：用户改过名、创建时给了标题、已经换成链接视频的平台标题或你之前起过的，都不换（changed 为 false）。从链接下载的视频 BaoCut 会自动换成平台标题，不用起。',
    ].join('\n'),
    annotations: { destructiveHint: false, idempotentHint: true },
    effect: 'mutation',
    examples: [{ title: '按内容起标题', args: { title: '城市骑行通勤的五个误区' } }],
    surfaces: ['agent'],
  },
};

type SetTitleArgs = z.infer<(typeof schemas)['conversations_set_title']>;

export class ConversationTools implements ToolSet {
  readonly schemas = schemas;
  readonly definitions = DEFINITIONS;
  readonly #harness: ConversationToolsDeps['harness'];
  readonly #scope: ToolScope;

  constructor(deps: ConversationToolsDeps) {
    this.#harness = deps.harness;
    this.#scope = deps.scope;
  }

  async dispatch(name: string, args: unknown, principal: ToolPrincipal): Promise<unknown> {
    switch (name) {
      case 'conversations_set_title':
        return this.#setTitle(args as SetTitleArgs, principal);
      default:
        throw new ToolError('UNKNOWN_TOOL', `没有这个工具：${name}`);
    }
  }

  #setTitle(args: SetTitleArgs, principal: ToolPrincipal) {
    const conversationId = this.#conversation(this.#scope.authorize(principal, false));
    const changed = this.#harness.retitleIfAuto(conversationId, args.title);
    const title = this.#harness.conversationOf(conversationId)?.title ?? '';
    return changed
      ? { changed, title, next: '会话标题已经换上，之后不要再调用这个工具。' }
      : {
          changed,
          title,
          next: '标题已经由用户定下，或之前换过（链接视频的平台标题、你起过的），这次没有换：保持原样，不要再调用，也不用告诉用户。',
        };
  }

  #conversation(access: ToolAccess): Id {
    if (access.submitter.kind !== 'agent') throw new ToolError('UNKNOWN_TOOL', '这个工具只给会话里的智能体');
    return access.submitter.id;
  }
}

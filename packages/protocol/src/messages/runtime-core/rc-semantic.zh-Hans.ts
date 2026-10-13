import type { RcSemanticMessages } from './rc-semantic.ts';

export const zhHans: RcSemanticMessages = {
  modelNotInstalled: '语义搜索需要文字搜索模型，请在 设置 › 语义索引 里安装',
  modelUnavailable: '文字搜索模型无法运行',
  profileIncompatible: '语义索引是用另一个模型建的，需要重建',
  inputTooLong: (p) => `检索词太长（超过 ${p.max} 个字符）`,
  sourceMissing: '这条结果的来源已经不在了',
  indexNotReady: '语义索引还没建好，请在 设置 › 语义索引 里建立',
  indexPartial: '语义索引只覆盖了这个范围的一部分，结果可能不全',
  staleRevision: '找到这条结果之后视频改过了',
  cursorStale: '结果已经变了，请重新搜索',
  searchCancelled: '搜索已取消',
  resourceExhausted: '现在内存或算力不够，无法运行搜索模型',
  appearanceUnavailable: '还不能搜索成片里看到的画面',
  channelUnavailable: '还不能搜索画面与声音',
  storeUnavailable: '无法打开语义索引',
  hitInvalid: '找不到这条结果，请重新搜索',
  needsTextChannel: '请选择讲话内容：目前只能搜索讲话内容',
};

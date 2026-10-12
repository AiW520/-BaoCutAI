import type { GeneralSettingsModelMessages } from './general-settings.ts';

export const zhHans: GeneralSettingsModelMessages = {
  lineShort: '短',
  lineMedium: '中',
  lineLong: '长',
  lineLength: (cjk: number, other: number) => `中日韩文字每行 ${cjk} 字 · 其他文字每行 ${other} 个字符`,
  endpointTooLong: (max: number) => `太长了：最多 ${max} 个字符`,
  endpointNotUrl: '不是网址：应以 http:// 或 https:// 开头',
  endpointScheme: '只支持 http:// 或 https:// 开头的网址',
  endpointCredentials: '网址里不能带用户名或密码',
  endpointQuery: '网址里不能带查询参数（? 之后的部分）',
  endpointHash: '网址里不能带片段（# 之后的部分）',
  saveDir: {
    label: '默认保存位置',
    desc: '工具结果、下载的视频与 Agent 交出的文件都保存到这里。默认是系统的下载文件夹。',
    systemDefault: '系统的下载文件夹',
    isDefault: '默认',
    change: '更改…',
    reset: '恢复默认',
    pickTitle: '选择默认保存位置',
    changed: '已更改默认保存位置',
    resetDone: '已恢复为系统的下载文件夹',
    pickFailed: (message: string) => `没能选择文件夹：${message}`,
    webNote: '浏览器里不能选择本机文件夹：请在 BaoCut 桌面应用里设置。',
  },
};

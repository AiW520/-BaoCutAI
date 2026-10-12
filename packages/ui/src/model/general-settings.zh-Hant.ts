import type { GeneralSettingsModelMessages } from './general-settings.ts';

export const zhHant: GeneralSettingsModelMessages = {
  lineShort: '短',
  lineMedium: '中',
  lineLong: '長',
  lineLength: (cjk: number, other: number) => `中日韓文字每行 ${cjk} 字 · 其他文字每行 ${other} 個字元`,
  endpointTooLong: (max: number) => `太長：最多 ${max} 字`,
  endpointNotUrl: '不是網址：應以 http:// 或 https:// 開頭',
  endpointScheme: '只支援以 http:// 或 https:// 開頭的網址',
  endpointCredentials: '網址不能包含使用者名稱或密碼',
  endpointQuery: '網址不能包含查詢參數（? 之後的部分）',
  endpointHash: '網址不能包含片段（# 之後的部分）',
  saveDir: {
    label: '預設儲存位置',
    desc: '工具結果、下載的影片和 Agent 交付的檔案都會儲存在這裡。預設為下載資料夾。',
    systemDefault: '下載資料夾',
    isDefault: '預設',
    change: '更改…',
    reset: '回復預設值',
    pickTitle: '選擇預設儲存位置',
    changed: '已更改預設儲存位置',
    resetDone: '已回復為下載資料夾',
    pickFailed: (message: string) => `無法選擇資料夾：${message}`,
    webNote: '瀏覽器無法選擇這台電腦上的資料夾。請在 BaoCut 桌面應用程式中設定。',
  },
};

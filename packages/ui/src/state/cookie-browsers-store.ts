import { useCallback, useEffect } from 'react';
import { create } from 'zustand';
import { resolveCookieBrowsers, SETTING_DEFAULTS, type CookieBrowserInfo, type LinkCookieBrowser } from '@baocut/protocol';
import { useRuntime } from '../runtime/context.tsx';
import { useSetting } from './settings-store.ts';

/**
 * 本机检测到的浏览器（`externalTools.cookieBrowsers`）与网站登录的设置（`downloads.cookieBrowsers`，设置 › 视频下载）。
 * 设置页、下载视频与从链接转录共用一份：第一次用到时检测，「重新检测浏览器」再检测。下载开始时按这份检测结果把设置展开成
 * 浏览器列表（`resolveCookieBrowsers`），冻结进那一次下载。
 */
interface CookieBrowsersState {
  state: 'idle' | 'checking' | 'done' | 'failed';
  /** Runtime 所在主机的平台：系统授权的提示看它，不看界面跑在哪。 */
  platform: string | null;
  browsers: CookieBrowserInfo[];
  error: string | null;
}

const useCookieBrowsers = create<CookieBrowsersState>()(() => ({ state: 'idle', platform: null, browsers: [], error: null }));

export interface CookieBrowsersView extends CookieBrowsersState {
  /** 设置里存的值（没连上时按默认值）。 */
  setting: 'all' | LinkCookieBrowser[];
  /** 按设置与检测结果展开的浏览器列表（尝试的顺序）；空的是匿名下载。 */
  list: LinkCookieBrowser[];
  /** 检测还没有结果：这时不能按设置展开，下载先等一等。 */
  pending: boolean;
  /** 重新检测；`announce` 为真时检测完提示找到几个。 */
  detect(announce?: (count: number) => void): void;
}

/** 读检测结果与设置；`enabled` 为真且还没检测过时检测一次。 */
export function useCookieBrowserChoice(enabled: boolean): CookieBrowsersView {
  const runtime = useRuntime();
  const state = useCookieBrowsers();
  const setting = useSetting('downloads.cookieBrowsers') ?? SETTING_DEFAULTS['downloads.cookieBrowsers'];
  const detect = useCallback(
    (announce?: (count: number) => void) => {
      useCookieBrowsers.setState({ state: 'checking' });
      runtime.cookieBrowsers().then(
        ({ platform, browsers }) => {
          useCookieBrowsers.setState({ state: 'done', platform, browsers, error: null });
          announce?.(browsers.filter((b) => !b.cookieStoreMissing).length);
        },
        (error: unknown) => useCookieBrowsers.setState({ state: 'failed', browsers: [], error: error instanceof Error ? error.message : String(error) }),
      );
    },
    [runtime],
  );
  useEffect(() => {
    if (enabled && useCookieBrowsers.getState().state === 'idle') detect();
  }, [enabled, detect]);
  return {
    ...state,
    setting,
    list: resolveCookieBrowsers(setting, state.browsers),
    pending: state.state === 'idle' || state.state === 'checking',
    detect,
  };
}

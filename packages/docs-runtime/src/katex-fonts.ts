/** BaoCut: 父页面缓存本地 WOFF2，并以 data: 样式经 loadFonts 传给不允许网络字体的沙箱 iframe。 */
export function createKatexFontLoader(css: string, baseUrl = () => document.baseURI): () => Promise<string> {
  const fonts = new Map<string, Promise<string>>();
  let pending: Promise<string> | undefined;

  function loadFont(source: string): Promise<string> {
    const url = new URL(source, baseUrl()).href;
    let font = fonts.get(url);
    if (!font) {
      font = (async () => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`KaTeX font fetch failed: ${response.status}`);
        const bytes = new Uint8Array(await response.arrayBuffer());
        let binary = '';
        for (let offset = 0; offset < bytes.length; offset += 8192)
          binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
        return `data:font/woff2;base64,${btoa(binary)}`;
      })().catch((error: unknown) => {
        fonts.delete(url);
        throw error;
      });
      fonts.set(url, font);
    }
    return font;
  }

  return () => (pending ??= (async () => {
    // URL 引号由 asset-plugin 统一生成；只处理随包的字体 CSS。
    const sources = [...new Set([...css.matchAll(/url\("([^"]+)"\)/g)].map(match => match[1]!))];
    const urls = new Map(await Promise.all(sources.map(async source => [source, await loadFont(source)] as const)));
    return css.replace(/url\("([^"]+)"\)/g, (_, source: string) => `url("${urls.get(source)}")`);
  })().catch((error: unknown) => {
    pending = undefined;
    throw error;
  }));
}

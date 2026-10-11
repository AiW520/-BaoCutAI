/**
 * 官网页面的浏览器脚本（build.ts 去掉类型后以 defer 加载）。没有它页面照样能读、能下载，这里只做增强：
 * 首屏下载按钮按访客系统直达安装包、导航栏滚动样式与手机菜单、进场动画、模板预览的悬停播放与弹窗播放。
 */

type Os = 'mac' | 'windows';

const DOWNLOADS: Record<Os, string> = { mac: '/download/mac-dmg', windows: '/download/win-setup' };

function detectOs(): Os | null {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android|Mobile/i.test(ua)) return null;
  // iPadOS 的 Safari 也自称 Macintosh，靠触点数区分。
  if (/Macintosh|Mac OS X/.test(ua)) return navigator.maxTouchPoints > 1 ? null : 'mac';
  if (/Windows/.test(ua)) return 'windows';
  return null;
}

function setupDownloads(): void {
  const os = detectOs();
  if (!os) return;
  for (const button of document.querySelectorAll<HTMLAnchorElement>('[data-download]')) {
    const label = button.dataset[os === 'mac' ? 'labelMac' : 'labelWin'];
    const text = button.querySelector('span');
    if (label && text) text.textContent = label;
    button.href = DOWNLOADS[os];
  }
  const feed = os === 'mac' ? 'mac' : 'win';
  document.querySelector(`.dl-card[data-feed="${feed}"]`)?.classList.add('is-match');
}

function setupNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  const toggle = nav.querySelector<HTMLButtonElement>('.nav-toggle');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open: boolean) => {
    nav.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
  };
  toggle?.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelector('.nav-menu')?.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle?.focus();
    }
  });
}

function setupReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // 已在视口里的直接显示，免得先藏起来再淡入闪一下。
  for (const item of items) {
    if (item.getBoundingClientRect().top < window.innerHeight) item.classList.add('is-visible');
    const siblings = item.parentElement ? Array.from(item.parentElement.children).filter((el) => el.hasAttribute('data-reveal')) : [];
    const index = siblings.indexOf(item);
    if (index > 0) item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  }
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  for (const item of items) if (!item.classList.contains('is-visible')) observer.observe(item);
}

function canHoverPreview(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return (
    matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !connection?.saveData
  );
}

function setupTemplates(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-player]');
  const video = dialog?.querySelector<HTMLVideoElement>('[data-player-video]');
  const title = dialog?.querySelector('[data-player-title]');
  const summary = dialog?.querySelector('[data-player-summary]');
  const hover = canHoverPreview();

  for (const card of document.querySelectorAll<HTMLElement>('.tpl')) {
    const button = card.querySelector<HTMLButtonElement>('.tpl-media');
    const src = card.dataset.preview;
    if (!button || !src) continue;

    if (hover) {
      let timer = 0;
      let preview: HTMLVideoElement | null = null;
      button.addEventListener('pointerenter', () => {
        timer = window.setTimeout(() => {
          if (!preview) {
            preview = document.createElement('video');
            preview.muted = true;
            preview.loop = true;
            preview.playsInline = true;
            preview.preload = 'auto';
            preview.setAttribute('aria-hidden', 'true');
            preview.src = src;
            button.append(preview);
          }
          preview.play().then(
            () => button.classList.add('is-playing'),
            () => undefined,
          );
        }, 140);
      });
      button.addEventListener('pointerleave', () => {
        window.clearTimeout(timer);
        button.classList.remove('is-playing');
        preview?.pause();
      });
    }

    button.addEventListener('click', () => {
      if (!dialog || !video || typeof dialog.showModal !== 'function') {
        window.open(src, '_blank', 'noopener');
        return;
      }
      if (title) title.textContent = card.dataset.title ?? '';
      if (summary) summary.textContent = card.dataset.summary ?? '';
      dialog.classList.toggle('is-portrait', card.dataset.portrait !== undefined);
      video.src = src;
      dialog.showModal();
      video.play().catch(() => undefined);
    });
  }

  if (!dialog || !video) return;
  dialog.querySelector('[data-player-close]')?.addEventListener('click', () => dialog.close());
  // 点遮罩关闭：点在对话框自身（而不是里面的内容）上就是点在遮罩上。
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    video.pause();
    video.removeAttribute('src');
    video.load();
  });
}

setupDownloads();
setupNav();
setupReveal();
setupTemplates();

// 以 <script type="module"> 加载；这一行让它作为模块编译，顶层名字不进全局。
export {};

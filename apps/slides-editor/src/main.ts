import '@baocut/slides-runtime/app.css';
import { createSlidesRuntime } from '@baocut/slides-runtime';
import { installEditorHost } from '@baocut/slides/editor';

// 先装宿主（globalThis.slidesHost），再启动运行时：运行时启动时就会读宿主能力（docs/design/slides §5）。
installEditorHost();
createSlidesRuntime();

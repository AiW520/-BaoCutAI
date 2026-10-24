import { pluralForm } from '@baocut/protocol';
import type { WorkbenchMessages } from './home-workbench-copy.ts';

export const es: WorkbenchMessages = {
  eyebrow: "OpenFox · Espacio creativo",
  title: "Convierte una idea en tu próximo vídeo.",
  intro: "Describe una idea, añade material o continúa tu trabajo.",
  recentTitle: "Proyectos recientes",
  recentHint: "Continúa donde lo dejaste",
  browse: "Ver todos los trabajos",
  continueVideo: "Continuar editando",
  continueSession: "Continuar sesión",
  startSession: "Iniciar sesión de trabajo",
  empty: "Crea un proyecto para reunir tus vídeos y sesiones creativas.",
  videos: (n: number) => `${n} ${pluralForm('es', n, { one: "vídeo", other: "vídeos" })}`,
  sessions: (n: number) => `${n} ${pluralForm('es', n, { one: "sesión", other: "sesiones" })}`,
};

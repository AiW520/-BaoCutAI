import { pluralForm } from '@baocut/protocol';
import type { LegacyImportMessages } from './legacy-import-copy.ts';

export const es: LegacyImportMessages = {
  title: '¿Importar proyectos de una versión anterior?',
  lead: (n) =>
    pluralForm('es', n, {
      one: `Hay ${n} proyecto de una versión anterior de OpenFox en este ordenador. Impórtalo para seguir editándolo en esta versión. Los archivos originales se quedan donde están, sin cambios.`,
      other: `Hay ${n} proyectos de una versión anterior de OpenFox en este ordenador. Impórtalos para seguir editándolos en esta versión. Los archivos originales se quedan donde están, sin cambios.`,
    }),
  found: 'Proyectos encontrados',
  destination: 'Importar en',
  resetDefault: 'Usar ubicación predeterminada',
  change: 'Cambiar…',
  pickTitle: 'Elige dónde importar',
  destinationNote: 'Esta carpeta aparece como un proyecto en Home, y cada proyecto anterior pasa a ser un vídeo dentro de él.',
  hint: 'Si lo omites, se te volverá a preguntar la próxima vez que se inicie OpenFox. Marca «No volver a recordar» para no importarlos nunca.',
  never: 'No volver a recordar',
  skip: 'Omitir',
  import: 'Importar',
  importing: (n) =>
    pluralForm('es', n, {
      one: `Importando ${n} proyecto anterior en segundo plano`,
      other: `Importando ${n} proyectos anteriores en segundo plano`,
    }),
  neverDone: 'No se te volverá a recordar que importes proyectos anteriores. Los archivos originales se quedan como están.',
  skipped: 'Omitido. Se te volverá a preguntar la próxima vez que se inicie OpenFox.',
  failed: (message) => `No se pudo importar: ${message}`,
  settingsTitle: "Recuperación de ajustes de una versión anterior",
  settingsLeadAdopted: "Durante la actualización se adoptó la carpeta de modelos anterior. La instalación verifica los archivos existentes con el manifiesto actual y descarga solo los que faltan o están dañados.",
  settingsLeadPreserved: "Se conservaron los ajustes y la carpeta de modelos actuales. Algunas preferencias anteriores de transcripción no se trasladaron.",
  settingsDirectory: "Carpeta de modelos adoptada durante la actualización",
  settingsPreferences: "Preferencias que debes volver a elegir",
  settingsModel: "No se trasladó el modelo de transcripción predeterminado anterior. Completa los componentes necesarios y elige un modelo predeterminado en los ajustes de Reconocimiento de voz.",
  settingsLanguage: "No se trasladó el idioma de reconocimiento anterior. En esta versión, elige el idioma para cada transcripción.",
  settingsHint: "Puedes consultar este informe en Ajustes › Reconocimiento de voz. Confirmarlo no instala modelos ni cambia las preferencias.",
  settingsAcknowledge: "Entendido",
  settingsOpen: "Ver ajustes de Reconocimiento de voz",
  settingsNotice: "Debes volver a elegir las preferencias anteriores de transcripción.",
  settingsNoticeDetail: "Los archivos de modelos existentes se pueden verificar y reutilizar. Consulta los detalles y los siguientes pasos.",
  settingsViewReport: "Ver informe de recuperación",
};

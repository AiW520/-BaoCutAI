import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('es', { type: 'conjunction' }).format(labels);

export const es: DocsMessages = {
  tabs: (n) => (n === 1 ? '1 pestaña' : `${n} pestañas`),
  paneLabel: (name) => `Documento colaborativo «${name}»`,
  frameTitle: (name) => `Editor de documentos colaborativos: ${name}`,
  opening: 'Abriendo el documento colaborativo…',
  unavailableTitle: 'Editor de documentos colaborativos no disponible',
  unavailableBody: 'Esta versión de OpenFox no incluye el editor de documentos colaborativos. Los archivos del documento siguen en su carpeta.',
  openFailed: (reason) => `No se pudo abrir el documento colaborativo: ${reason}`,
  open: 'Abrir documento colaborativo',
  openCard: (name) => `Abrir documento colaborativo «${name}»`,
  openInEditor: 'Abrir en el editor de documentos colaborativos',
  comment: 'Comentario',
  ask: 'Solicitud',
  token: (n) => `Anotaciones de documento · ${n}`,
  added: (token) => `Añadido al chat · ${token}`,
  removeAll: 'Quitar todas las anotaciones de documento',
  removeOne: (n) => `Quitar la anotación ${n}`,
  item: (n, label, text) => `Anotación ${n}, ${label}: ${text}`,
  empty: 'Este comentario está vacío, así que no se añadió al chat',
  tooLong: (max) => `Una anotación puede tener como máximo ${max} caracteres`,
  tooMany: (max) => `Un mensaje puede llevar como máximo ${max} anotaciones de documento. Envía estas primero.`,
  noConversation: 'Esta pestaña aún no forma parte de una sesión. Envía un mensaje para empezar una y luego envía comentarios al agente.',
  message: 'Atiende estos comentarios y solicitudes del documento.',
  flushFailed: (names) =>
    `Los cambios en ${names.length === 1 ? 'el documento colaborativo' : 'los documentos colaborativos'} ${list(names.map((n) => `«${n}»`))} aún no se han guardado, así que el mensaje no se envió. Inténtalo de nuevo o quita primero las anotaciones de documento.`,
};

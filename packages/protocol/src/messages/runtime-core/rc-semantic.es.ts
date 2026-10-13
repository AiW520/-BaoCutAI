import type { RcSemanticMessages } from './rc-semantic.ts';

export const es: RcSemanticMessages = {
  modelNotInstalled: 'La búsqueda semántica necesita el modelo de búsqueda de texto. Instálalo en Ajustes › Índice semántico',
  modelUnavailable: 'No se pudo ejecutar el modelo de búsqueda de texto',
  profileIncompatible: 'El índice semántico se creó con otro modelo y hay que reconstruirlo',
  inputTooLong: (p) => `La consulta es demasiado larga (más de ${p.max} caracteres)`,
  sourceMissing: 'El origen de este resultado ya no existe',
  indexNotReady: 'El índice semántico aún no está listo. Créalo en Ajustes › Índice semántico',
  indexPartial: 'El índice semántico solo cubre parte de este ámbito; puede que falten resultados',
  staleRevision: 'El vídeo cambió después de encontrar este resultado',
  cursorStale: 'Los resultados cambiaron. Vuelve a buscar',
  searchCancelled: 'Se canceló la búsqueda',
  resourceExhausted: 'Ahora no hay suficiente memoria o capacidad de cálculo para ejecutar el modelo de búsqueda',
  appearanceUnavailable: 'Aún no se puede buscar lo que se ve en el vídeo final',
  channelUnavailable: 'Aún no se pueden buscar imágenes ni sonidos',
  storeUnavailable: 'No se pudo abrir el índice semántico',
  hitInvalid: 'No se encuentra este resultado. Vuelve a buscar',
  needsTextChannel: 'Elige el contenido hablado: por ahora solo se puede buscar lo que se dice',
};

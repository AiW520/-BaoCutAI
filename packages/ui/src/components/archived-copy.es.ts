import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const es: ArchivedMessages = {
  title: 'Sesiones archivadas',
  intro: 'Las sesiones archivadas no aparecen en la barra lateral. Sus vídeos, archivos y cambios siguen ahí. Al restaurar una sesión, vuelve a su proyecto.',
  search: 'Buscar sesiones archivadas',
  filterLabel: 'Filtrar por proyecto',
  allProjects: 'Todos los proyectos',
  noProject: 'Fuera de un proyecto',
  sessionCount: (n) => `${n} ${pluralForm('es', n, { one: 'sesión', other: 'sesiones' })}`,
  meta: (archived, active) => `Archivada: ${archived} · Última actividad: ${active}`,
  restore: 'Restaurar',
  restoreNamed: (title) => `Restaurar «${title}»`,
  deleteNamed: (title) => `Eliminar «${title}»`,
  deleteAll: 'Eliminar todas',
  deleteAllTitle: (n) => pluralForm('es', n, { one: `¿Eliminar ${n} sesión archivada?`, other: `¿Eliminar las ${n} sesiones archivadas?` }),
  deleteAllBody:
    'Su historial se eliminará de BaoCut y cualquier tarea en curso se detendrá antes. No se puede deshacer. Los archivos de las carpetas de proyecto no se ven afectados.',
  restored: (title) => `«${title}» restaurada`,
  open: 'Abrir',
  restoreFailed: (message) => `No se pudo restaurar: ${message}`,
  deleted: (title) => `«${title}» eliminada`,
  deletedAll: (n) => pluralForm('es', n, { one: `Se eliminó ${n} sesión archivada`, other: `Se eliminaron ${n} sesiones archivadas` }),
  deletedSome: (done, total) =>
    `Se eliminaron ${done} de ${total} ${pluralForm('es', total, { one: 'sesión archivada', other: 'sesiones archivadas' })}. No se pudo eliminar el resto.`,
  emptyTitle: 'No hay sesiones archivadas',
  emptyBody: 'Archiva una sesión desde su fila en la barra lateral para moverla aquí. Podrás restaurarla más tarde.',
  noMatchTitle: 'No hay sesiones que coincidan',
  noMatchBody: 'Prueba otra búsqueda o vuelve a poner el filtro de proyecto en «Todos los proyectos».',
  banner: 'Esta sesión está archivada y oculta en la barra lateral.',
  viewAll: 'Ver todas las archivadas',
  viewArchived: 'Ver archivadas',
};

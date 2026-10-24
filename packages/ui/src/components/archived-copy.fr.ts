import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const fr: ArchivedMessages = {
  title: 'Sessions archivées',
  intro: 'Les sessions archivées sont masquées dans la barre latérale. Leurs vidéos, fichiers et modifications sont toujours là. Une session restaurée retrouve sa place sous son projet.',
  search: 'Rechercher dans les sessions archivées',
  filterLabel: 'Filtrer par projet',
  allProjects: 'Tous les projets',
  noProject: 'Hors d’un projet',
  sessionCount: (n) => `${n} ${pluralForm('fr', n, { one: 'session', other: 'sessions' })}`,
  meta: (archived, active) => `Archivée : ${archived} · Dernière activité : ${active}`,
  restore: 'Restaurer',
  restoreNamed: (title) => `Restaurer « ${title} »`,
  deleteNamed: (title) => `Supprimer « ${title} »`,
  deleteAll: 'Tout supprimer',
  deleteAllTitle: (n) => pluralForm('fr', n, { one: `Supprimer ${n} session archivée ?`, other: `Supprimer les ${n} sessions archivées ?` }),
  deleteAllBody:
    'Leur historique sera supprimé de OpenFox et toute tâche en cours sera d’abord arrêtée. Cette action est irréversible. Les fichiers des dossiers de projet ne sont pas touchés.',
  restored: (title) => `« ${title} » restauré`,
  open: 'Ouvrir',
  restoreFailed: (message) => `Impossible de restaurer : ${message}`,
  deleted: (title) => `« ${title} » supprimé`,
  deletedAll: (n) => pluralForm('fr', n, { one: `${n} session archivée supprimée`, other: `${n} sessions archivées supprimées` }),
  deletedSome: (done, total) =>
    `${pluralForm('fr', total, { one: 'Session archivée supprimée', other: 'Sessions archivées supprimées' })} : ${done} sur ${total}. Les autres n’ont pas pu être supprimées.`,
  emptyTitle: 'Aucune session archivée',
  emptyBody: 'Archivez une session depuis sa ligne dans la barre latérale pour la déplacer ici. Vous pourrez la restaurer plus tard.',
  noMatchTitle: 'Aucune session correspondante',
  noMatchBody: 'Essayez une autre recherche ou remettez le filtre de projet sur « Tous les projets ».',
  banner: 'Cette session est archivée et masquée dans la barre latérale.',
  viewAll: 'Voir toutes les archives',
  viewArchived: 'Voir les archives',
};

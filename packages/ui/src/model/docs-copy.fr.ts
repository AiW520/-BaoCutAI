import type { DocsMessages } from './docs-copy.ts';

const list = (labels: readonly string[]) => new Intl.ListFormat('fr', { type: 'conjunction' }).format(labels);

export const fr: DocsMessages = {
  tabs: (n) => (n === 1 ? '1 onglet' : `${n} onglets`),
  paneLabel: (name) => `Document collaboratif « ${name} »`,
  frameTitle: (name) => `Éditeur de documents collaboratifs : ${name}`,
  opening: 'Ouverture du document collaboratif…',
  unavailableTitle: 'Éditeur de documents collaboratifs indisponible',
  unavailableBody: 'Cette version de OpenFox ne comprend pas l’éditeur de documents collaboratifs. Les fichiers du document restent dans leur dossier.',
  openFailed: (reason) => `Impossible d’ouvrir le document collaboratif : ${reason}`,
  open: 'Ouvrir le document collaboratif',
  openCard: (name) => `Ouvrir le document collaboratif « ${name} »`,
  openInEditor: 'Ouvrir dans l’éditeur de documents collaboratifs',
  comment: 'Commentaire',
  ask: 'Demande',
  token: (n) => `Annotations de document · ${n}`,
  added: (token) => `Ajouté à la conversation · ${token}`,
  removeAll: 'Retirer toutes les annotations de document',
  removeOne: (n) => `Retirer l’annotation ${n}`,
  item: (n, label, text) => `Annotation ${n}, ${label} : ${text}`,
  empty: 'Ce commentaire est vide : il n’a pas été ajouté à la conversation',
  tooLong: (max) => `Une annotation ne peut pas dépasser ${max} caractères`,
  tooMany: (max) => `Un message peut contenir au plus ${max} annotations de document. Envoyez d’abord celles-ci.`,
  noConversation: 'Cet onglet ne fait pas encore partie d’une session. Envoyez un message pour en démarrer une, puis envoyez les commentaires à l’agent.',
  message: 'Traite ces commentaires et demandes du document.',
  flushFailed: (names) =>
    `Les modifications ${names.length === 1 ? 'du document collaboratif' : 'des documents collaboratifs'} ${list(names.map((n) => `« ${n} »`))} ne sont pas encore enregistrées : le message n’a pas été envoyé. Réessayez ou retirez d’abord les annotations de document.`,
};

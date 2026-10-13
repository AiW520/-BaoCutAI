import type { RcSemanticMessages } from './rc-semantic.ts';

export const fr: RcSemanticMessages = {
  modelNotInstalled: 'La recherche sémantique nécessite le modèle de recherche de texte. Installez-le dans Réglages › Index sémantique',
  modelUnavailable: 'Impossible d’exécuter le modèle de recherche de texte',
  profileIncompatible: 'L’index sémantique a été créé avec un autre modèle et doit être reconstruit',
  inputTooLong: (p) => `La requête est trop longue (plus de ${p.max} caractères)`,
  sourceMissing: 'La source de ce résultat n’existe plus',
  indexNotReady: 'L’index sémantique n’est pas encore prêt. Créez-le dans Réglages › Index sémantique',
  indexPartial: 'L’index sémantique ne couvre qu’une partie de cette portée ; des résultats peuvent manquer',
  staleRevision: 'La vidéo a changé après que ce résultat a été trouvé',
  cursorStale: 'Les résultats ont changé. Relancez la recherche',
  searchCancelled: 'La recherche a été annulée',
  resourceExhausted: 'Pas assez de mémoire ou de puissance de calcul pour exécuter le modèle de recherche pour le moment',
  appearanceUnavailable: 'La recherche de ce qu’on voit dans la vidéo finale n’est pas encore disponible',
  channelUnavailable: 'La recherche d’images et de sons n’est pas encore disponible',
  storeUnavailable: 'Impossible d’ouvrir l’index sémantique',
  hitInvalid: 'Ce résultat est introuvable. Relancez la recherche',
  needsTextChannel: 'Choisissez le contenu parlé : pour l’instant, seul ce qui est dit peut être recherché',
};

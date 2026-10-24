import { pluralForm } from '@baocut/protocol';
import type { ArchivedMessages } from './archived-copy.ts';

export const ptBR: ArchivedMessages = {
  title: 'Sessões arquivadas',
  intro: 'Sessões arquivadas ficam ocultas na barra lateral. Os vídeos, arquivos e alterações delas continuam lá. Uma sessão restaurada volta para o projeto dela.',
  search: 'Pesquisar sessões arquivadas',
  filterLabel: 'Filtrar por projeto',
  allProjects: 'Todos os projetos',
  noProject: 'Fora de um projeto',
  sessionCount: (n) => `${n} ${pluralForm('pt-BR', n, { one: 'sessão', other: 'sessões' })}`,
  meta: (archived, active) => `Arquivada: ${archived} · Última atividade: ${active}`,
  restore: 'Restaurar',
  restoreNamed: (title) => `Restaurar “${title}”`,
  deleteNamed: (title) => `Excluir “${title}”`,
  deleteAll: 'Excluir todas',
  deleteAllTitle: (n) => pluralForm('pt-BR', n, { one: `Excluir ${n} sessão arquivada?`, other: `Excluir todas as ${n} sessões arquivadas?` }),
  deleteAllBody:
    'O histórico delas será removido do OpenFox, e qualquer tarefa em andamento será interrompida antes. Não é possível desfazer. Arquivos nas pastas de projeto não são afetados.',
  restored: (title) => `Restaurada “${title}”`,
  open: 'Abrir',
  restoreFailed: (message) => `Não foi possível restaurar: ${message}`,
  deleted: (title) => `Excluída “${title}”`,
  deletedAll: (n) => pluralForm('pt-BR', n, { one: `${n} sessão arquivada excluída`, other: `${n} sessões arquivadas excluídas` }),
  deletedSome: (done, total) =>
    `${done} de ${total} ${pluralForm('pt-BR', total, { one: 'sessão arquivada excluída', other: 'sessões arquivadas excluídas' })}. Não foi possível excluir as demais.`,
  emptyTitle: 'Nenhuma sessão arquivada',
  emptyBody: 'Arquive uma sessão pela linha dela na barra lateral para movê-la para cá. Você pode restaurá-la depois.',
  noMatchTitle: 'Nenhuma sessão correspondente',
  noMatchBody: 'Tente outra pesquisa ou volte o filtro de projeto para “Todos os projetos”.',
  banner: 'Esta sessão está arquivada e oculta na barra lateral.',
  viewAll: 'Ver todas as arquivadas',
  viewArchived: 'Ver arquivadas',
};

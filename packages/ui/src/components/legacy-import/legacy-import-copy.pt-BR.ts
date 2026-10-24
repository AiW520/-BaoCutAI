import { pluralForm } from '@baocut/protocol';
import type { LegacyImportMessages } from './legacy-import-copy.ts';

export const ptBR: LegacyImportMessages = {
  title: 'Importar projetos de uma versão anterior?',
  lead: (n) =>
    pluralForm('pt-BR', n, {
      one: `Há ${n} projeto de uma versão anterior do OpenFox neste computador. Importe-o para continuar editando nesta versão. Os arquivos originais ficam onde estão, sem alterações.`,
      other: `Há ${n} projetos de uma versão anterior do OpenFox neste computador. Importe-os para continuar editando nesta versão. Os arquivos originais ficam onde estão, sem alterações.`,
    }),
  found: 'Projetos encontrados',
  destination: 'Importar para',
  resetDefault: 'Usar local padrão',
  change: 'Alterar…',
  pickTitle: 'Escolha onde importar',
  destinationNote: 'Esta pasta aparece como um projeto em Home, e cada projeto anterior vira um vídeo dentro dela.',
  hint: 'Se pular, você será perguntado de novo na próxima vez que o OpenFox iniciar. Marque “Não lembrar novamente” para nunca importá-los.',
  never: 'Não lembrar novamente',
  skip: 'Pular',
  import: 'Importar',
  importing: (n) =>
    pluralForm('pt-BR', n, {
      one: `Importando ${n} projeto anterior em segundo plano`,
      other: `Importando ${n} projetos anteriores em segundo plano`,
    }),
  neverDone: 'Você não será mais lembrado de importar projetos anteriores. Os arquivos originais ficam como estão.',
  skipped: 'Pulado. Você será perguntado de novo na próxima vez que o OpenFox iniciar.',
  failed: (message) => `Não foi possível importar: ${message}`,
  settingsTitle: "Recuperação de configurações de uma versão anterior",
  settingsLeadAdopted: "A pasta de modelos anterior foi adotada durante a atualização. A instalação verifica os arquivos existentes com o manifesto atual e baixa apenas os ausentes ou danificados.",
  settingsLeadPreserved: "As configurações e a pasta de modelos atuais foram mantidas. Algumas preferências anteriores de transcrição não foram transferidas.",
  settingsDirectory: "Pasta de modelos adotada durante a atualização",
  settingsPreferences: "Preferências para selecionar novamente",
  settingsModel: "O modelo padrão anterior de transcrição não foi transferido. Complete os componentes necessários e escolha um modelo padrão nas configurações de reconhecimento de fala.",
  settingsLanguage: "O idioma anterior de reconhecimento não foi transferido. Nesta versão, escolha o idioma para cada transcrição.",
  settingsHint: "Este relatório fica disponível em Configurações › Reconhecimento de fala. Confirmar não instala modelos nem altera preferências.",
  settingsAcknowledge: "Entendi",
  settingsOpen: "Ver configurações de reconhecimento de fala",
  settingsNotice: "Selecione novamente as preferências anteriores de transcrição.",
  settingsNoticeDetail: "Os arquivos de modelos existentes podem ser verificados e reutilizados. Veja os detalhes e os próximos passos.",
  settingsViewReport: "Ver relatório de recuperação",
};

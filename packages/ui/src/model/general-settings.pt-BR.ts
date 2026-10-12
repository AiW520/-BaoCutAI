import type { GeneralSettingsModelMessages } from './general-settings.ts';
import { pluralForm } from '@baocut/protocol';

export const ptBR: GeneralSettingsModelMessages = {
  lineShort: 'Curta', lineMedium: 'Média', lineLong: 'Longa',
  lineLength: (cjk: number, other: number) => `Texto CJK: ${pluralForm('pt-BR', cjk, { one: `${cjk} caractere`, other: `${cjk} caracteres` })} por linha · Outro texto: ${pluralForm('pt-BR', other, { one: `${other} caractere`, other: `${other} caracteres` })} por linha`,
  endpointTooLong: (max: number) => pluralForm('pt-BR', max, { one: `Longo demais: até ${max} caractere`, other: `Longo demais: até ${max} caracteres` }),
  endpointNotUrl: 'Não é um endereço web: deve começar com http:// ou https://',
  endpointScheme: 'Só são aceitos endereços que começam com http:// ou https://',
  endpointCredentials: 'O endereço não pode incluir nome de usuário ou senha',
  endpointQuery: 'O endereço não pode incluir parâmetros de consulta (a parte após ?)',
  endpointHash: 'O endereço não pode incluir um fragmento (a parte após #)',
  saveDir: {
    label: 'Local padrão de salvamento', desc: 'Resultados de ferramentas, vídeos baixados e arquivos entregues pelo agente são salvos aqui. O padrão é sua pasta Downloads.', systemDefault: 'Pasta Downloads', isDefault: 'Padrão', change: 'Alterar…', reset: 'Redefinir para o padrão', pickTitle: 'Escolher local padrão de salvamento', changed: 'Local padrão de salvamento alterado', resetDone: 'Redefinido para a pasta Downloads',
    pickFailed: (message: string) => `Não foi possível escolher uma pasta: ${message}`,
    webNote: 'Um navegador não pode escolher uma pasta deste computador. Configure no aplicativo de desktop BaoCut.',
  },
};

import type { DriversAntigravityMessages } from './drivers-antigravity.ts';

export const ko: DriversAntigravityMessages = {
  invalidOutput: "Antigravity가 잘못된 스트림 데이터를 반환했습니다",
  invalidModels: "Antigravity의 모델 목록이 잘못되었습니다",
  resumeMismatch: "Antigravity가 다른 대화를 복원했습니다",
  mcpUnavailable: "Antigravity는 BaoCut의 임시 MCP 설정을 받을 수 없습니다. 이 대화에서는 BaoCut 도구를 사용할 수 없습니다.",
  effortUnsupported: "Antigravity의 추론 강도는 모델 ID로 선택합니다. 모델을 선택하세요",
  turnFailed: "Antigravity의 이번 실행이 실패했습니다",
  denied: (p) => `Antigravity의 자체 정책이 다음 작업을 거부했습니다: ${p.actions}`,
  fullAccessOnly: (p) =>
    `Antigravity는 동작마다 먼저 확인할 방법이 없어 BaoCut은 “${p.mode}” 모드로만 실행할 수 있습니다. 명령을 실행하거나 파일을 바꾸기 전에 확인하지 않습니다.`,
};

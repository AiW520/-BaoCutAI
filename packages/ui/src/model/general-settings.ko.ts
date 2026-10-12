import type { GeneralSettingsModelMessages } from './general-settings.ts';

export const ko: GeneralSettingsModelMessages = {
  lineShort: '짧게',
  lineMedium: '보통',
  lineLong: '길게',
  lineLength: (cjk: number, other: number) => `한중일 문자: 한 줄에 ${cjk}자 · 그 밖의 문자: 한 줄에 ${other}자`,
  endpointTooLong: (max: number) => `너무 깁니다: 최대 ${max}자`,
  endpointNotUrl: '웹 주소가 아닙니다: http:// 또는 https://로 시작해야 합니다',
  endpointScheme: 'http:// 또는 https://로 시작하는 주소만 지원합니다',
  endpointCredentials: '주소에 사용자 이름이나 비밀번호를 넣을 수 없습니다',
  endpointQuery: '주소에 쿼리 매개변수(? 뒤의 부분)를 넣을 수 없습니다',
  endpointHash: '주소에 프래그먼트(# 뒤의 부분)를 넣을 수 없습니다',
  saveDir: {
    label: '기본 저장 위치',
    desc: '도구 결과, 다운로드한 영상, Agent가 넘겨준 파일이 여기에 저장됩니다. 기본값은 다운로드 폴더입니다.',
    systemDefault: '다운로드 폴더',
    isDefault: '기본값',
    change: '변경…',
    reset: '기본값으로 재설정',
    pickTitle: '기본 저장 위치 선택',
    changed: '기본 저장 위치를 변경했습니다',
    resetDone: '다운로드 폴더로 재설정했습니다',
    pickFailed: (message: string) => `폴더를 선택하지 못했습니다: ${message}`,
    webNote: '브라우저에서는 이 컴퓨터의 폴더를 선택할 수 없습니다. BaoCut 데스크톱 앱에서 설정하세요.',
  },
};

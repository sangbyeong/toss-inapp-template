export type TossLaunchConfig = {
  /** Apps in Toss 콘솔에 등록한 앱 ID입니다. 딥링크는 intoss://{appName} 형태로 열립니다. */
  appName: string;
  /** 사용자가 보는 앱 이름입니다. 콘솔의 표시 이름과 동일하게 맞춰 주세요. */
  displayName: string;
  /** 브랜드 대표 색상입니다. #RRGGBB 형식으로 입력해 주세요. */
  primaryColor: `#${string}`;
  /** 콘솔에 업로드한 아이콘 이미지 URL입니다. 실제 출시 전 반드시 교체해 주세요. */
  iconUrl: string;
  /** 로컬 샌드박스 테스트 때 샌드박스 앱이 접근할 개발 서버 주소입니다. */
  devHost: string;
  /** Vite 개발 서버 포트입니다. */
  devPort: number;
  /** 게임이면 game, 일반 서비스면 partner를 사용합니다. */
  webViewType: 'partner' | 'game';
};

const launchConfig = {
  appName: 'toss-inapp-template',
  displayName: '토스 미니앱 템플릿',
  primaryColor: '#3182F6',
  iconUrl: 'https://static.toss.im/icons/png/4x/icon-toss-logo.png',
  devHost: 'localhost',
  devPort: 5173,
  webViewType: 'partner',
} satisfies TossLaunchConfig;

export default launchConfig;

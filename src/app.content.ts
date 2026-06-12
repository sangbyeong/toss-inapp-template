export type AppAction = {
  label: string;
  href: string;
};

export type AppSection = {
  title: string;
  description: string;
};

export type AppContent = {
  heroTitle: string;
  heroSubtitle: string;
  primaryAction: AppAction;
  sections: AppSection[];
  footerNote: string;
};

const appContent = {
  heroTitle: 'Apps in Toss WebView 미니앱을 빠르게 시작하세요',
  heroSubtitle:
    '이 템플릿은 React, Vite, TypeScript, Apps in Toss WebView SDK 2.x 기준으로 구성되어 있어요. 내용은 이 파일에서만 바꾸면 됩니다.',
  primaryAction: {
    label: 'README 따라 시작하기',
    href: 'https://developers-apps-in-toss.toss.im/tutorials/webview.html',
  },
  sections: [
    {
      title: '1. 앱 정보 입력',
      description: 'toss.launch.config.ts에서 콘솔에 등록한 appName, 표시 이름, 아이콘 URL을 입력하세요.',
    },
    {
      title: '2. 화면 문구 수정',
      description: 'src/app.content.ts에서 사용자에게 보여줄 문구와 섹션을 바꾸세요.',
    },
    {
      title: '3. 기능 켜기',
      description: '카메라, 사진, 클립보드, 외부 API가 필요하면 toss.features.config.ts에서 명시적으로 켜세요.',
    },
  ],
  footerNote: '실제 API 키와 secret은 코드에 저장하지 말고 .env.local 또는 GitHub Secrets에 보관하세요.',
} satisfies AppContent;

export default appContent;

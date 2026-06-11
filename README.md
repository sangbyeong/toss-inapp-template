# toss-inapp-template

React + Vite + TypeScript + Apps in Toss WebView SDK 2.x로 만든 **완성형 미니앱 템플릿**입니다.  
처음 사용하는 분도 앱 이름과 화면 문구만 바꿔서 샌드박스 테스트, 빌드, GitHub Actions 배포까지 이어갈 수 있게 구성했습니다.


## Codex만으로 출시하는 빠른 흐름

로컬 개발 환경이 없어도 GitHub에서 Codex와 협업해 출시할 수 있도록 구성했습니다.

1. Apps in Toss 콘솔에서 앱을 만들고 `appName`, 표시 이름, 아이콘 URL, 브랜드 색상을 준비합니다.
2. Codex에게 `toss.launch.config.ts`와 `src/app.content.ts`만 수정해 달라고 요청합니다.
3. 권한이나 외부 API가 필요할 때만 `toss.features.config.ts` 수정을 요청합니다.
4. Codex가 만든 PR에서 GitHub Actions `build-ait`가 성공했는지 확인합니다.
5. GitHub Secrets에 `AIT_API_KEY`를 등록합니다.
6. GitHub Actions `deploy-ait`를 수동 실행하거나 `v*` 태그를 push해 Apps in Toss에 업로드합니다.

자세한 클라우드 전용 출시 절차는 [`docs/codex-release-guide.md`](docs/codex-release-guide.md)를 보세요.

## 이 템플릿이 지키는 원칙

- 기본 수정 파일은 두 개입니다.
  - `toss.launch.config.ts`: 앱 이름, 표시 이름, 아이콘, 개발 서버 주소
  - `src/app.content.ts`: 화면에 보이는 제목, 설명, 섹션 문구
- 권한과 외부 API는 `toss.features.config.ts`에서 필요할 때만 켭니다.
- 실제 API 키와 secret은 코드에 저장하지 않습니다.
  - 로컬: `.env.local`
  - GitHub Actions: GitHub Secrets
- Cloudflare, Supabase, Firebase는 기본 포함하지 않습니다.
- GitHub Actions workflow로 `build-ait`와 `deploy-ait`를 제공합니다.
- Apps in Toss 구현을 바꿀 때 Codex는 AX MCP가 있으면 AX MCP로 공식 문서와 예제를 먼저 확인하도록 지침을 포함했습니다.

## 폴더 구조

```text
.
├── src/
│   ├── App.tsx              # 템플릿 화면
│   ├── app.content.ts       # 사용자가 바꾸는 화면 문구
│   ├── main.tsx
│   └── styles.css
├── toss.launch.config.ts    # 사용자가 바꾸는 앱 실행/브랜드 설정
├── toss.features.config.ts  # 권한/API 기능 스위치
├── granite.config.ts        # Apps in Toss 빌드 설정으로 변환하는 내부 파일
├── docs/
│   └── codex-release-guide.md # Codex만으로 출시하는 절차
└── .github/workflows/
    ├── build-ait.yml
    └── deploy-ait.yml
```

## 1. 준비물

로컬에서 직접 테스트하는 경우의 준비물입니다. 로컬 환경 없이 GitHub와 Codex만으로 진행하려면 위의 **Codex만으로 출시하는 빠른 흐름**을 따르면 됩니다.

1. Node.js 20 이상을 설치합니다.
2. Apps in Toss 콘솔에서 미니앱을 만들고 `appName`, 표시 이름, 아이콘 URL을 준비합니다.
3. 이 레포를 복제한 뒤 의존성을 설치합니다.

```bash
npm install
```

> 이 템플릿은 초기 상태에서 lockfile 없이도 GitHub Actions가 동작하도록 `npm install`을 사용합니다. 나중에 `package-lock.json`을 커밋하면 workflow를 `npm ci`와 npm cache 사용 방식으로 바꿔도 됩니다.

## 2. 앱 정보 입력하기

`toss.launch.config.ts`를 열고 아래 값을 콘솔 정보와 맞춥니다.

| 항목 | 설명 |
| --- | --- |
| `appName` | Apps in Toss 콘솔의 앱 ID입니다. 딥링크는 `intoss://{appName}`입니다. |
| `displayName` | 사용자에게 보이는 앱 이름입니다. |
| `primaryColor` | 브랜드 대표 색상입니다. |
| `iconUrl` | 콘솔에 업로드한 아이콘 이미지 URL입니다. |
| `devHost` | 샌드박스 앱에서 접근할 개발 서버 주소입니다. 로컬 PC 테스트는 보통 `localhost`, 실기기는 PC의 내부 IP를 사용합니다. |
| `devPort` | Vite 개발 서버 포트입니다. 기본값은 `5173`입니다. |
| `webViewType` | 일반 서비스는 `partner`, 게임은 `game`을 사용합니다. |

## 3. 화면 문구 바꾸기

`src/app.content.ts`를 열고 제목, 설명, 버튼 링크, 안내 섹션을 원하는 서비스 내용으로 바꿉니다.

## 4. 권한 또는 외부 API 켜기

기본값은 모든 추가 기능이 꺼져 있습니다. 필요한 경우에만 `toss.features.config.ts`에서 켜세요.

```ts
permissions: {
  clipboardRead: true,
  clipboardWrite: false,
  camera: false,
  photosRead: false,
}
```

외부 API를 쓸 때도 공개 가능한 base URL만 코드에 적습니다. 토큰, API 키, 인증 정보는 절대 커밋하지 마세요.

## 5. 로컬 실행

```bash
npm run dev
```

브라우저에서는 `http://localhost:5173`으로 확인할 수 있습니다. 샌드박스 앱에서 실기기 테스트를 하려면 `toss.launch.config.ts`의 `devHost`를 PC의 내부 IP로 바꾸고 같은 네트워크에서 `intoss://{appName}` 딥링크로 접근하세요.

## 6. 빌드

웹 번들을 먼저 빌드합니다.

```bash
npm run build
```

Apps in Toss 업로드용 산출물을 만듭니다.

```bash
npm run build:ait
```

`build:ait`는 내부적으로 아래 명령을 실행합니다.

```bash
npx ait build
```

## 7. GitHub Actions로 자동 빌드와 배포

### 자동 빌드

`.github/workflows/build-ait.yml`은 pull request, `main` 브랜치 push, 수동 실행에서 동작합니다.

실행 순서:

1. Node.js 20 설정
2. `npm install`
3. `npm run build`
4. `npx ait build`
5. `.ait` 파일과 `dist` 폴더를 artifact로 업로드

### 자동 배포

`.github/workflows/deploy-ait.yml`은 수동 실행 또는 `v*` 태그 push에서 동작합니다.

먼저 GitHub 저장소에서 `AIT_API_KEY` secret을 등록하세요.

1. GitHub 저장소 → **Settings**
2. **Secrets and variables** → **Actions**
3. **New repository secret**
4. 이름: `AIT_API_KEY`
5. 값: Apps in Toss 배포 API 키

workflow의 배포 명령은 다음 형식입니다.

```bash
npx ait deploy --api-key ${{ secrets.AIT_API_KEY }}
```

## 8. secret 관리 규칙

- `.env.local`은 로컬에서만 사용하고 커밋하지 않습니다.
- `.env.example`에는 값 없이 변수 이름만 적습니다.
- GitHub Actions에서는 `secrets.AIT_API_KEY`처럼 GitHub Secrets를 사용합니다.
- 코드, README 예시, PR 설명에 실제 secret 값을 붙여 넣지 마세요.

## 자주 하는 질문

### 사용자가 꼭 수정해야 하는 파일은 무엇인가요?

기본적으로 `toss.launch.config.ts`와 `src/app.content.ts` 두 개만 수정하면 됩니다. 권한이나 외부 API가 필요할 때만 `toss.features.config.ts`를 수정하세요.

### Cloudflare, Supabase, Firebase를 바로 쓸 수 있나요?

기본 템플릿에는 포함하지 않았습니다. 필요한 프로젝트에서 별도로 추가하세요.

### 로컬 개발 환경 없이도 출시할 수 있나요?

네. Codex가 PR을 만들고 GitHub Actions가 `build-ait`와 `deploy-ait`를 실행하는 구조입니다. 자세한 단계는 `docs/codex-release-guide.md`를 확인하세요.

### Apps in Toss 공식 문서는 어디에서 보나요?

Apps in Toss 개발자센터의 WebView 시작하기와 설정하기 문서를 확인하세요.

- https://developers-apps-in-toss.toss.im/tutorials/webview.html
- https://developers-apps-in-toss.toss.im/bedrock/reference/framework/UI/Config.html

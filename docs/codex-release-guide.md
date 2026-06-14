# Codex만으로 Apps in Toss 출시하기

이 문서는 로컬 개발 환경 없이 **GitHub + Codex + GitHub Actions**만으로 템플릿을 수정하고 Apps in Toss에 업로드하는 흐름을 설명합니다.

## 사용하는 방식

이 템플릿은 API로 끌어오는 라이브러리가 아니라 **새 Apps in Toss 미니앱 레포의 시작점**입니다.

추천 방식은 다음 중 하나입니다.

1. GitHub의 **Use this template**로 새 레포를 만든다.
2. 또는 `git clone --depth 1`로 복사한 뒤 `.git`을 지우고 새 레포로 초기화한다.

그다음 Codex에게 앱별 값만 바꾸라고 요청하면 됩니다. 사용자가 직접 관리할 기본 파일은 `toss.launch.config.ts`와 `src/app.content.ts`이고, 권한/API가 필요할 때만 `toss.features.config.ts`를 수정합니다.

## 이미 개발 중인 레포라면

새 레포가 아니라 기존 앱에 붙이는 경우에는 직접 파일을 덮어쓰지 마세요. `package.json`, `src/`, `vite.config.ts`, `.github/workflows/`가 충돌할 수 있습니다.

비개발자는 `docs/adopt-existing-repo.md`의 프롬프트를 Codex에게 붙여 넣고, PR에서 `build-ait`가 성공하는지만 확인하는 방식을 권장합니다. 기존 private 레포라면 작업하는 GitHub 계정이 collaborator 또는 조직 멤버 권한을 가져야 합니다. 템플릿을 찾게 할 때는 레포 이름만 쓰지 말고 `https://github.com/sangbyeong/toss-inapp-template`처럼 전체 URL을 함께 적어 주세요.

## 전체 흐름

1. Apps in Toss 콘솔에서 앱을 만든다.
2. Codex에게 `toss.launch.config.ts`와 `src/app.content.ts` 수정을 요청한다.
3. 권한이나 외부 API가 필요하면 Codex에게 `toss.features.config.ts` 수정도 요청한다.
4. Codex가 PR을 만들면 GitHub Actions에서 `build-ait`를 수동 실행해 결과를 확인한다.
5. GitHub Secrets에 `AIT_API_KEY`를 등록한다.
6. `deploy-ait` workflow를 수동 실행해 업로드한다.

## 사용자가 준비해야 하는 값

| 값 | 어디에 쓰이나요? | secret인가요? |
| --- | --- | --- |
| Apps in Toss `appName` | `toss.launch.config.ts` | 아니요 |
| 표시 이름 | `toss.launch.config.ts` | 아니요 |
| 아이콘 URL | `toss.launch.config.ts` | 아니요 |
| 브랜드 색상 | `toss.launch.config.ts` | 아니요 |
| 화면 문구 | `src/app.content.ts` | 아니요 |
| AIT API Key | GitHub Actions Secret `AIT_API_KEY` | 예 |
| 외부 API 토큰 | `.env.local` 또는 GitHub Secrets | 예 |

## Codex에게 요청하는 예시

```text
Apps in Toss 콘솔에서 appName은 my-mini-app, 표시 이름은 오늘의 혜택, 브랜드 색상은 #3182F6이야.
README 기준으로 사용자가 직접 수정해야 하는 파일만 바꿔서 출시용 PR을 만들어줘.
화면 문구는 "토스에서 혜택을 확인하세요"를 메인 제목으로 해줘.
실제 secret은 코드에 넣지 마.
```

권한이 필요한 경우에는 이렇게 추가로 요청하세요.

```text
클립보드 쓰기 권한만 켜줘. 다른 권한과 외부 API는 기본값 그대로 꺼둬.
```

## 기존 외부 배포와 AIT 분리

기존 운영 앱에 붙일 때는 Cloudflare Pages, Vercel, Firebase, Netlify의 build command, output directory, deploy command를 AIT 기준으로 바꾸지 마세요. AIT artifact 생성과 배포는 GitHub Actions의 `build-ait`, `deploy-ait` 수동 workflow에서만 실행하세요. 자세한 내용은 `docs/ci-notes.md`를 확인하세요.

## GitHub Actions에서 확인할 것

### build-ait

`build-ait`는 기본적으로 수동 실행 전용입니다. 기존 Cloudflare/Vercel/Firebase/Netlify 같은 외부 웹 배포와 AIT artifact 생성을 섞지 않기 위해 PR, `main` push, tag push에는 자동 연결하지 않는 것을 권장합니다. 초기 템플릿에는 lockfile이 없으므로 npm cache 없이 `npm install`로 의존성을 설치합니다. 다음 단계가 모두 성공해야 합니다.

1. Node.js 20 설정
2. `npm install`
3. `npm run build`
4. `npx ait build`
5. artifact 업로드

### deploy-ait

배포 전 GitHub 저장소에 `AIT_API_KEY` Secret을 등록해야 합니다.

1. GitHub 저장소의 **Settings**로 이동
2. **Secrets and variables** → **Actions** 선택
3. **New repository secret** 클릭
4. 이름은 `AIT_API_KEY`로 입력
5. 값에는 Apps in Toss 배포 API 키 입력
6. **Actions** → `deploy-ait` → **Run workflow** 실행

## 출시 전 체크리스트

- [ ] `toss.launch.config.ts`의 `appName`이 Apps in Toss 콘솔 값과 같다.
- [ ] `toss.launch.config.ts`의 `displayName`, `primaryColor`, `iconUrl`이 출시용 값이다.
- [ ] `src/app.content.ts`의 문구와 링크가 서비스에 맞다.
- [ ] `toss.features.config.ts`에서 필요한 권한만 켰다.
- [ ] 코드에 API 키, 토큰, 비밀번호 같은 secret이 없다.
- [ ] GitHub Actions의 `build-ait`가 수동 실행 전용이고 성공했다.
- [ ] GitHub Secrets에 `AIT_API_KEY`가 등록되어 있다.
- [ ] `deploy-ait` workflow가 수동 실행 전용이고 성공했다.

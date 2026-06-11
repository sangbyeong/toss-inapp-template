# Codex만으로 Apps in Toss 출시하기

이 문서는 로컬 개발 환경 없이 **GitHub + Codex + GitHub Actions**만으로 템플릿을 수정하고 Apps in Toss에 업로드하는 흐름을 설명합니다.

## 전체 흐름

1. Apps in Toss 콘솔에서 앱을 만든다.
2. Codex에게 `toss.launch.config.ts`와 `src/app.content.ts` 수정을 요청한다.
3. 권한이나 외부 API가 필요하면 Codex에게 `toss.features.config.ts` 수정도 요청한다.
4. Codex가 PR을 만들면 GitHub Actions의 `build-ait` 결과를 확인한다.
5. GitHub Secrets에 `AIT_API_KEY`를 등록한다.
6. `deploy-ait` workflow를 수동 실행하거나 `v*` 태그를 push해 업로드한다.

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

## GitHub Actions에서 확인할 것

### build-ait

PR 또는 `main` 브랜치 push 후 자동 실행됩니다. 초기 템플릿에는 lockfile이 없으므로 npm cache 없이 `npm install`로 의존성을 설치합니다. 다음 단계가 모두 성공해야 합니다.

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
- [ ] GitHub Actions의 `build-ait`가 성공했다.
- [ ] GitHub Secrets에 `AIT_API_KEY`가 등록되어 있다.
- [ ] `deploy-ait` workflow가 성공했다.

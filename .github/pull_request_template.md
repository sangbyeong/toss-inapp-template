## 출시/수정 요약

- 

## 사용자가 확인해야 하는 파일

- [ ] `toss.launch.config.ts` 앱 정보가 Apps in Toss 콘솔과 일치합니다.
- [ ] `src/app.content.ts` 화면 문구와 링크가 서비스 내용과 일치합니다.
- [ ] 필요한 경우에만 `toss.features.config.ts` 권한/API 기능을 켰습니다.

## 기존 레포에 붙이는 경우

- [ ] 작업자가 이 레포에 PR을 만들 수 있는 collaborator/멤버 권한을 가지고 있습니다.
- [ ] 템플릿 출처를 레포 이름만이 아니라 전체 URL로 확인했습니다.
- [ ] 기존 앱 화면과 기능 파일을 통째로 삭제하지 않았습니다.
- [ ] 기존 Cloudflare/Vercel/Firebase/Netlify 배포 설정을 AIT 기준으로 바꾸지 않았습니다.
- [ ] `build-ait`와 `deploy-ait`는 `workflow_dispatch` 수동 실행 전용입니다.
- [ ] `package.json`, `src/`, `vite.config.ts`, `tsconfig.*`, `.github/workflows/`는 덮어쓰지 않고 필요한 부분만 병합했습니다.
- [ ] 충돌 위험이 있는 파일을 바꿨다면 PR 설명에 이유를 적었습니다.

## secret 확인

- [ ] 코드와 README/문서에 실제 API 키, 토큰, 비밀번호를 넣지 않았습니다.
- [ ] `@apps-in-toss/cli`를 `package.json`에 추가하지 않았고, CLI는 `npx ait ...`로만 실행합니다.
- [ ] 배포가 필요하면 GitHub Secrets에 `AIT_API_KEY`를 등록했습니다.

## 출시 체크

- [ ] GitHub Actions `build-ait`를 수동 실행했고 성공했습니다.
- [ ] 배포할 준비가 되었으면 `deploy-ait` workflow를 수동 실행합니다.

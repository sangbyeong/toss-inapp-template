## 출시/수정 요약

- 

## 사용자가 확인해야 하는 파일

- [ ] `toss.launch.config.ts` 앱 정보가 Apps in Toss 콘솔과 일치합니다.
- [ ] `src/app.content.ts` 화면 문구와 링크가 서비스 내용과 일치합니다.
- [ ] 필요한 경우에만 `toss.features.config.ts` 권한/API 기능을 켰습니다.

## secret 확인

- [ ] 코드와 README/문서에 실제 API 키, 토큰, 비밀번호를 넣지 않았습니다.
- [ ] 배포가 필요하면 GitHub Secrets에 `AIT_API_KEY`를 등록했습니다.

## 출시 체크

- [ ] GitHub Actions `build-ait`가 성공했습니다.
- [ ] 배포할 준비가 되었으면 `deploy-ait` workflow를 실행합니다.

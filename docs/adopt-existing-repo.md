# 이미 개발 중인 레포에 붙이는 방법

이 문서는 개발자가 아닌 사용자가 기존 React/Vite 레포에 `toss-inapp-template`를 붙일 때 따라야 하는 절차입니다.

핵심은 **직접 파일을 덮어쓰지 않는 것**입니다. 기존 레포에는 이미 `package.json`, `src`, `vite.config.ts`, `.github/workflows`가 있을 수 있으므로 Codex에게 안전하게 병합하도록 요청하세요.

## 가장 안전한 흐름

1. 기존 레포에서 새 브랜치를 만든다.
2. Codex에게 아래 프롬프트를 그대로 붙여 넣는다.
3. Codex가 만든 PR에서 변경 파일을 확인한다.
4. GitHub Actions `build-ait`가 성공하는지 확인한다.
5. 문제가 없으면 merge한다.
6. 배포할 때만 GitHub Secrets에 `AIT_API_KEY`를 등록하고 `deploy-ait`를 실행한다.

## Codex에게 붙여 넣을 프롬프트

```text
현재 레포는 이미 개발 중인 앱이야.
toss-inapp-template를 이 레포에 붙여서 Apps in Toss WebView로 빌드/배포할 수 있게 해줘.

중요한 조건:
- 기존 앱 화면과 기존 기능은 지워지면 안 돼.
- package.json, src/, vite.config.ts, tsconfig.*, .github/workflows/는 덮어쓰지 말고 필요한 설정만 병합해줘.
- 사용자가 직접 수정해야 하는 기본 파일은 toss.launch.config.ts와 src/app.content.ts로 유지해줘.
- 권한/API는 toss.features.config.ts에서만 선택적으로 켜게 해줘.
- 실제 secret은 코드에 넣지 말고 .env.local 또는 GitHub Secrets만 쓰게 해줘.
- Cloudflare, Supabase, Firebase는 기본 추가하지 마.
- Apps in Toss 관련 구현은 AX MCP가 가능하면 공식 문서와 예제를 먼저 확인해줘.
- 변경 후 build-ait workflow가 npm install, npm run build, npx ait build를 실행하게 해줘.
- deploy-ait workflow는 npx ait deploy --api-key ${{ secrets.AIT_API_KEY }} 방식으로 배포하게 해줘.
- 충돌 위험이 있는 파일은 왜 바꿨는지 PR 설명에 적어줘.
```

## Codex가 추가하거나 병합해야 하는 것

### 새로 추가해도 되는 파일

대부분의 기존 레포에는 아래 파일이 없으므로 새로 추가해도 됩니다.

```text
toss.launch.config.ts
toss.features.config.ts
granite.config.ts
.github/workflows/build-ait.yml
.github/workflows/deploy-ait.yml
docs/codex-release-guide.md
docs/adopt-existing-repo.md
.env.example
```

### 조심해서 병합해야 하는 파일

아래 파일은 기존 레포에 이미 있을 가능성이 높습니다. Codex가 내용을 비교해서 병합해야 합니다.

```text
package.json
src/
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
.github/workflows/
README.md
.gitignore
```

## PR에서 확인할 것

개발자가 아니어도 아래만 확인하면 됩니다.

- [ ] 기존 화면이나 기존 기능 파일이 통째로 삭제되지 않았다.
- [ ] `toss.launch.config.ts`가 생겼고 앱 이름/색상/아이콘을 넣을 수 있다.
- [ ] `src/app.content.ts`가 생겼거나 기존 화면 구조에 맞게 문구 설정 파일이 연결되었다.
- [ ] `toss.features.config.ts`가 생겼고 권한/API가 기본 꺼짐 상태다.
- [ ] `.github/workflows/build-ait.yml`이 있다.
- [ ] `.github/workflows/deploy-ait.yml`이 있다.
- [ ] 코드에 API 키, 토큰, 비밀번호가 들어가지 않았다.
- [ ] PR의 GitHub Actions `build-ait`가 성공했다.

## 실패했을 때 Codex에게 다시 요청하는 말

```text
build-ait가 실패했어. 기존 앱 기능은 유지하면서 실패 로그 기준으로 수정해줘.
파일을 통째로 덮어쓰지 말고 필요한 부분만 고쳐줘.
```

충돌이 난 경우에는 이렇게 요청하세요.

```text
main 최신 상태와 충돌이 나. 최신 main 기준으로 다시 정리해서 conflict 없는 PR로 만들어줘.
기존 앱 화면과 기능은 유지해줘.
```

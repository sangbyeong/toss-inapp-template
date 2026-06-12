# 이미 개발 중인 레포에 붙이는 방법

이 문서는 개발자가 아닌 사용자가 기존 React/Vite 레포에 `toss-inapp-template`를 붙일 때 따라야 하는 절차입니다.

핵심은 **직접 파일을 덮어쓰지 않는 것**입니다. 기존 레포에는 이미 `package.json`, `src`, `vite.config.ts`, `.github/workflows`가 있을 수 있으므로 Codex에게 안전하게 병합하도록 요청하세요.

## 누가 할 수 있나요?

기존 레포에 붙이려면 아래 조건이 필요합니다.

- GitHub 계정이 있다.
- 기존 앱 레포를 볼 수 있다.
- 기존 앱 레포에 브랜치를 만들고 PR을 올릴 권한이 있다.
  - 개인 레포라면 보통 레포 소유자면 됩니다.
  - 조직/회사/다른 사람 레포라면 보통 collaborator 또는 조직 멤버로 초대되어야 합니다.
  - private 레포라면 권한이 없는 사람은 Codex가 파일을 읽거나 PR을 만들 수 없습니다.
- Codex 또는 GitHub Actions가 그 레포에 접근할 수 있도록 GitHub에서 권한을 허용해야 합니다.

즉, **기존 private 레포에 붙이는 작업은 보통 collaborator로 등록된 사람만 가능합니다.** collaborator가 아닌 사람은 자기 계정에 새 레포를 만들거나, 권한 있는 사람에게 PR 작업을 요청해야 합니다.

## 이 레포 이름만 프롬프트에 넣으면 되나요?

가능하면 이름만 쓰지 말고 **GitHub URL을 같이 적어 주세요.**

좋은 예시는 아래처럼 전체 URL을 넣는 것입니다.

```text
템플릿 레포는 https://github.com/sangbyeong/toss-inapp-template 이야.
이 템플릿 구조를 현재 레포에 안전하게 병합해줘.
```

이유는 간단합니다.

- `toss-inapp-template`라는 이름만 있으면 Codex가 어느 소유자의 레포인지 헷갈릴 수 있습니다.
- private 레포라면 Codex가 접근 권한을 받지 못했을 수 있습니다.
- public 레포라도 URL이 있으면 잘못된 레포를 참고할 가능성이 줄어듭니다.

## 가장 안전한 흐름

1. 기존 앱 레포를 GitHub에서 연다.
2. 새 브랜치를 만든다. 예: `add-apps-in-toss-template`
3. Codex에게 아래 프롬프트를 그대로 붙여 넣는다.
4. Codex가 만든 PR에서 변경 파일을 확인한다.
5. GitHub Actions `build-ait`가 성공하는지 확인한다.
6. 문제가 없으면 merge한다.
7. 배포할 때만 GitHub Secrets에 `AIT_API_KEY`를 등록하고 `deploy-ait`를 실행한다.

## Codex에게 붙여 넣을 프롬프트

아래에서 `<...>` 부분만 실제 값으로 바꿔서 붙여 넣으세요.

```text
현재 레포는 이미 개발 중인 앱이야.
템플릿 레포는 https://github.com/sangbyeong/toss-inapp-template 이야.
이 템플릿을 현재 레포에 붙여서 Apps in Toss WebView로 빌드/배포할 수 있게 해줘.

내 앱 정보:
- Apps in Toss appName: <앱인토스 콘솔의 appName>
- 표시 이름: <사용자에게 보일 앱 이름>
- 브랜드 색상: <예: #3182F6>
- 아이콘 URL: <앱 아이콘 URL>
- 앱 종류: <일반 서비스면 partner, 게임이면 game>

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

## AIT_API_KEY는 어디서 발급받나요?

Apps in Toss 자동 업로드에는 `AIT_API_KEY`가 필요합니다. 이 값은 코드에 넣지 말고 GitHub Secrets에 넣어야 합니다.

### 1. 앱인토스 콘솔에서 API 키 발급

앱인토스 공식 문서 기준으로 API 키는 다음 경로에서 발급합니다. 자세한 내용은 앱인토스 개발자센터의 토스앱 테스트 문서를 확인하세요: https://developers-apps-in-toss.toss.im/development/test/toss.html

1. 앱인토스 콘솔에 로그인한다.
2. 워크스페이스를 선택한다.
3. 좌측 메뉴에서 **키**를 연다.
4. API 키를 발급한다.
5. 필요하면 전체 앱 또는 특정 앱 단위로 접근 권한을 설정한다.

### 2. GitHub에 Secret으로 저장

기존 앱 레포에서 다음 순서로 등록합니다.

1. GitHub에서 기존 앱 레포를 연다.
2. 상단 또는 우측의 **Settings**로 들어간다.
3. 왼쪽 메뉴에서 **Secrets and variables**를 연다.
4. **Actions**를 선택한다.
5. **New repository secret**을 누른다.
6. Name에 `AIT_API_KEY`를 입력한다.
7. Secret 값에 앱인토스 콘솔에서 발급받은 API 키를 붙여 넣는다.
8. 저장한다.

이후 `deploy-ait` workflow가 아래 명령으로 API 키를 사용합니다.

```bash
npx ait deploy --api-key ${{ secrets.AIT_API_KEY }}
```

## 기존 레포에 템플릿을 실제로 어떻게 가져오나요?

비개발자는 직접 다운로드해서 복사하지 않는 것을 권장합니다. 대신 Codex에게 다음처럼 시키면 됩니다.

1. 현재 기존 앱 레포에서 Codex를 연다.
2. 위의 프롬프트를 붙여 넣는다.
3. Codex가 템플릿 레포 URL을 참고해 필요한 파일과 설정을 현재 레포에 병합한다.
4. Codex가 PR을 만들면 변경 파일 목록을 확인한다.
5. `build-ait`가 성공하면 merge한다.

만약 Codex가 템플릿 레포를 못 찾는다고 하면, 프롬프트에 템플릿 URL을 다시 적고 이렇게 요청하세요.

```text
템플릿 레포 URL은 https://github.com/sangbyeong/toss-inapp-template 이야.
접근이 안 되면 어떤 파일이 필요한지 목록을 알려줘.
기존 레포 파일은 덮어쓰지 말고 필요한 설정만 병합해줘.
```

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

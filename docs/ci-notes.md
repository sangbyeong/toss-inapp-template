# CI/CD와 외부 배포 분리 원칙

기존 운영 중인 웹앱에 Apps in Toss(AIT)를 붙일 때 가장 중요한 원칙은 **기존 웹 배포와 AIT 배포를 섞지 않는 것**입니다.

## 핵심 원칙

- Cloudflare Pages, Vercel, Firebase Hosting, Netlify 등 기존 웹 배포 설정은 그대로 둡니다.
- 기존 서비스의 build command, output directory, deploy command를 AIT 기준으로 바꾸지 않습니다.
- AIT artifact 생성은 GitHub Actions의 `build-ait` 또는 `deploy-ait`에서만 수행합니다.
- 기본 권장값은 `build-ait`, `deploy-ait` 모두 `workflow_dispatch` 수동 실행 전용입니다.
- `push`, `pull_request`, tag push에 AIT workflow를 자동 연결하지 않습니다. 자동 연결이 필요하면 프로젝트에서 의도적으로 변경하세요.

## 왜 분리해야 하나요?

기존 웹 배포와 AIT 배포는 목적이 다릅니다.

| 구분 | 기존 웹 배포 | AIT 배포 |
| --- | --- | --- |
| 예시 | Cloudflare/Vercel/Firebase/Netlify | Apps in Toss |
| 목적 | 일반 웹 사용자에게 서비스 제공 | 토스 앱 WebView에 업로드 |
| 산출물 | `dist`, `.vercel/output`, Firebase public 등 | `.ait` artifact |
| 실행 위치 | 기존 hosting provider 또는 기존 workflow | `build-ait`, `deploy-ait` workflow |
| secret | 각 hosting provider secret | `AIT_API_KEY` |

두 배포를 한 workflow에 섞으면 다음 문제가 생길 수 있습니다.

- 기존 웹 배포 output directory가 AIT 산출물 기준으로 바뀜
- Cloudflare/Vercel/Firebase/Netlify 배포 명령이 AIT 명령과 충돌
- PR마다 의도치 않게 AIT artifact가 생성되거나 배포됨
- secret이 잘못된 workflow에 노출됨

## 권장 workflow 트리거

AIT workflow는 기본적으로 수동 실행만 권장합니다.

```yaml
on:
  workflow_dispatch:
```

이 템플릿의 `build-ait.yml`, `deploy-ait.yml`도 이 기준을 따릅니다.

## `AIT_API_KEY` secret 확인

`deploy-ait`는 GitHub Secrets에 `AIT_API_KEY`가 등록되어 있어야 합니다.

secret이 없으면 CLI의 `Not enough arguments to option --api-key` 같은 모호한 오류가 나오기 전에 workflow에서 먼저 아래 메시지로 실패하게 하는 것을 권장합니다.

```text
AIT_API_KEY is required
```

예시:

```yaml
- name: Check AIT API key
  env:
    AIT_API_KEY: ${{ secrets.AIT_API_KEY }}
  run: |
    if [ -z "$AIT_API_KEY" ]; then
      echo "::error::AIT_API_KEY is required"
      exit 1
    fi
```

## `npx ait build`가 실패할 때 fallback

기본 방식은 계속 `npx ait build`, `npx ait deploy`입니다.

다만 일부 레포/환경에서 아래 오류가 발생할 수 있습니다.

```text
npm error could not determine executable to run
```

이 경우에만 fallback으로 `@apps-in-toss/cli`를 devDependency에 추가하고 wrapper를 둘 수 있습니다. 이 방식은 기본값이 아니라 **Troubleshooting용 fallback**입니다.

### fallback 예시

```bash
npm install -D @apps-in-toss/cli
```

`scripts/ait.mjs`:

```js
#!/usr/bin/env node
import { initialize } from '@apps-in-toss/cli';

await initialize();
```

`package.json` scripts 예시:

```json
{
  "scripts": {
    "build:ait": "node scripts/ait.mjs build",
    "deploy:ait": "node scripts/ait.mjs deploy --api-key $AIT_API_KEY"
  }
}
```

fallback을 적용했다면 PR 설명에 반드시 아래 내용을 남기세요.

- 왜 `npx ait ...`가 실패했는지
- 실제 오류 메시지
- `@apps-in-toss/cli`를 fallback devDependency로 추가했다는 점
- GitHub Actions에서 fallback 방식으로 `build-ait`가 성공했는지

## Cloudflare Pages 기존 앱 주의사항

Cloudflare Pages를 이미 쓰는 앱에 AIT를 붙일 때는 특히 아래를 지키세요.

- Pages Git 연동의 build command를 AIT 명령으로 바꾸지 않습니다.
- Pages Git 연동에 `npx wrangler deploy`를 넣지 않습니다.
- Cloudflare 일반 웹 배포 workflow와 AIT workflow를 합치지 않습니다.
- 앱이 정적 `public` + Pages Functions 구조라면 Cloudflare output directory와 AIT output은 별개로 관리합니다.
- API base URL은 AIT 빌드 시 공개 변수로만 주입합니다. 예: `GADAK_API_BASE_URL`
- API token, service role key, private key 같은 secret은 AIT 클라이언트 번들에 넣지 않습니다.

## Vercel/Firebase/Netlify 기존 앱 주의사항

- 기존 provider의 project setting을 AIT 기준으로 바꾸지 않습니다.
- 기존 provider의 deploy workflow에 `npx ait build`나 `npx ait deploy`를 끼워 넣지 않습니다.
- AIT 배포가 필요할 때만 GitHub Actions에서 `deploy-ait`를 수동 실행합니다.

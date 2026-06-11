# Repository Instructions

- Apps in Toss 관련 구현을 변경할 때는 가능한 경우 AX MCP를 가장 먼저 사용해 공식 문서와 예제를 확인한다.
- AX MCP를 사용할 수 없는 환경에서는 Apps in Toss 개발자센터의 공식 문서를 우선 확인하고, 확인한 근거를 작업 기록에 남긴다.
- 사용자가 직접 수정해야 하는 기본 파일은 `toss.launch.config.ts`와 `src/app.content.ts` 두 개로 유지한다.
- API, 권한, 외부 기능은 `toss.features.config.ts`에서 선택적으로 켠다.
- 실제 secret은 코드에 저장하지 않는다. 로컬에서는 `.env.local`, CI/CD에서는 GitHub Secrets를 사용한다.
- Cloudflare, Supabase, Firebase 관련 기본 의존성이나 설정은 추가하지 않는다.

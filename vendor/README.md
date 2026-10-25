# vendor — 같은 주소에서 불러오는 외부 코드

| 파일 | 출처 | 쓰는 곳 |
|---|---|---|
| `anthropic-sdk-0.131.0.min.js` | npm `@anthropic-ai/sdk@0.131.0`(MIT)과 의존 패키지 `standardwebhooks`·`@stablelib/base64`·`fast-sha256`을 esbuild 로 묶은 브라우저용 ES 모듈 한 파일 | `index.html` 'AI 질문'(사용자 키) — 처음 질문하거나 키를 확인할 때만 받는다 |

왜 여기 두나(2026-10-25 보안 점검): 예전엔 jsDelivr `+esm` 에서 불러왔다. 그 파일은 요청 때 만들어지는 묶음이고 다른 파일을 다시 불러와 무결성(SRI)을
고정할 수 없다 — 사용자의 API 키를 다루는 코드가 CDN 쪽 변경에 그대로 노출됐다. 같은 주소의 고정 파일로 옮겨 그 의존을 없앴다.

다시 만들기(버전을 올릴 때 — `index.html` 의 `AI.SDK_URL` 도 함께 바꾼다):

```
mkdir /tmp/sdk && cd /tmp/sdk && npm init -y && npm i @anthropic-ai/sdk@<버전> esbuild
printf 'export * from "@anthropic-ai/sdk";\nexport { default } from "@anthropic-ai/sdk";\n' > entry.mjs
npx esbuild entry.mjs --bundle --format=esm --platform=browser --target=es2020 --minify --legal-comments=eof --outfile=anthropic-sdk-<버전>.min.js
```

묶은 패키지의 라이선스 고지는 `LICENSES.txt`.

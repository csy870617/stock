// 실시간 시세 백엔드(Cloudflare Worker) 주소 설정.
//
// 1) worker/quotes-worker.js 를 Cloudflare Worker 로 배포한다 (README '실시간 시세 백엔드' 참고).
// 2) 배포되면 받는 주소(예: https://stock-quotes.내계정.workers.dev)를 아래 quotesApi 에 넣는다.
// 3) 커밋·푸시하면 페이지가 그 Worker 로 실시간 시세를 조회한다.
//
// 비워두면("") 실시간 조회를 하지 않고 매일 갱신된 종가(스냅샷)를 표시한다.
window.APP_CONFIG = {
  quotesApi: ""
};

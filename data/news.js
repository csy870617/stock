// 종목별 오늘의 뉴스 한 줄 — scripts/ai-news.js 가 생성(최근 3일 헤드라인 → Claude 가 회사 소식만 골라 요약, 매일 자동).
// items[티커] = {line, date, links[{t 제목, u 주소, s 매체, d 날짜}], h} · none:1 은 회사 고유 소식 없음(앱 미표시).
window.STOCK_NEWS = {
 asOf: null,
 builtAt: null,
 model: null,
 items: {
 }
};

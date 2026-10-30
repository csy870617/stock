// 유동성 판단(온디맨드) — 시장지표 baseline(data/liquidity-auto.js, 매일 자동)을 거시 이벤트·내러티브로 보정/덮어쓰기.
// 앱은 이 파일이 있으면 우선 표시하고 baseline 을 병기, 없으면 baseline 을 게이지로 쓴다.
window.LIQUIDITY_DATA = {
 "asOf": "2026-10-30",
 "headline": "연준의 12월 인상 기대와 한국은행의 인상 쪽 기울기가 이어져 두 나라 모두 유동성 환경을 신중 이하로 봅니다. 다만 미국 금리가 일부 내렸고 한국은 외국인 매도가 잦아든 점이 완충 역할을 하고 있습니다.",
 "headlineUS": "10년물 금리가 4.92%대로 내려왔지만, 12월 인상 확률이 76%로 반영돼 있어 단기는 신중, 중기는 부정으로 봅니다.",
 "headlineKR": "코스피가 20일간 14% 급락했고 1년 금리 인상 기대가 남아 있어 단기는 부정으로 봅니다. 최근 3일 외국인 순매수와 원화 강세 흐름을 반영해 중기는 신중으로 봅니다.",
 "us": {
  "shortTerm": "신중",
  "midTerm": "부정",
  "drivers": [
   "연방기금금리 선물은 12/9 회의에서 25bp 인상 확률을 76%로, 2027년 4월 기대 금리를 4.34%로 반영하고 있어 baseline의 단기 우호보다 한 단계 낮춰 봅니다.",
   "10/28 FOMC는 10대 2로 동결했고, 반대한 2명은 모두 인상을 주장해 긴축 쪽 압력이 확인됐습니다.",
   "10년물 금리는 10/29 4.922%로 9.5bp 내려 9/22 이후 최저를 기록했고, VIX 17.2와 HY 채권 20일 +0.9%로 신용 환경은 안정적입니다.",
   "3분기 GDP 연율 3.4%(예상 3.1%)와 9월 물가 전년 대비 3.6%는 인상 경로를 늦출 근거가 되기 어렵습니다."
  ]
 },
 "korea": {
  "shortTerm": "부정",
  "midTerm": "신중",
  "drivers": [
   "코스피가 20일간 14% 급락해 급락 floor가 발동했고, 20일 모멘텀이 단기 유동성을 누르고 있습니다.",
   "한국은행 기준금리는 3%이며, 시장은 1년 평균 금리를 3.516%로 반영해 약 2.1회 인상분을 기대하고 있습니다. 이 때문에 중기를 baseline의 우호보다 한 단계 낮춰 봅니다.",
   "외국인은 코스피에서 60일간 41조5,381억원을 순매도했지만 최근 3일 연속 순매수(최근일 +6,660억원)로 돌아서 중기 부정에서 신중으로 한 단계 올립니다.",
   "원/달러는 3개월 -6.6%, 올해 -6.8%로 원화 강세 흐름이어서 외국인 수급에 부담을 덜어 줍니다."
  ]
 },
 "nextCheck": "코스피 5,722와 나스닥 25,866 아래로 내려가는지, 12월 FOMC 25bp 인상 확률(현재 76%)이 어떻게 바뀌는지를 확인합니다.",
 "sources": [
  "https://krmg.com/2026/10/29/how-major-us-stock-indexes-fared-thursday-10-29-2026/",
  "https://finance.yahoo.com/markets/live/stock-market-today-thursday-october-29-dow-sp-500-nasdaq-alphabet-microsoft-earnings-130305714.html",
  "https://money.usnews.com/investing/news/articles/2026-10-28/fomc-holds-rates-steady-markets-mostly-follow-suit",
  "https://finance.yahoo.com/economy/policy/live/fed-meeting-live-updates-federal-reserve-october-meeting-kevin-warsh-161129201.html"
 ],
 "policyNews": {
  "asOf": "2026-10-30",
  "us": {
   "stance": "매파",
   "note": "연준은 10/28 기준금리를 3.75~4.00%로 10대 2 동결했고, 리사 쿡 이사와 해맥 클리블랜드 연은 총재는 인상을 주장하며 반대했습니다. 성명은 다음 결정 전에 '추가 정보 축적'이 필요하다고 밝혔고, 워시 의장은 중간선거를 앞둔 정치가 결정에 아무 역할도 하지 않았다고 말했습니다.",
   "sources": [
    "https://money.usnews.com/investing/news/articles/2026-10-28/fomc-holds-rates-steady-markets-mostly-follow-suit",
    "https://finance.yahoo.com/economy/policy/live/fed-meeting-live-updates-federal-reserve-october-meeting-kevin-warsh-161129201.html",
    "https://www.realestatenews.com/2026/10/28/divided-fed-holds-rates-steady-as-investors-bet-on-december-hike",
    "https://hiringlab.indeed.com/2026/10/28/october-2026-fomc-reaction-a-waiting-game/"
   ]
  },
  "korea": {
   "stance": "매파",
   "note": "금통위는 10/22 기준금리를 연 3.00%로 만장일치 동결했고, 신현송 총재는 성장·물가가 8월보다 강한 측면이 있어 긴축 기조를 이어갈 필요가 있다고 말했습니다. 한은은 10/29 시장상황점검회의에서 미국 정책 불확실성에 '각별한 경계감'으로 시장을 점검하겠다고 밝혔습니다.",
   "sources": [
    "https://www.segye.com/newsView/20261022520163",
    "https://www.fnnews.com/news/202610290728345571"
   ]
  }
 }
};

// 관심종목 검색용 사전 생성기 — recommendations.js(검증됨) + 큐레이션 인기종목 병합.
// --verify: 한국 종목 코드를 Yahoo 검색으로 대조 출력(오타 점검용).
const fs = require("fs"), path = require("path");
const ROOT = "/home/user/stock";
global.window = {}; require(path.join(ROOT, "data/recommendations.js"));
const D = global.window.STOCK_DATA || {};

// 1) 추천 편성(검증된 91종목) → 사전
const dict = {};
["korea","us"].forEach(c => (D[c]||[]).forEach(s => { if(s&&s.ticker) dict[c+":"+s.ticker] = {n:s.name, t:s.ticker, c:c}; }));

// 2) 큐레이션 인기 종목(추가). 한국은 Yahoo-by-code 로 검증한다.
const EXTRA = [
  // ── 한국(KOSPI/KOSDAQ) 인기 ──
  ["LG에너지솔루션","373220","korea"],["삼성SDI","006400","korea"],["LG화학","051910","korea"],
  ["NAVER","035420","korea"],["카카오","035720","korea"],["카카오뱅크","323410","korea"],["카카오페이","377300","korea"],
  ["삼성생명","032830","korea"],["메리츠금융지주","138040","korea"],["미래에셋증권","006800","korea"],["삼성증권","016360","korea"],
  ["키움증권","039490","korea"],["NH투자증권","005940","korea"],["한국금융지주","071050","korea"],["기업은행","024110","korea"],
  ["현대해상","001450","korea"],["LG전자","066570","korea"],["삼성전기","009150","korea"],["LG디스플레이","034220","korea"],
  ["SK이노베이션","096770","korea"],["SK텔레콤","017670","korea"],["KT","030200","korea"],["LG유플러스","032640","korea"],
  ["한국전력","015760","korea"],["한국가스공사","036460","korea"],["한화솔루션","009830","korea"],["두산에너빌리티","034020","korea"],
  ["두산","000150","korea"],["두산밥캣","241560","korea"],["HD현대일렉트릭","267260","korea"],["HD현대","267250","korea"],
  ["HMM","011200","korea"],["팬오션","028670","korea"],["대한항공","003490","korea"],["현대글로비스","086280","korea"],
  ["삼성엔지니어링","028050","korea"],["현대건설","000720","korea"],["GS건설","006360","korea"],["DL이앤씨","375500","korea"],
  ["대우건설","047040","korea"],["현대제철","004020","korea"],["포스코인터내셔널","047050","korea"],["롯데케미칼","011170","korea"],
  ["에쓰오일","010950","korea"],["아모레퍼시픽","090430","korea"],["LG생활건강","051900","korea"],["CJ제일제당","097950","korea"],
  ["오리온","271560","korea"],["하이트진로","000080","korea"],["KT&G","033780","korea"],["유한양행","000100","korea"],
  ["한미약품","128940","korea"],["종근당","185750","korea"],["대웅제약","069620","korea"],["SK바이오팜","326030","korea"],
  ["엔씨소프트","036570","korea"],["넷마블","251270","korea"],["하이브","352820","korea"],["에스엠","041510","korea"],
  ["JYP Ent","035900","korea"],["강원랜드","035250","korea"],["호텔신라","008770","korea"],["이마트","139480","korea"],
  ["롯데쇼핑","023530","korea"],["신세계","004170","korea"],["CJ대한통운","000120","korea"],["코웨이","021240","korea"],
  ["GS","078930","korea"],["LG","003550","korea"],["SK","034730","korea"],["삼성물산","028260","korea"],
  ["한국타이어앤테크놀로지","161390","korea"],["현대위아","011210","korea"],["한온시스템","018880","korea"],
  // KOSDAQ
  ["에코프로비엠","247540","korea"],["에코프로","086520","korea"],["알테오젠","196170","korea"],["엔켐","348370","korea"],
  ["HLB","028300","korea"],["리노공업","058470","korea"],["클래시스","214150","korea"],["레인보우로보틱스","277810","korea"],
  ["셀트리온제약","068760","korea"],["펄어비스","263750","korea"],["위메이드","112040","korea"],["루닛","328130","korea"],
  ["이오테크닉스","039030","korea"],["원익IPS","240810","korea"],["동진쎄미켐","005290","korea"],["솔브레인","357780","korea"],
  ["덕산네오룩스","213420","korea"],["HPSP","403870","korea"],["주성엔지니어링","036930","korea"],["대주전자재료","078600","korea"],
  ["하나마이크론","067310","korea"],["JYP","035900","korea"],
  // ── 미국 ──
  ["Apple","AAPL","us"],["Microsoft","MSFT","us"],["NVIDIA","NVDA","us"],["Amazon","AMZN","us"],["Alphabet (Google)","GOOGL","us"],
  ["Meta (Facebook)","META","us"],["Tesla","TSLA","us"],["Broadcom","AVGO","us"],["Berkshire Hathaway","BRK.B","us"],
  ["Eli Lilly","LLY","us"],["JPMorgan Chase","JPM","us"],["Visa","V","us"],["Mastercard","MA","us"],["UnitedHealth","UNH","us"],
  ["Exxon Mobil","XOM","us"],["Johnson & Johnson","JNJ","us"],["Walmart","WMT","us"],["Procter & Gamble","PG","us"],
  ["Home Depot","HD","us"],["Costco","COST","us"],["Coca-Cola","KO","us"],["PepsiCo","PEP","us"],["AMD","AMD","us"],
  ["Netflix","NFLX","us"],["Adobe","ADBE","us"],["Salesforce","CRM","us"],["Oracle","ORCL","us"],["Intel","INTC","us"],
  ["Qualcomm","QCOM","us"],["Cisco","CSCO","us"],["McDonald's","MCD","us"],["Nike","NKE","us"],["Disney","DIS","us"],
  ["Bank of America","BAC","us"],["Pfizer","PFE","us"],["Merck","MRK","us"],["AbbVie","ABBV","us"],["Palantir","PLTR","us"],
  ["Micron","MU","us"],["ASML","ASML","us"],["TSMC","TSM","us"],["Palo Alto Networks","PANW","us"],["ServiceNow","NOW","us"],
  ["Uber","UBER","us"],["Boeing","BA","us"],["Caterpillar","CAT","us"],["Starbucks","SBUX","us"],["PayPal","PYPL","us"],
  ["Shopify","SHOP","us"],["Snowflake","SNOW","us"],["CrowdStrike","CRWD","us"],["Arm","ARM","us"],["Super Micro","SMCI","us"],
  ["GE Aerospace","GE","us"],["Intuitive Surgical","ISRG","us"],["Booking","BKNG","us"],["Advanced Micro Devices","AMD","us"]
];
EXTRA.forEach(([n,t,c]) => { const k=c+":"+t; if(!dict[k]) dict[k]={n,t,c}; });

const list = Object.values(dict);
if (process.argv.includes("--verify")) {
  // 한국 코드만 Yahoo 로 대조
  const kr = list.filter(x=>x.c==="korea");
  (async () => {
    for (const e of kr) {
      let name="?";
      try {
        const r = await fetch("https://query1.finance.yahoo.com/v1/finance/search?q="+e.t+"&quotesCount=3&newsCount=0",{headers:{"User-Agent":"Mozilla/5.0"}});
        const j = await r.json();
        const q = (j.quotes||[]).filter(x=>x.symbol&&(x.symbol.endsWith(".KS")||x.symbol.endsWith(".KQ")));
        const hit = q.find(x=>x.symbol.split(".")[0]===e.t) || q[0];
        name = hit ? hit.symbol+" "+(hit.shortname||hit.longname||"") : "NO-MATCH";
      } catch(_e){ name="ERR"; }
      console.log((name.indexOf(e.t)>=0?"ok ":"?? ")+e.t+" | "+e.n+" | "+name);
    }
  })();
} else {
  fs.writeFileSync(path.join(ROOT,"data/tickers.js"),
    "// 관심종목 검색 사전 — 이름→코드 (추천 편성 + 큐레이션 인기종목). scripts/gen 참고.\n"+
    "window.TICKER_DICT = "+JSON.stringify(list)+";\n");
  console.log("data/tickers.js 생성:", list.length, "종목 (한국 "+list.filter(x=>x.c==="korea").length+" · 미국 "+list.filter(x=>x.c==="us").length+")");
}

// 업종(섹터) 분류 — Top Pick 업종 분산(lib-picks.js)과 그 검증(research/top-pick/test-balance.js)이 같은 표를 쓴다.
//   한국: WICS 산업(와이즈리포트 기업현황 'WICS : 은행' — 네이버 업종 이름과 같다) → WICS 10개 섹터
//   미국: 나스닥 섹터(company-profile·screener 의 Sector — Finance·Technology 등) 그대로
//   모르는 업종은 null — 분산 제한을 걸지 않는다(그 종목 혼자 한 업종으로 본다).
"use strict";

const KR_SECTORS = {
  "에너지": ["석유와가스", "에너지장비및서비스"],
  "소재": ["화학", "철강", "비철금속", "포장재", "건축자재", "종이와목재"],
  "산업재": ["기계", "전기장비", "조선", "건설", "건축제품", "우주항공과국방", "무역회사와판매업체", "상업서비스와공급품", "복합기업",
    "항공사", "해운사", "항공화물운송과물류", "도로와철도운송", "운송인프라", "문구류"],
  "경기관련소비재": ["자동차", "자동차부품", "전자제품", "가정용기기와용품", "가구", "레저용장비와제품", "섬유,의류,신발,호화품", "호텔,레스토랑,레저",
    "다각화된소비자서비스", "교육서비스", "백화점과일반상점", "인터넷과카탈로그소매", "전문소매", "판매업체"],
  "필수소비재": ["식품", "음료", "담배", "화장품", "가정용품", "식품과기본식료품소매"],
  "건강관리": ["제약", "생물공학", "건강관리장비와용품", "건강관리업체및서비스", "건강관리기술", "생명과학도구및서비스"],
  "금융": ["은행", "증권", "손해보험", "생명보험", "카드", "창업투자", "기타금융", "다각화된금융", "부동산"],
  "IT": ["반도체와반도체장비", "전자장비와기기", "전기제품", "디스플레이패널", "디스플레이장비및부품", "통신장비", "핸드셋", "컴퓨터와주변기기",
    "사무용전자제품", "IT서비스", "소프트웨어"],
  "커뮤니케이션서비스": ["무선통신서비스", "다각화된통신서비스", "방송과엔터테인먼트", "게임엔터테인먼트", "양방향미디어와서비스", "광고", "출판"],
  "유틸리티": ["전기유틸리티", "가스유틸리티", "복합유틸리티"],
};
const KR_OF = {};
for (const [sec, inds] of Object.entries(KR_SECTORS)) for (const ind of inds) KR_OF[ind] = sec;

// 한국 WICS 산업 이름 → 섹터(모르면 null)
const krSector = (ind) => (ind && KR_OF[String(ind).trim()]) || null;
// 미국 나스닥 섹터 — 빈 값·'Miscellaneous' 는 분류가 없는 것으로 본다
const usSector = (s) => { const v = s && String(s).trim(); return v && v !== "Miscellaneous" ? v : null; };
const sectorOf = (country, raw) => (country === "korea" || country === "kr" ? krSector(raw) : usSector(raw));

// 한국어 표시 이름(앱·로그) — 미국 나스닥 섹터
const US_KO = { "Finance": "금융", "Technology": "기술", "Health Care": "헬스케어", "Industrials": "산업재", "Consumer Discretionary": "경기소비재",
  "Consumer Staples": "필수소비재", "Energy": "에너지", "Utilities": "유틸리티", "Real Estate": "부동산", "Telecommunications": "통신",
  "Basic Materials": "소재" };
const sectorKo = (country, sec) => (!sec ? null : country === "korea" || country === "kr" ? sec : US_KO[sec] || sec);

module.exports = { KR_SECTORS, krSector, usSector, sectorOf, sectorKo };

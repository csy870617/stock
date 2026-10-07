// '대세 상승 후 추세 훼손' 조건 검증(2026-10-07, 일회성 연구 스크립트 — 결과·결정은 docs/HISTORY.md)
// 입력: px10.json(편성 이력 180종목 + ^KS11·^GSPC 10년 수정종가, 세션 scratchpad 에서 생성) — 저장소에 두지 않는다.
// 사전 기준: 해당 종목의 63·126일 지수 초과수익이 비해당보다 낮고, 전반·후반 모두 같은 부호, 전체 t ≤ -2(겹침 할인).
const D=require("./px10.json");const BENCH={korea:"^KS11",us:"^GSPC"};
const S={};for(const t in D.c){const a=D.px[t];const m=new Map();a.forEach(([d],i)=>m.set(d,i));S[t]={c:D.c[t],d:a.map(x=>x[0]),p:a.map(x=>x[1]),m}}
function sma(p,i,n){if(i<n-1)return null;let s=0;for(let k=i-n+1;k<=i;k++)s+=p[k];return s/n}
// 사전 계산: 각 종목·인덱스별 조건
function cond(s,i){const p=s.p;if(i<504)return null;let hi=-1,hiI=-1;for(let k=i-251;k<=i;k++)if(p[k]>hi){hi=p[k];hiI=k}
 const dd=p[i]/hi-1;const s50=sma(p,i,50),s200=sma(p,i,200);const dead=s50<s200;
 let lo=Infinity;for(let k=hiI-252;k<hiI;k++)lo=Math.min(lo,p[k]);const runup=hi/lo;
 const A=dd<=-0.30&&dead&&p[i]<s50;return {A,B:A&&runup>=1.8,C:dd<=-0.20&&dead,dd,runup,hi,hiI}}
const H=[63,126],res={};
for(const c of ["korea","us"]){const B=D.px[BENCH[c]];const bd=B.map(x=>x[0]),bm=new Map(bd.map((d,i)=>[d,i]));
 const evals=bd.filter((d,i)=>i>=504&&(bd.length-1-i)%5===0&&i+126<bd.length);const mid=evals[evals.length>>1];
 for(const key of ["A","B","C"])for(const h of H){const k=c+"|"+key+"|"+h;res[k]={all:[],a:[],b:[],nF:0,obsF:[],obsN:[]}}
 for(const d of evals){const bi=bm.get(d);const rows=[];
  for(const t in S){const s=S[t];if(s.c!==c)continue;const i=s.m.get(d);if(i==null)continue;const cd=cond(s,i);if(!cd)continue;
   const ex={};for(const h of H){const j=s.m.get(bd[bi+h]);if(j==null){ex[h]=null;continue}ex[h]=s.p[j]/s.p[i]-1-(B[bi+h][1]/B[bi][1]-1)}rows.push({cd,ex})}
  for(const key of ["A","B","C"])for(const h of H){const f=rows.filter(r=>r.cd[key]&&r.ex[h]!=null).map(r=>r.ex[h]),n=rows.filter(r=>!r.cd[key]&&r.ex[h]!=null).map(r=>r.ex[h]);
   const R=res[c+"|"+key+"|"+h];R.nF+=f.length;R.obsF.push(...f);R.obsN.push(...n);if(f.length<1||n.length<5)continue;
   const sp=f.reduce((a,b)=>a+b)/f.length-n.reduce((a,b)=>a+b)/n.length;R.all.push(sp);(d<mid?R.a:R.b).push(sp)}}
 res[c+"|split"]=mid}
const m=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:NaN;const med=a=>{const b=a.slice().sort((x,y)=>x-y);return b[b.length>>1]};
const tt=(a,h)=>{const mu=m(a),sd=Math.sqrt(a.reduce((x,y)=>x+(y-mu)**2,0)/(a.length-1));return mu/(sd/Math.sqrt(a.length))/Math.sqrt(h/5)};
for(const c of ["korea","us"]){console.log(`\n== ${c} (전반/후반 분할 ${res[c+"|split"]})`);
 for(const key of ["A","B","C"])for(const h of H){const R=res[c+"|"+key+"|"+h];
  console.log(`${key} ${String(h).padStart(3)}일 | 해당일수 ${String(R.all.length).padStart(3)} 관측 ${String(R.nF).padStart(4)} | 초과수익 차(해당-비해당) 전체 ${(m(R.all)*100).toFixed(2).padStart(6)}%p t ${tt(R.all,h).toFixed(2).padStart(5)} | 전반 ${(m(R.a)*100).toFixed(2).padStart(6)} (${R.a.length}) 후반 ${(m(R.b)*100).toFixed(2).padStart(6)} (${R.b.length}) | 해당 중앙값 ${(med(R.obsF)*100).toFixed(1)}% 비해당 ${(med(R.obsN)*100).toFixed(1)}%`)}}
// 회복률(B): 조건 첫 발생 후 252일 내 직전 1년 고점 회복 비율 (종목별 에피소드, 60일 쿨다운)
let ep=0,rec=0,list=[];for(const t in S){const s=S[t];let last=-999;for(let i=504;i<s.p.length-252;i++){if(i-last<120)continue;const cd=cond(s,i);if(!cd||!cd.B)continue;last=i;ep++;let ok=false;for(let k=i;k<=i+252;k++)if(s.p[k]>=cd.hi){ok=true;break}if(ok)rec++;list.push(t)}}
console.log(`\nB 에피소드 ${ep}건 중 1년 내 직전 고점 회복 ${rec}건 (${(rec/ep*100).toFixed(0)}%) · 종목 ${new Set(list).size}개`);

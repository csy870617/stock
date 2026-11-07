// Measure-1 metrics for all four variants on the common coverage (days where Z10F/Z10L are defined) + per-country,
// switch-back lists for Z10F/Z10L, ticker counts with repaints.
"use strict";
const fs=require("fs"), path=require("path");
const R=JSON.parse(fs.readFileSync(path.join(__dirname,"out","replay.json"),"utf8"));
// daily row: [date, Z10cls, Z10start, Z10conf, h, ZFcls, ZFconf, ZLcls, ZLconf, ZAconf]
const V={ Z10:(x)=>({cls:x[1],conf:x[3],s:x[2]}), Z10A:(x)=>({cls:x[1],conf:x[9],s:x[2]}), Z10F:(x)=>({cls:x[5],conf:x[6],s:null}), Z10L:(x)=>({cls:x[7],conf:x[8],s:null}) };
const out={}, sbList={Z10F:[],Z10L:[]}, repT={Z10:{conf:new Set(),start:new Set()}};
for (const c of ["all","korea","us"]) out[c]={};
for (const v of Object.keys(V)) for (const c of ["all","korea","us"]) out[c][v]={days:0,trans:0,verdictChanges:0,switchBacks10:0,confRepaints:0,startRepaints:0,agree:0};
for (const [tk,r] of Object.entries(R.results)) {
  const rows=r.daily.filter(x=>x[5]!=null);   // common coverage
  for (const [v,f] of Object.entries(V)) {
    const S=rows.map(f), chg=[];
    const o=[out.all[v], out[r.c][v]];
    for (let i=0;i<S.length;i++){
      o.forEach(q=>{q.days++; if(S[i].cls===rows[i][1]) q.agree++;});
      if(!i) continue;
      o.forEach(q=>q.trans++);
      const p=S[i-1], c=S[i];
      if(p.cls!==c.cls){ o.forEach(q=>q.verdictChanges++); chg.push(i); }
      else { if(p.conf!==c.conf){ o.forEach(q=>q.confRepaints++); if(v==="Z10") repT.Z10.conf.add(tk);} if(p.s!==c.s){ o.forEach(q=>q.startRepaints++); if(v==="Z10") repT.Z10.start.add(tk);} }
    }
    for (const i of chg){ const A=S[i-1].cls; for(let j=i+1;j<=Math.min(S.length-1,i+10);j++){ if(S[j].cls!==S[j-1].cls){ if(S[j].cls===A){ o.forEach(q=>q.switchBacks10++); if(sbList[v]) sbList[v].push(tk+" "+rows[i][0]+"→"+rows[j][0]+" "+A+"→"+S[i].cls+"→"+A); } break; } } }
  }
}
for (const c of ["all","korea","us"]) { console.log("--",c,"(common coverage: days where Z10F/Z10L defined)"); for (const [v,q] of Object.entries(out[c])) console.log("  ",v.padEnd(5),JSON.stringify(Object.assign({},q,{agreePct:(100*q.agree/q.days).toFixed(2)}))); }
console.log("Z10F switch-backs:",sbList.Z10F); console.log("Z10L switch-backs:",sbList.Z10L);
console.log("tickers with Z10 conf repaints:",repT.Z10.conf.size,"· with start repaints:",repT.Z10.start.size, [...repT.Z10.start].join(","));
fs.writeFileSync(path.join(__dirname,"out","aligned.json"),JSON.stringify({out,sbList},null,1));

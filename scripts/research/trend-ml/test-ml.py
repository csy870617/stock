#!/usr/bin/env python3
# 추세 기계학습 시험(PREREG.md): 기술 지표 29개 → LightGBM, 해마다 다시 학습하는 걸어가며 검증(2019~), 지그재그 판정·모멘텀과 비교
# 사용: python3 scripts/research/trend-ml/test-ml.py <일봉 캐시 폴더(px/*.json)> [--out 결과.json]
import sys, os, json, math, glob
import numpy as np, pandas as pd, lightgbm as lgb

PX = sys.argv[1]
OUT = sys.argv[sys.argv.index("--out") + 1] if "--out" in sys.argv else None
H = 21; STEP = 5; WARM = 260

def zigzag(c, sig):
    n = len(c); d = np.zeros(n); ln = np.zeros(n); fl = np.full(n, np.nan)
    di, ext, st, hi0, lo0 = 0, c[0], 0, c[0], c[0]
    for t in range(1, n):
        p = c[t]; h = sig[t]
        h = 0.2 if not np.isfinite(h) else min(max(10 * h, 0.10), 0.35)
        if di == 0:   # 첫 방향이 정해지기 전: 지금까지 최저에서 h 넘게 오르면 상승, 최고에서 h 넘게 내리면 하락
            hi0, lo0 = max(hi0, p), min(lo0, p)
            if p > lo0 * (1 + h): di, ext, st = 1, p, t
            elif p < hi0 / (1 + h): di, ext, st = -1, p, t
        elif di == 1:
            if p > ext: ext = p
            elif p < ext / (1 + h): di, ext, st = -1, p, t
        else:
            if p < ext: ext = p
            elif p > ext * (1 + h): di, ext, st = 1, p, t
        d[t] = di; ln[t] = t - st
        if di == 1: fl[t] = (p - ext / (1 + h)) / p / h
        elif di == -1: fl[t] = (ext * (1 + h) - p) / p / h
    return d, ln, fl

def feats(j):
    c = pd.Series(j["cl"], dtype=float); hi = pd.Series(j["h"], dtype=float); lo = pd.Series(j["l"], dtype=float); v = pd.Series(j["v"], dtype=float)
    lr = np.log(c).diff()
    f = pd.DataFrame(index=c.index)
    for k in (5, 10, 21, 63, 126, 252): f["r%d" % k] = np.log(c / c.shift(k))
    f["mom12_1"] = np.log(c.shift(21) / c.shift(252))
    for k in (20, 60, 250): f["vol%d" % k] = lr.rolling(k).std()
    f["volratio"] = f["vol20"] / f["vol250"]
    for k in (20, 50, 100, 200):
        ma = c.rolling(k).mean(); f["dma%d" % k] = c / ma - 1
        if k in (20, 50, 200): f["sma%d" % k] = ma / ma.shift(20) - 1
    dd = c.diff(); up = dd.clip(lower=0).ewm(alpha=1/14, adjust=False).mean(); dn = (-dd.clip(upper=0)).ewm(alpha=1/14, adjust=False).mean()
    f["rsi"] = 100 - 100 / (1 + up / dn)
    ll = lo.rolling(14).min(); hh = hi.rolling(14).max(); f["stoch"] = (c - ll) / (hh - ll)
    macd = c.ewm(span=12, adjust=False).mean() - c.ewm(span=26, adjust=False).mean()
    f["macdh"] = (macd - macd.ewm(span=9, adjust=False).mean()) / c
    m20 = c.rolling(20).mean(); s20 = c.rolling(20).std(); f["bbp"] = (c - (m20 - 2 * s20)) / (4 * s20)
    tr = pd.concat([hi - lo, (hi - c.shift()).abs(), (lo - c.shift()).abs()], axis=1).max(axis=1)
    pdm = (hi.diff()).where((hi.diff() > -lo.diff()) & (hi.diff() > 0), 0.0); ndm = (-lo.diff()).where((-lo.diff() > hi.diff()) & (-lo.diff() > 0), 0.0)
    atr = tr.ewm(alpha=1/14, adjust=False).mean(); pdi = 100 * pdm.ewm(alpha=1/14, adjust=False).mean() / atr; ndi = 100 * ndm.ewm(alpha=1/14, adjust=False).mean() / atr
    f["adx"] = (100 * (pdi - ndi).abs() / (pdi + ndi)).ewm(alpha=1/14, adjust=False).mean()
    f["pos52h"] = c / c.rolling(252).max() - 1; f["pos52l"] = c / c.rolling(252).min() - 1
    f["ddpos"] = c / c.rolling(252).max() - 1 - (c.rolling(252).min() / c.rolling(252).max() - 1)
    f["vr5_20"] = v.rolling(5).mean() / v.rolling(20).mean(); f["vr20_120"] = v.rolling(20).mean() / v.rolling(120).mean()
    f["upratio"] = (lr > 0).rolling(20).mean(); f["skew60"] = lr.rolling(60).skew()
    sig = lr.rolling(500, min_periods=120).std().values
    zd, zl, zf = zigzag(c.values, sig)
    f["zz_dir"] = zd; f["zz_len"] = zl; f["zz_flip"] = zf
    f["y"] = np.log(c.shift(-H) / c)
    f["d"] = j["d"]
    return f

rows = []
files = sorted(glob.glob(os.path.join(PX, "*.json")))
cal = {}
data = []
for fp in files:
    j = json.load(open(fp))
    if j.get("bench") or not j.get("cl") or len(j["cl"]) < WARM + H + 10: continue
    data.append(j)
    k = j["c"]
    if k not in cal or len(j["d"]) > len(cal[k]): cal[k] = j["d"]
evald = {k: set(v[WARM::STEP]) for k, v in cal.items()}
for j in data:
    f = feats(j)
    f = f.iloc[WARM:]
    f = f[f["d"].isin(evald[j["c"]])].copy()
    f["t"] = j["s"]; f["c"] = j["c"]
    rows.append(f)
D = pd.concat(rows, ignore_index=True)
FEAT = [x for x in D.columns if x not in ("y", "d", "t", "c")]
D = D.replace([np.inf, -np.inf], np.nan)
# 그날·그 나라 안 백분위(시장 전체 등락 제거), 목표 = 시장 대비 수익
for x in FEAT:
    if x == "zz_dir": continue
    D[x] = D.groupby(["c", "d"])[x].rank(pct=True)
D["ex"] = D["y"] - D.groupby(["c", "d"])["y"].transform("mean")
D["isk"] = (D["c"] == "korea").astype(int)
FX = FEAT + ["isk"]
D["yr"] = D["d"].str[:4].astype(int)
D["end"] = pd.to_datetime(D["d"]) + pd.Timedelta(days=35)   # 21거래일 ≈ 31일 + 여유: 결과가 끝나는 날
print("표본", len(D), "종목", D["t"].nunique(), "기간", D["d"].min(), "~", D["d"].max(), file=sys.stderr)

pred = []
for yr in range(2019, int(D["yr"].max()) + 1):
    cut = pd.Timestamp("%d-01-01" % yr)
    tr = D[(D["end"] < cut) & D["y"].notna()]
    te = D[(D["yr"] == yr) & D["y"].notna()].copy()
    if not len(te): continue
    m = lgb.LGBMRegressor(num_leaves=31, learning_rate=0.03, n_estimators=400, subsample=0.7, subsample_freq=1, colsample_bytree=0.7, min_child_samples=500, verbose=-1, random_state=1)
    m.fit(tr[FX], tr["ex"])
    te["p"] = m.predict(te[FX]); pred.append(te)
    imp = sorted(zip(m.feature_importances_, FX), reverse=True)[:8]
    print(yr, "학습", len(tr), "평가", len(te), "중요", [x[1] for x in imp], file=sys.stderr)
P = pd.concat(pred, ignore_index=True)
P["b1"] = P["zz_dir"]; P["b2"] = P["mom12_1"]

def nw(x, lag=4):
    x = np.asarray([v for v in x if np.isfinite(v)]); T = len(x)
    if T < 10: return (float(np.mean(x)) if T else None), None
    m = x.mean(); e = x - m; v = (e @ e) / T
    for k in range(1, lag + 1): v += 2 * (1 - k / (lag + 1)) * (e[k:] @ e[:-k]) / T
    return float(m), float(m / math.sqrt(v / T))

COST = {"korea": 0.003, "us": 0.001}
def ic_series(df, col):
    out = []
    for (c, d), g in df.groupby(["c", "d"]):
        g = g[[col, "ex"]].dropna()
        if len(g) < 30 or g[col].nunique() < 2: continue
        out.append((c, d, g[col].rank().corr(g["ex"].rank())))
    return pd.DataFrame(out, columns=["c", "d", "ic"])
def spread(df, col):
    out = []
    for (c, d), g in df.groupby(["c", "d"]):
        g = g[[col, "y"]].dropna()
        if len(g) < 50: continue
        q = g[col].rank(pct=True)
        out.append((c, d, g.loc[q >= 0.9, "y"].mean() - g.loc[q <= 0.1, "y"].mean() - COST[c]))
    return pd.DataFrame(out, columns=["c", "d", "s"])

res = {}
for col in ("p", "b1", "b2"):
    S = ic_series(P, col); r = {}
    for name, sub in (("all", S), ("korea", S[S.c == "korea"]), ("us", S[S.c == "us"]), ("h1", S[S.d < "2023-01-01"]), ("h2", S[S.d >= "2023-01-01"])):
        sub = sub.groupby("d")["ic"].mean() if name in ("all", "h1", "h2") else sub.set_index("d")["ic"]
        mm, tt = nw(sub.sort_index().values); r[name] = {"ic": round(mm, 4), "t": round(tt, 2) if tt is not None else None}
    if col == "p":
        Sp = spread(P, "p"); r["spread"] = {c: dict(zip(("mean", "t"), [round(v, 4) if v is not None else None for v in nw(Sp[Sp.c == c].sort_values("d")["s"].values)])) for c in ("korea", "us")}
    res[col] = r
A = ic_series(P, "p").merge(ic_series(P, "b1"), on=["c", "d"], suffixes=("", "_b1"))
dm, dt = nw((A.groupby("d")["ic"].mean() - A.groupby("d")["ic_b1"].mean()).sort_index().values)
res["diff_vs_b1"] = {"ic": round(dm, 4), "t": round(dt, 2)}
r = res["p"]
res["pass"] = bool(r["all"]["ic"] > 0 and r["all"]["t"] is not None and r["all"]["t"] >= 2.5 and r["h1"]["ic"] > 0 and r["h2"]["ic"] > 0
                   and r["korea"]["ic"] > 0 and r["us"]["ic"] > 0 and dt >= 2 and all(r["spread"][c]["mean"] > 0 for c in ("korea", "us")))
print(json.dumps(res, ensure_ascii=False, indent=1))
if OUT: json.dump(res, open(OUT, "w"), ensure_ascii=False, indent=1)

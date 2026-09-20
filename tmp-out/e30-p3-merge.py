#!/usr/bin/env python3
# E30-p3: merge part dicts, validate SPECIFIC_PROMPT methodology, emit final JSON
import json, re, sys

BASE = "/home/z/my-project/tmp-out"
merged = {}
for i in range(1, 8):
    ns = {}
    exec(open(f"{BASE}/e30-p3-part{i}.py").read(), ns)
    part = ns[f"P{i}"]
    overlap = set(part) & set(merged)
    if overlap:
        print(f"DUPLICATE keys in part{i}: {overlap}")
        sys.exit(1)
    merged.update(part)

data = json.load(open("/tmp/e30-batch-3.json"))
inp_keys = [d["latinName"] for d in data]
missing = [k for k in inp_keys if k not in merged]
extra = [k for k in merged if k not in set(inp_keys)]
print(f"input={len(inp_keys)} merged={len(merged)} missing={len(missing)} extra={len(extra)}")
if missing: print("MISSING:", missing)
if extra: print("EXTRA:", extra)

problems = []
wc_stats = []
for k in inp_keys:
    p = merged.get(k, "")
    wc = len(p.split())
    wc_stats.append((wc, k))
    if not (p.startswith("antique ") or p.startswith("vintage ")):
        problems.append((k, "BAD-OPEN", p[:40]))
    if not p.rstrip().endswith("no text no letters no labels"):
        problems.append((k, "BAD-END", p[-40:]))
    if "ink stippling" not in p:
        problems.append((k, "NO-STIPPLE", ""))
    if "absolutely NO" not in p:
        problems.append((k, "NO-ANCHOR", ""))
    if re.search(r"[\u4e00-\u9fff]", p):
        problems.append((k, "CJK", ""))
    if not (80 <= wc <= 150):
        problems.append((k, f"WC-{wc}", ""))

wc_stats.sort()
print("word-count range:", wc_stats[0], "..", wc_stats[-1])
lo = [x for x in wc_stats if x[0] < 80]
hi = [x for x in wc_stats if x[0] > 150]
print("under 80:", lo)
print("over 150:", hi)
print(f"methodology problems: {len(problems)}")
for k, tag, ctx in problems[:30]:
    print(" -", tag, k, ctx)

if missing or extra or problems:
    print("VALIDATION FAILED, not writing output")
    sys.exit(1)

out = {k: merged[k] for k in inp_keys}  # keep input order
with open("/home/z/my-project/tmp-out/e30-out-batch-3.json", "w") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print("WROTE /home/z/my-project/tmp-out/e30-out-batch-3.json with", len(out), "entries")

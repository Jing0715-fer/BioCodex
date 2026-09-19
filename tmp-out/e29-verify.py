#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""独立校验:结构、字数、事实点保留率(关键词覆盖)"""
import json, re, sys

src = json.load(open('/tmp/e29-batch1.json'))
out = json.load(open('/tmp/e29-out-batch1.json'))

errors = []
warns = []

# 1. 结构
assert set(out.keys()) == {'species', 'higher'}, '顶层结构错误'
if out['higher'] != {}:
    errors.append('higher 应为空')
if set(out['species'].keys()) != set(src.keys()):
    errors.append('species 键集合与源不一致')

nfields = 0
for latin, rec in src.items():
    want = set(rec['fields_to_expand'])
    got = set(out['species'].get(latin, {}).keys())
    if want != got:
        errors.append(f'{latin}: 字段不符 want={sorted(want)} got={sorted(got)}')
    for f in want:
        text = out['species'][latin][f]
        L = len(text)
        nfields += 1
        if f == 'morphology':
            lo, hi = (60, 110) if rec['noimg'] else (25, 45)
        else:
            lo, hi = (25, 50)
        if not (lo <= L <= hi):
            errors.append(f'{latin}.{f}: 长度 {L} 越界 [{lo},{hi}]')
        if text.count('。') < 1:
            errors.append(f'{latin}.{f}: 无句号结尾')
        if not text.endswith('。'):
            errors.append(f'{latin}.{f}: 未以句号结尾')

# 2. 事实点保留率:原文字句拆分,名词性关键词(>=2字连续汉字)是否在新文本中出现
def tokens(s):
    s = re.sub(r'[A-Za-z×]', '', s)
    segs = re.split(r'[^\u4e00-\u9fff0-9]+', s)
    toks = set()
    for seg in segs:
        for n in range(2, min(len(seg), 6) + 1):
            for i in range(0, len(seg) - n + 1):
                toks.add(seg[i:i+n])
    return toks, segs

low = []
for latin, rec in src.items():
    for f in rec['fields_to_expand']:
        old = rec['cur'].get(f, '')
        new = out['species'][latin][f]
        # 逐原句检查:句子中的最长实词组是否出现
        _, oldsegs = tokens(old)
        misses = []
        for seg in oldsegs:
            if len(seg) < 2:
                continue
            # 取该句连续汉字块,检查其 3-gram 至少命中一半
            grams = [seg[i:i+3] for i in range(len(seg) - 2)] or [seg]
            hits = sum(1 for g in grams if g in new)
            if hits < max(1, len(grams) // 2):
                misses.append(seg)
        if misses:
            low.append((latin, f, misses))

print(f'检查物种数: {len(src)} | 输出物种数: {len(out["species"])} | 扩写字段总数: {nfields}')
if errors:
    print('ERRORS:')
    for e in errors: print('  ', e)
else:
    print('字数/结构/结尾校验: 全部通过')
if low:
    print('疑似事实点缺失(需人工复核):')
    for latin, f, misses in low:
        print(f'  {latin}.{f}: 缺 {misses}')
else:
    print('关键词保留校验: 全部通过')
sys.exit(1 if errors else 0)

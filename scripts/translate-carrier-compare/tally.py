"""Tally a lines_vs_rows.ts summary: per carrier and per source language.

usage: python3 -I tally.py <out>/summary.<perturb>.json
"""
import json, sys
from collections import defaultdict

rows = json.load(open(sys.argv[1]))
keys = ['videos', 'errors', 'units', 'skipped', 'aligned', 'split', 'fallback', 'sentenceLevel', 'rewritten', 'calls', 'cues', 'rowRepairRejected']
agg = defaultdict(lambda: defaultdict(int))
for r in rows:
    for group in (('all', r['fusion']), (r['language'], r['fusion'])):
        a = agg[group]
        a['videos'] += 1
        if not r.get('ok'):
            a['errors'] += 1
            continue
        al = r['report']['align']
        a['units'] += r['units']
        a['skipped'] += al['skippedSentences']
        a['aligned'] += al['alignedSentences']
        a['split'] += sum(v for k, v in r['aligners'].items() if k.endswith('+split/1'))
        a['fallback'] += al['fallbackSentences']
        a['sentenceLevel'] += al['sentenceLevelSentences']
        a['rewritten'] += al['rewrittenSentences']
        a['calls'] += r['calls']['calls']
        a['cues'] += r['cues']
        a['rowRepairRejected'] += (r['report'].get('rowRepair') or {}).get('rejected', 0)
print('| group | carrier | ' + ' | '.join(keys) + ' |')
print('| --- | --- |' + ' ---: |' * len(keys))
for (lang, fusion) in sorted(agg, key=lambda g: (g[0] != 'all', g)):
    a = agg[(lang, fusion)]
    print(f'| {lang} | {fusion} | ' + ' | '.join(str(a[k]) for k in keys) + ' |')
# Per-video divergences worth a look: an arm failing where the other succeeds, or fallback differing by > 2.
by = defaultdict(dict)
for r in rows:
    by[r['videoId']][r['fusion']] = r
for vid, arms in sorted(by.items()):
    if len(arms) < 2:
        continue
    a, b = arms.get('rows'), arms.get('lines')
    if a.get('ok') != b.get('ok'):
        print('DIVERGE', vid, 'rows ok' if a.get('ok') else 'rows ERR', 'lines ok' if b.get('ok') else 'lines ERR', (a.get('error') or b.get('error')))
    elif a.get('ok'):
        fa, fb = a['report']['align']['fallbackSentences'], b['report']['align']['fallbackSentences']
        if abs(fa - fb) > 2:
            print('FALLBACK', vid, a['language'], a['words'], 'rows', fa, 'lines', fb)

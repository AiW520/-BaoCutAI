"""Per-page tally of compare.ts runs with a real model: how much of each translate page the model marked up, plus tokens, cost and latency.

usage: python3 -I pages.py <run-dir> [<run-dir> ...]   (each run-dir is a compare.ts --out)

A page call is a `translate` (rows) or `translate-lines` call; the first time a given input is sent counts as a page, the same input
again counts as a resend. Coverage is over the sentences the page asks to be marked up: rows `<p … data-align-groups>` answered with
`<span data-src>`, `lines` `≥k` (k ≥ 2) lines answered with at least two `|quote|` blocks. A page is "lazy" when coverage < 50%; the tail
coverage (last third of the page's sentences) shows the "only the first few sentences" pattern. Cost uses DeepSeek's off-peak list price
per million tokens (cache hit / miss / output = $0.003 / $0.15 / $0.6); it is not a bill.
"""
import json, re, sys
from collections import defaultdict
from pathlib import Path

PRICE = (0.003, 0.15, 0.6)
P_TAG = re.compile(r'<p ([^>]*)>')
ID = re.compile(r'id="([^"]+)"')
ANSWER_P = re.compile(r'<p id="([^"]+)"[^>]*>(.*?)</p>', re.S)
LINE = re.compile(r'^(\d+) (.*)$', re.M)
QUOTE = re.compile(r'\|[^|]+\|')


def needed_rows(user):
    return [ID.search(attrs).group(1) for attrs in P_TAG.findall(user)
            if 'data-align-groups' in attrs and 'data-editable="false"' not in attrs and ID.search(attrs)]


def marked_rows(text):
    return {pid for pid, body in ANSWER_P.findall(text) if '<span data-src' in body}


def needed_lines(user):
    out = []
    for n, rest in LINE.findall(user):
        m = re.search(r'≥(\d+)', rest)
        if m and int(m.group(1)) >= 2:
            out.append(n)
    return out


def marked_lines(text):
    return {n for n, rest in LINE.findall(text) if len(QUOTE.findall(rest)) >= 2}


def page_words(user, kind):
    if kind == 'translate':
        body = re.sub(r'<[^>]+>', ' ', user)
        return len(body.split())
    return sum(len(re.sub(r'[≤≥]\d+|¦|⏸', ' ', rest).split()) for _, rest in LINE.findall(user))


def tally(run):
    run = Path(run)
    agg = defaultdict(float)
    pages = []
    for calls in sorted(run.glob('*/calls.jsonl')):
        seen = set()
        for line in calls.open():
            c = json.loads(line)
            u = c.get('usage') or {}
            # `--generator direct` 记 DeepSeek 的原始用量，`runtime` 记 Runtime 的（inputTokens 含缓存命中）。
            hit = u.get('prompt_cache_hit_tokens', u.get('cachedTokens')) or 0
            miss = u.get('prompt_cache_miss_tokens', (u.get('prompt_tokens', u.get('inputTokens')) or 0) - hit) or 0
            out = u.get('completion_tokens', u.get('outputTokens')) or 0
            agg['calls'] += 1
            agg['in'] += hit + miss
            agg['hit'] += hit
            agg['out'] += out
            agg['reasoning'] += (u.get('completion_tokens_details') or {}).get('reasoning_tokens') or 0
            agg['usd'] += (hit * PRICE[0] + miss * PRICE[1] + out * PRICE[2]) / 1e6
            agg['ms'] += c['ms']
            agg['length'] += c.get('finishReason') == 'length'
            agg['transport'] += c.get('transportRetries', 0)
            if c['kind'] not in ('translate', 'translate-lines'):
                continue
            agg['pageCalls'] += 1
            agg['pageMs'] += c['ms']
            agg['pageLength'] += c.get('finishReason') == 'length'
            key = c['user']
            if key in seen:
                agg['resends'] += 1
                continue
            seen.add(key)
            need = needed_rows(c['user']) if c['kind'] == 'translate' else needed_lines(c['user'])
            if len(need) < 8:  # 修复页、补做页
                agg['repairPages'] += 1
                continue
            got = marked_rows(c['text']) if c['kind'] == 'translate' else marked_lines(c['text'])
            hits = [n in got for n in need]
            tail = hits[len(hits) * 2 // 3:]
            pages.append({
                'video': calls.parent.name.split('.')[0],
                'words': page_words(c['user'], c['kind']),
                'need': len(need),
                'cov': sum(hits) / len(hits),
                'tail': sum(tail) / max(1, len(tail)),
                'length': c.get('finishReason') == 'length',
                'out': out,
                'ms': c['ms'],
            })
    return agg, pages


def align(run):
    summary = Path(run) / 'summary.none.json'
    a = defaultdict(int)
    if not summary.exists():
        return a
    for r in json.loads(summary.read_text()):
        a['videos'] += 1
        if not r.get('ok'):
            a['errors'] += 1
            continue
        al = r['report']['align']
        for k in ('alignedSentences', 'fallbackSentences', 'rewrittenSentences', 'sentenceLevelSentences', 'skippedSentences'):
            a[k] += al.get(k, 0)
        a['units'] += r['units']
        a['retries'] += r['calls'].get('retries', 0)
        a['rowsPageRetries'] += r['report'].get('rowsPageRetries', 0) or 0
        a['wallMs'] += r['ms']
    return a


print('| run | pages | mean words | sent/page | coverage | min | lazy (<50%) | tail cov | page `length` | resends | repair pages |'
      ' calls | retries | `length` | transport | aligned / fallback / rewrite / sentence | units | in (hit) / out tokens | reasoning | USD | call s | wall s |')
print('| --- |' + ' ---: |' * 21)
for run in sys.argv[1:]:
    agg, pages = tally(run)
    al = align(run)
    n = len(pages) or 1
    cov = sum(p['cov'] for p in pages) / n
    print(f"| {Path(run).name} | {len(pages)} | {sum(p['words'] for p in pages) / n:.0f} | {sum(p['need'] for p in pages) / n:.1f} | "
          f"{cov:.1%} | {min((p['cov'] for p in pages), default=0):.0%} | {sum(p['cov'] < 0.5 for p in pages)} | "
          f"{sum(p['tail'] for p in pages) / n:.1%} | {int(agg['pageLength'])} | {int(agg['resends'])} | {int(agg['repairPages'])} | "
          f"{int(agg['calls'])} | {al['retries']} | {int(agg['length'])} | {int(agg['transport'])} | "
          f"{al['alignedSentences']} / {al['fallbackSentences']} / {al['rewrittenSentences']} / {al['sentenceLevelSentences']} | {al['units']} | "
          f"{int(agg['in']):,} ({int(agg['hit']):,}) / {int(agg['out']):,} | {int(agg['reasoning']):,} | {agg['usd']:.4f} | "
          f"{agg['ms'] / 1000:.0f} | {al['wallMs'] / 1000:.0f} |" + (f" errors={al['errors']}" if al['errors'] else ''))

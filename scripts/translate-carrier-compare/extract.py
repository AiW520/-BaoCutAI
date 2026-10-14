"""Read-only: dump each project's current speech document (the longest one) to <out>/<videoId>.json.

usage: python3 -I extract.py <projects-root> <out-dir>
"""
import json, os, sqlite3, sys

root, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for d in sorted(os.listdir(root)):
    db = os.path.join(root, d, 'video.db')
    if not os.path.isfile(db):
        continue
    c = sqlite3.connect(f'file:{db}?mode=ro', uri=True)
    video_id = c.execute('select id from videos').fetchone()[0]
    seq = c.execute("select entity_id from entities where kind='sequence' and parent_id is null").fetchone()
    seq = seq[0] if seq else c.execute("select entity_id from entities where kind='sequence'").fetchone()[0]
    best = None
    for (body,) in c.execute("select body from entities where kind='document'"):
        doc = json.loads(body)
        if doc.get('kind') != 'speech':
            continue
        row = c.execute('select body from document_versions where video_id=? and document_id=? and revision=?',
                        (video_id, doc['id'], doc['currentRevision'])).fetchone()
        if not row:
            continue
        speech = json.loads(row[0])
        n = len(speech.get('words') or [])
        if best is None or n > best['words']:
            best = {'words': n, 'videoId': video_id, 'dir': d, 'documentId': doc['id'], 'revision': doc['currentRevision'],
                    'language': doc.get('language'), 'sequenceId': seq, 'assetId': doc.get('sourceAssetId'), 'speech': speech}
    if best:
        with open(os.path.join(out, f"{video_id}.json"), 'w') as f:
            json.dump(best, f)
        print(f"{best['words']:7d} {best['language']} {video_id} {d}")

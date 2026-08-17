import json, re, os, base64

BASE = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE, "lesson_segments.json"), encoding="utf-8") as f:
    segments = json.load(f)
with open(os.path.join(BASE, "seg_durations.json"), encoding="utf-8") as f:
    durs = json.load(f)
with open(os.path.join(BASE, "lesson_parts.json"), encoding="utf-8") as f:
    lp = json.load(f)

OFFSETS = lp["offsets"]
lesson_parts = lp["lesson_parts"]

def keyfn(k):
    a, b = k.split(".")
    return (int(a), int(b))

def fmt_ts(s):
    h = int(s // 3600)
    m = int((s % 3600) // 60)
    sec = s % 60
    return f"{h:02d}:{m:02d}:{sec:06.3f}"

SENT_RE = re.compile(r'[^.!?]+[.!?]*')

NUM_PARTS = len(OFFSETS)
cues_by_part = {p: [] for p in range(1, NUM_PARTS + 1)}

for lid in sorted(segments.keys(), key=keyfn):
    part = lesson_parts[lid]
    offset = OFFSETS[part - 1]
    for i, seg in enumerate(segments[lid]):
        anchor_local = seg["anchor"] - offset
        dur = durs[f"{lid}_{i}"]
        text = seg["text"].strip()
        sentences = [s.strip() for s in SENT_RE.findall(text) if s.strip()]
        if not sentences:
            continue
        total_chars = sum(len(s) for s in sentences)
        t = anchor_local
        for s in sentences:
            frac = len(s) / total_chars
            s_dur = dur * frac
            cues_by_part[part].append((t, t + s_dur, s))
            t += s_dur

const_names = {}
js_lines = []
for part in range(1, NUM_PARTS + 1):
    cues = cues_by_part[part]
    lines = ["WEBVTT", ""]
    for idx, (start, end, text) in enumerate(cues, 1):
        lines.append(str(idx))
        lines.append(f"{fmt_ts(start)} --> {fmt_ts(end)}")
        lines.append(text)
        lines.append("")
    vtt_content = "\n".join(lines)
    vtt_path = os.path.join(BASE, f"captions_part{part}.vtt")
    with open(vtt_path, "w", encoding="utf-8") as f:
        f.write(vtt_content)
    b64 = base64.b64encode(vtt_content.encode("utf-8")).decode()
    const_name = f"CAPTIONS_DATA_URI_P{part}"
    const_names[part] = const_name
    js_lines.append(f'const {const_name} = "data:text/vtt;base64,{b64}";')
    print(f"part{part}: {len(cues)} cues")

js_lines.append("const CAPTIONS_PARTS = [" + ", ".join(const_names[p] for p in range(1, NUM_PARTS + 1)) + "];")
js_lines.append("window.CAPTIONS_PARTS = CAPTIONS_PARTS;")

with open(os.path.join(BASE, "captions_b64.js"), "w", encoding="utf-8") as f:
    f.write("\n".join(js_lines))

print("wrote captions_b64.js with 3 parts")

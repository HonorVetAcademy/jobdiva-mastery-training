import json, os, re
from pydub import AudioSegment

BASE = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE, "course-data.js"), encoding="utf-8") as f:
    content = f.read()
pattern = re.compile(r'id:"(\d\.\d)", title:"([^"]*)", (?:part:\d+, )?start:(\d+), end:(\d+)')
starts = {m.group(1): int(m.group(3)) for m in pattern.finditer(content)}

with open(os.path.join(BASE, "lesson_segments.json"), encoding="utf-8") as f:
    segments = json.load(f)

TOTAL_MS = int(11555.46 * 1000) + 2000
canvas = AudioSegment.silent(duration=TOTAL_MS, frame_rate=24000)

WAV_DIR = os.path.join(BASE, "lesson_narration_wav")
SEG_WAV_DIR = os.path.join(BASE, "seg_wav")
placed = 0
segmented_lessons = set(segments.keys())

for lid, start_s in starts.items():
    if lid in segmented_lessons:
        for i, seg in enumerate(segments[lid]):
            path = os.path.join(SEG_WAV_DIR, f"{lid}_{i}.wav")
            if not os.path.exists(path):
                print(f"MISSING SEGMENT {lid}_{i}")
                continue
            clip = AudioSegment.from_wav(path)
            canvas = canvas.overlay(clip, position=int(seg["anchor"] * 1000))
            placed += 1
    else:
        path = os.path.join(WAV_DIR, f"{lid}.wav")
        if not os.path.exists(path):
            print(f"MISSING {lid}")
            continue
        clip = AudioSegment.from_wav(path)
        canvas = canvas.overlay(clip, position=int(start_s * 1000))
        placed += 1

out_path = os.path.join(BASE, "out", "narration_v2.wav")
canvas.export(out_path, format="wav")
print(f"DONE — placed {placed} narration pieces — exported {out_path}", flush=True)

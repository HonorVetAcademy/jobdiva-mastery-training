import cv2, os
from PIL import Image
import numpy as np

VIDEO = r"C:\Users\Tanya Awasthi\Downloads\Job Diva session _Updations-20260727_113459-Meeting Recording.mp4"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots\clips"
os.makedirs(OUT, exist_ok=True)

TARGET_W = 960
SAMPLE_FPS = 10
CLIP_DUR = 6
SCAN_BEFORE = 10
SCAN_AFTER = 100
SCAN_STEP = 1.0

# weaker clips only, widen the net
TOPICS = [
    ("job_order",              57,  1672),
    ("keywords_andor",        297,  1672),
    ("internal_submission",  4617,  1672),
    ("applicants_tab",       1137,  1672),
    ("availability",          1607, 1672),
    ("candidate_wallet",      2037, 1672),
]

cap = cv2.VideoCapture(VIDEO)
src_fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
duration = frame_count / src_fps

def grab_small(sec):
    cap.set(cv2.CAP_PROP_POS_MSEC, sec*1000)
    ret, frame = cap.read()
    if not ret:
        return None
    small = cv2.resize(frame, (240, 135), interpolation=cv2.INTER_AREA)
    return small.astype(np.int16)

for name, ts, crop_w in TOPICS:
    scan_start = max(0, ts - SCAN_BEFORE)
    scan_end = min(duration - CLIP_DUR - 1, ts + SCAN_AFTER)
    probe_times = np.arange(scan_start, scan_end, SCAN_STEP)
    frames = []
    for t in probe_times:
        f = grab_small(t)
        if f is not None:
            frames.append((t, f))
    diffs = []
    for i in range(1, len(frames)):
        d = np.abs(frames[i][1] - frames[i-1][1]).mean()
        diffs.append(d)
    win_samples = max(1, int(CLIP_DUR / SCAN_STEP))
    best_score = -1
    best_idx = 0
    for i in range(0, len(diffs) - win_samples + 1):
        score = sum(diffs[i:i+win_samples])
        if score > best_score:
            best_score = score
            best_idx = i
    best_start = frames[best_idx][0]
    print(f"{name}: scanned {scan_start:.0f}-{scan_end:.0f}s, best motion window starts at {best_start:.1f}s (score {best_score:.2f})")

    cap.set(cv2.CAP_PROP_POS_MSEC, best_start*1000)
    step = max(1, round(src_fps / SAMPLE_FPS))
    n_source_frames = int(src_fps * CLIP_DUR)
    out_frames = []
    i = 0
    while i < n_source_frames:
        ret, frame = cap.read()
        if not ret:
            break
        if i % step == 0:
            h = frame.shape[0]
            cropped = frame[0:h, 0:crop_w]
            ch, cw = cropped.shape[:2]
            new_h = int(ch * (TARGET_W / cw))
            resized = cv2.resize(cropped, (TARGET_W, new_h), interpolation=cv2.INTER_AREA)
            rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
            out_frames.append(Image.fromarray(rgb))
        i += 1
    if not out_frames:
        print(f"  NO FRAMES for {name}"); continue
    out_path = os.path.join(OUT, f"{name}.webp")
    frame_duration_ms = int(1000/SAMPLE_FPS)
    out_frames[0].save(
        out_path, format="WEBP", save_all=True, append_images=out_frames[1:],
        duration=frame_duration_ms, loop=0, quality=68, method=4
    )
    size_kb = os.path.getsize(out_path)/1024
    print(f"  wrote {name}.webp: {len(out_frames)} frames, {size_kb:.0f} KB, start={best_start:.1f}s")

cap.release()

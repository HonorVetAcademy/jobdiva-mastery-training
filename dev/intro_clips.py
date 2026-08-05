import cv2, os
from PIL import Image
import numpy as np

BASE = r"C:\Users\Tanya Awasthi\OneDrive - HonorVet Technologies\Desktop\Training Content\JobDiva -ATS"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots\clips"
os.makedirs(OUT, exist_ok=True)

TARGET_W = 1500
SAMPLE_FPS = 10
CLIP_DUR = 6
SCAN_STEP = 1.0

# (output_name, source_file, scan_start, scan_end)
JOBS = [
    ("p1_login_motion",   "JobDiva Intro-ATS-1.mp4",       80,  110),
    ("p1_homepage_tour",  "JobDiva Intro-ATS-1.mp4",       295, 354),
    ("p2_topnav",         "JobDiva Intro-ATs-Part-2.mp4",  75,  115),
    ("p2_leftnav",        "JobDiva Intro-ATs-Part-2.mp4",  135, 175),
    ("p2_globalsearch",   "JobDiva Intro-ATs-Part-2.mp4",  245, 290),
]

def grab_small(cap, sec, fps):
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(sec*fps))
    ret, frame = cap.read()
    if not ret:
        return None
    return cv2.resize(frame, (240, 135), interpolation=cv2.INTER_AREA).astype(np.int16)

for name, srcfile, scan_start, scan_end in JOBS:
    path = os.path.join(BASE, srcfile)
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = cap.get(cv2.CAP_PROP_FRAME_COUNT) / fps
    scan_end = min(scan_end, duration - CLIP_DUR - 1)

    probe_times = np.arange(scan_start, scan_end, SCAN_STEP)
    frames = []
    for t in probe_times:
        f = grab_small(cap, t, fps)
        if f is not None:
            frames.append((t, f))
    diffs = [np.abs(frames[i][1]-frames[i-1][1]).mean() for i in range(1,len(frames))]
    win_samples = max(1, int(CLIP_DUR / SCAN_STEP))
    best_score, best_idx = -1, 0
    for i in range(0, len(diffs) - win_samples + 1):
        score = sum(diffs[i:i+win_samples])
        if score > best_score:
            best_score, best_idx = score, i
    best_start = frames[best_idx][0]
    print(f"{name}: scanned {scan_start:.0f}-{scan_end:.0f}s in {srcfile}, best window starts {best_start:.1f}s (score {best_score:.2f})")

    cap.set(cv2.CAP_PROP_POS_FRAMES, int(best_start*fps))
    step = max(1, round(fps / SAMPLE_FPS))
    n_source_frames = int(fps * CLIP_DUR)
    out_frames = []
    i = 0
    while i < n_source_frames:
        ret, frame = cap.read()
        if not ret:
            break
        if i % step == 0:
            h, w = frame.shape[:2]
            new_h = int(h * (TARGET_W / w))
            resized = cv2.resize(frame, (TARGET_W, new_h), interpolation=cv2.INTER_AREA)
            rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
            out_frames.append(Image.fromarray(rgb))
        i += 1
    cap.release()

    if not out_frames:
        print(f"  NO FRAMES for {name}"); continue
    out_path = os.path.join(OUT, f"{name}.webp")
    frame_duration_ms = int(1000/SAMPLE_FPS)
    out_frames[0].save(
        out_path, format="WEBP", save_all=True, append_images=out_frames[1:],
        duration=frame_duration_ms, loop=0, quality=65, method=4
    )
    print(f"  wrote {name}.webp: {len(out_frames)} frames, {os.path.getsize(out_path)/1024:.0f} KB, start={best_start:.1f}s")

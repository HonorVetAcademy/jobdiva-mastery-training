import cv2, os
from PIL import Image

BASE = r"C:\Users\Tanya Awasthi\OneDrive - HonorVet Technologies\Desktop\Training Content\JobDiva -ATS"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots\clips"

TARGET_W = 1500
SAMPLE_FPS = 10
CLIP_DUR = 6
KEEP_FRAC = 0.85  # crop off the bottom 15% where the burned-in caption band sits

JOBS = [
    ("p1_login_motion",  "JobDiva Intro-ATS-1.mp4", 93.0),
    ("p1_homepage_tour", "JobDiva Intro-ATS-1.mp4", 337.0),
]

for name, srcfile, start in JOBS:
    path = os.path.join(BASE, srcfile)
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(start*fps))
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
            cropped = frame[0:int(h*KEEP_FRAC), 0:w]  # drop bottom caption band
            ch, cw = cropped.shape[:2]
            new_h = int(ch * (TARGET_W / cw))
            resized = cv2.resize(cropped, (TARGET_W, new_h), interpolation=cv2.INTER_AREA)
            rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
            out_frames.append(Image.fromarray(rgb))
        i += 1
    cap.release()

    if not out_frames:
        print(f"NO FRAMES for {name}"); continue
    out_path = os.path.join(OUT, f"{name}.webp")
    frame_duration_ms = int(1000/SAMPLE_FPS)
    out_frames[0].save(
        out_path, format="WEBP", save_all=True, append_images=out_frames[1:],
        duration=frame_duration_ms, loop=0, quality=65, method=4
    )
    print(f"wrote {name}.webp: {len(out_frames)} frames, {os.path.getsize(out_path)/1024:.0f} KB, size={out_frames[0].size}")

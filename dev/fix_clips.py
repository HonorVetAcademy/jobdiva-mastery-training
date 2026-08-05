import cv2, os
from PIL import Image

VIDEO = r"C:\Users\Tanya Awasthi\Downloads\Job Diva session _Updations-20260727_113459-Meeting Recording.mp4"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots\clips"

cap = cv2.VideoCapture(VIDEO)
fps = cap.get(cv2.CAP_PROP_FPS)

def grab_cropped(sec, crop_w):
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(sec*fps))
    ret, frame = cap.read()
    if not ret:
        return None
    h = frame.shape[0]
    return frame[0:h, 0:crop_w]

# --- Fix 1: broken clips -> clean single-frame stills at verified-good timestamps, full crop resolution ---
STILLS = [
    ("job_order",             60,   1672),
    ("applicants_tab",        1140, 1672),
    ("licenses_certs_tabs",   3450, 1672),
    ("live_interview_email",  2557, 1672),
]
for name, sec, crop_w in STILLS:
    frame = grab_cropped(sec, crop_w)
    if frame is None:
        print("FAIL", name); continue
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img = Image.fromarray(rgb)
    out_path = os.path.join(OUT, f"{name}.webp")
    img.save(out_path, "WEBP", quality=85)
    print(f"STILL {name}: {img.size}, {os.path.getsize(out_path)/1024:.0f} KB")

# --- Fix 2: re-render the 11 verified-good motion clips at higher resolution (blur fix) ---
TARGET_W = 1500
SAMPLE_FPS = 10
CLIP_DUR = 6
GOOD_CLIPS = [
    ("profession_specialty",  197,  1672),
    ("keywords_andor",        361,  1672),
    ("realtime_boards",       665,  1672),
    ("divamatch",             1438, 1672),
    ("availability",          1691, 1672),
    ("preferred_locations",   2696, 1672),
    ("candidate_wallet",      2062, 1672),
    ("email_optout",          1804, 1672),
    ("notes",                 3041, 1672),
    ("internal_submission",   4650, 1672),
    ("post_boards",           3827, 1672),
]
step = max(1, round(fps / SAMPLE_FPS))
for name, start, crop_w in GOOD_CLIPS:
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(start*fps))
    n_source_frames = int(fps*CLIP_DUR)
    frames = []
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
            frames.append(Image.fromarray(rgb))
        i += 1
    if not frames:
        print("NO FRAMES", name); continue
    out_path = os.path.join(OUT, f"{name}.webp")
    frame_duration_ms = int(1000/SAMPLE_FPS)
    frames[0].save(
        out_path, format="WEBP", save_all=True, append_images=frames[1:],
        duration=frame_duration_ms, loop=0, quality=62, method=4
    )
    print(f"CLIP {name}: {len(frames)} frames, {os.path.getsize(out_path)/1024:.0f} KB")

cap.release()

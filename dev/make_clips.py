import cv2, os
from PIL import Image

VIDEO = r"C:\Users\Tanya Awasthi\Downloads\Job Diva session _Updations-20260727_113459-Meeting Recording.mp4"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots\clips"
os.makedirs(OUT, exist_ok=True)

TARGET_W = 960
SAMPLE_FPS = 8   # output frame rate of the webp

# (output_name, start_sec, duration_sec, crop_width_of_1920)
CLIPS = [
    ("job_order",              57,  6, 1672),
    ("profession_specialty",  177,  6, 1672),
    ("keywords_andor",        297,  6, 1672),
    ("realtime_boards",       657,  6, 1672),
    ("applicants_tab",       1137,  6, 1672),
    ("divamatch",             1427, 6, 1672),
    ("availability",          1607, 6, 1672),
    ("preferred_locations",   2682, 6, 1672),
    ("licenses_certs_tabs",   3447, 6, 1672),
    ("candidate_wallet",      2037, 6, 1672),
    ("email_optout",          1787, 6, 1672),
    ("live_interview_email",  2557, 5, 1920),
    ("notes",                 3047, 6, 1672),
    ("internal_submission",  4617,  6, 1672),
    ("post_boards",           3817, 6, 1672),
]

cap = cv2.VideoCapture(VIDEO)
src_fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
duration = frame_count / src_fps

step = max(1, round(src_fps / SAMPLE_FPS))

for name, start, dur, crop_w in CLIPS:
    if start*src_fps >= frame_count:
        print("SKIP (beyond duration)", name); continue
    cap.set(cv2.CAP_PROP_POS_MSEC, start*1000)
    n_source_frames = int(src_fps*dur)
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
        duration=frame_duration_ms, loop=0, quality=68, method=4
    )
    size_kb = os.path.getsize(out_path)/1024
    print(f"OK {name}: {len(frames)} frames, {size_kb:.0f} KB -> {out_path}")

cap.release()

import cv2, os

VIDEO = r"C:\Users\Tanya Awasthi\Downloads\Job Diva session _Updations-20260727_113459-Meeting Recording.mp4"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots"
os.makedirs(OUT, exist_ok=True)

# (label, seconds)
TARGETS = [
    ("dashboard_generic", 60),
    ("job_order", 60),
    ("profession_specialty", 180),
    ("keywords_andor", 300),
    ("realtime_boards", 660),
    ("applicants_tab", 1140),
    ("divamatch", 1430),
    ("availability", 1610),
    ("preferred_locations", 2685),
    ("licenses_certs_tabs", 3450),
    ("candidate_wallet", 2040),
    ("hotlists", 1850),
    ("email_optout", 1775),
    ("live_interview", 2500),
    ("notes", 3100),
    ("internal_submission", 4570),
    ("linkedin_posting", 3740),
    ("recap", 4990),
]

cap = cv2.VideoCapture(VIDEO)
fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
duration = frame_count / fps
print(f"fps={fps:.2f} frames={frame_count:.0f} duration={duration/60:.1f} min")

for label, sec in TARGETS:
    if sec*fps >= frame_count:
        print(f"SKIP {label} @ {sec}s - beyond duration")
        continue
    cap.set(cv2.CAP_PROP_POS_MSEC, sec*1000)
    ret, frame = cap.read()
    if not ret:
        print(f"FAIL {label} @ {sec}s")
        continue
    fname = os.path.join(OUT, f"{label}_{sec}s.jpg")
    cv2.imwrite(fname, frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
    print(f"OK {label} @ {sec}s -> {fname}")

cap.release()

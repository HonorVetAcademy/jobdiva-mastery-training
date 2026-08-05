import cv2, os

VIDEO = r"C:\Users\Tanya Awasthi\Downloads\Job Diva session _Updations-20260727_113459-Meeting Recording.mp4"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots"
os.makedirs(OUT, exist_ok=True)

TARGETS = [
    ("hotlists_try", 1855),
    ("hotlists_try", 1875),
    ("hotlists_try", 1895),
    ("email_optout_try", 1790),
    ("email_optout_try", 1810),
    ("live_interview_check", 2500),
    ("live_interview_try", 2520),
    ("live_interview_try", 2560),
    ("notes_try", 3020),
    ("notes_try", 3050),
    ("internal_submission_try", 4460),
    ("internal_submission_try", 4620),
    ("linkedin_posting_check", 3740),
    ("recap_check", 4980),
]

cap = cv2.VideoCapture(VIDEO)
fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)

for label, sec in TARGETS:
    if sec*fps >= frame_count:
        print(f"SKIP {label} @ {sec}s"); continue
    cap.set(cv2.CAP_PROP_POS_MSEC, sec*1000)
    ret, frame = cap.read()
    if not ret:
        print(f"FAIL {label} @ {sec}s"); continue
    fname = os.path.join(OUT, f"{label}_{sec}s.jpg")
    cv2.imwrite(fname, frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
    print(f"OK {label} @ {sec}s")

cap.release()

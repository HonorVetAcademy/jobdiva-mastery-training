import cv2, os

SHOTS = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots"
OUT = r"C:\Users\Tanya Awasthi\App-AI\jobdiva-training\shots\crop"
os.makedirs(OUT, exist_ok=True)

# files we actually use, with crop width (cut off right-side meeting panel)
FILES = {
    "job_order_60s.jpg": 1672,
    "profession_specialty_180s.jpg": 1672,
    "keywords_andor_300s.jpg": 1672,
    "realtime_boards_660s.jpg": 1672,
    "applicants_tab_1140s.jpg": 1672,
    "divamatch_1430s.jpg": 1672,
    "availability_1610s.jpg": 1672,
    "preferred_locations_2685s.jpg": 1672,
    "licenses_certs_tabs_3450s.jpg": 1672,
    "candidate_wallet_2040s.jpg": 1672,
    "email_optout_try_1790s.jpg": 1672,
    "live_interview_try_2560s.jpg": 1920,  # Outlook window fills the frame, no meeting panel to remove
    "notes_try_3050s.jpg": 1672,
    "internal_submission_try_4620s.jpg": 1672,
    "probe_3820s.jpg": 1672,
}

for fname, w in FILES.items():
    path = os.path.join(SHOTS, fname)
    img = cv2.imread(path)
    if img is None:
        print("MISSING", fname); continue
    h = img.shape[0]
    cropped = img[0:h, 0:w]
    outpath = os.path.join(OUT, fname)
    cv2.imwrite(outpath, cropped, [cv2.IMWRITE_JPEG_QUALITY, 88])
    print("cropped", fname, "->", cropped.shape)

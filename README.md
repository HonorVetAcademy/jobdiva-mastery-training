# JobDiva Mastery — Recruiter Training

An animated, voice-narrated training course that walks new recruiters through JobDiva and HonorVet's HireTrack Flow — from what an ATS is, through sourcing, screening, compliance, and the interview-to-offer process — using real screenshots and clips from an actual JobDiva session.

**Live course:** enable GitHub Pages on this repo (Settings → Pages → Deploy from branch `main`, folder `/`) or open it directly via the Pages URL once enabled.

## What's inside

- **`index.html`** — the self-contained build. All screenshots/clips are embedded as base64 data URIs, so this single file is the entire app — open it directly in a browser, or serve it via GitHub Pages.
- **`dev/`** — the working source: `dev/index.html` references image files under `dev/shots/clips/` individually (easier to edit), plus the source screenshots, playbook material, and the Python scripts used to extract/crop clips from the original session recordings.

## Features

- Real JobDiva screenshots and clips with an animated magnifying-glass highlight synced to narration
- Full voice narration via the Web Speech API, with natural pacing and pause/resume
- Collapsible sidebar course outline, mirroring the HireTrack Flow's two phases and nine checkpoints
- A final assessment (80% to pass) that unlocks a HonorVet Technologies certificate of completion, with a print-to-PDF option

## Privacy note

All screenshots have been reviewed and cropped to remove any colleagues' faces, video-call panels, or personal browser profile photos before inclusion.

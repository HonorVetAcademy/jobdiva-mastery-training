# JobDiva Mastery — Recruiter Training

A hands-on, voice-narrated training course built directly from a live JobDiva/HireTrack recruiter training session recording. Real screen-recording video (attendee panels cropped out) walks through the full recruiter workflow — from what an ATS is, through sourcing, job creation, candidate management, mass outreach, and the end-to-end HireTrack placement process — with narration precisely timed to what's on screen.

**Live course:** https://honorvetacademy.github.io/jobdiva-mastery-training/

## What's inside

- **`index.html`** — the app. Loads `course-data.js` (lesson content/timing), `captions_b64.js` (embedded WebVTT captions), and `logo.js`, and plays back the course video from `out/parts/`.
- **`out/parts/`** — the training video, split into 4 parts (each under GitHub's 100MB file limit). Each lesson knows which part it lives in and seeks to the right local timestamp automatically — from a viewer's perspective it plays as one continuous course.
- **`dev/`** — the source material and generation scripts used to build the course: the trimmed narration script per lesson (`lesson_segments.json`), per-segment audio durations, the raw session transcript, and the Python scripts (`gen_segments.py`, `gen_captions_parts.py`, `assemble_v2.py`) that synthesize narration (Edge TTS), build per-part WebVTT captions, and assemble the final narration track.

## Features

- 35 lessons across 9 modules, each with a "what you'll learn," skills, key takeaways, terminology, and knowledge-check quizzes
- Narration precisely anchored to on-screen content — no single continuous voiceover drifting out of sync with the video
- Custom video player: play/pause, scrubbing, fullscreen, and toggleable synced captions
- Sequential lesson locking — complete a lesson to unlock the next
- A final assessment covering the full course

## Privacy note

The source recording has been cropped to remove attendee webcam panels and any other participant-identifying UI before inclusion.

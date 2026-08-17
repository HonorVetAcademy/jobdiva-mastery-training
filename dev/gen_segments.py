import asyncio, json, os, subprocess, wave
import edge_tts

BASE = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE, "lesson_segments.json"), encoding="utf-8") as f:
    segments = json.load(f)

VOICE = "en-US-AndrewNeural"
OUT_MP3 = os.path.join(BASE, "seg_mp3")
OUT_WAV = os.path.join(BASE, "seg_wav")
os.makedirs(OUT_MP3, exist_ok=True)
os.makedirs(OUT_WAV, exist_ok=True)
FFMPEG = os.path.join(BASE, "ffmpeg.exe")

SEM = asyncio.Semaphore(6)
MAX_RETRIES = 5

def mp3_is_valid(path):
    return os.path.exists(path) and os.path.getsize(path) > 1000

async def synth(lid, idx, text):
    key = f"{lid}_{idx}"
    mp3_path = os.path.join(OUT_MP3, f"{key}.mp3")
    wav_path = os.path.join(OUT_WAV, f"{key}.wav")
    async with SEM:
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                if not mp3_is_valid(mp3_path):
                    if os.path.exists(mp3_path):
                        os.remove(mp3_path)
                    communicate = edge_tts.Communicate(text, VOICE, rate="+2%")
                    await communicate.save(mp3_path)
                if not mp3_is_valid(mp3_path):
                    raise RuntimeError("mp3 produced but empty/too small")
                if not os.path.exists(wav_path):
                    subprocess.run([FFMPEG, "-y", "-i", mp3_path, "-ar", "24000", "-ac", "1", wav_path],
                                    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
                with wave.open(wav_path, "rb") as w:
                    dur = w.getnframes() / w.getframerate()
                return key, dur
            except Exception as e:
                if os.path.exists(mp3_path) and not mp3_is_valid(mp3_path):
                    os.remove(mp3_path)
                if os.path.exists(wav_path):
                    os.remove(wav_path)
                if attempt == MAX_RETRIES:
                    print(f"{key}: FAILED after {MAX_RETRIES} attempts: {e}", flush=True)
                    return key, None
                await asyncio.sleep(1.5 * attempt)

async def main():
    results = {}
    tasks = []
    for lid, segs in segments.items():
        for i, seg in enumerate(segs):
            tasks.append(synth(lid, i, seg["text"]))
    for coro in asyncio.as_completed(tasks):
        key, dur = await coro
        if dur is None:
            continue
        results[key] = round(dur, 2)
        print(f"{key}: {dur:.2f}s", flush=True)
    with open(os.path.join(BASE, "seg_durations.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    total = sum(len(v) for v in segments.values())
    print(f"DONE — {len(results)}/{total} segments succeeded", flush=True)

asyncio.run(main())

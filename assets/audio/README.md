# Audio Asset Drop Folder

Place licensed or generated audio files here using the filenames in `AUDIO_ASSET_PLAN.md` and `data/audioManifest.js`.

Current status:

- The game has a real `AudioManager`.
- All manifest entries are marked `ready: false`, so the game uses procedural fallback audio.
- After adding a real asset, set its manifest entry to `ready: true`.

Expected structure:

```text
assets/audio/
  bgm/
  ambience/
  sfx/
  stingers/
```


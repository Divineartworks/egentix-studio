---
name: title-card
description: Render a short title-card video (mp4) from a title and a subtitle, locally on the user's machine with the kinetype renderer. Use when the user asks for a title card, intro card or short title video.
---

# title-card

Renders a short title card (mp4) on this machine. Nothing is sent anywhere.

1. Write the title and subtitle to a JSON file with your file-writing tool, for example `./title-card-input.json` containing `{"title": "...", "subtitle": "..."}`. Never put the title or subtitle into the shell command itself: they may contain characters a shell would run.
2. Run:

```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/title-card/scripts/title-card.mjs" --input ./title-card-input.json --out ./title-card-out
```

Options: `--duration SECONDS` (1-30, default 4), `--format landscape|vertical` (default landscape), `--draft` (faster, lower quality).

The script calls the kinetype renderer at the path in env `EGENTIX_KINETYPE` (default: `kinetype` on PATH). If it exits with code 3, the renderer is missing: tell the user, and do not guess another path.
On success the last line printed is the mp4 path for this run; report it. Each run writes to its own new folder under `--out`.

Inspired by video-shotcraft (Apache-2.0, https://github.com/Vincentwei1021/video-shotcraft); no code is copied from it.

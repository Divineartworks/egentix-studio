---
name: title-card
description: Render a short title-card video (mp4) from a title and a subtitle, locally on the user's machine with the kinetype renderer. Use when the user asks for a title card, intro card or short title video.
---

# title-card

Renders a short editorial title card (mp4) entirely on this machine. No network, nothing is sent anywhere.

Run:

```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/title-card/scripts/title-card.mjs" --title "TITLE" --subtitle "SUBTITLE" --out "./title-card-out"
```

Options: `--duration SECONDS` (default 4), `--format landscape|vertical` (default landscape), `--draft` (fast, lower quality).

The script calls the kinetype renderer at the path in env `EGENTIX_KINETYPE` (default: `kinetype` on PATH). If it is missing, the script exits with a hint; tell the user rather than guessing another path.
After it finishes, report the mp4 path printed on the last line.

The skill folder layout follows video-shotcraft (Apache-2.0, https://github.com/Vincentwei1021/video-shotcraft); no code is copied from it.

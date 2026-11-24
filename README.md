# Egentix Studio

A Claude Code plugin marketplace with one plugin, `content-studio`. Its skill `title-card` renders a short title-card video (mp4) from a title and a subtitle.

The plugin runs inside your own, unmodified Claude Code, signed in with your own login. Nothing is sent to Egentix: no prompts, no tokens, no files. The video is rendered on your machine.

## Install

```bash
claude plugin marketplace add Divineartworks/egentix-studio
claude plugin install content-studio@egentix-studio
```

Then ask Claude Code for a title card, for example: "Make a title card: Egentix, subtitle Selg smartere i Drammen".

## Requirements

- Node.js 20 or newer.
- The kinetype renderer, which needs a headless Chrome and ffmpeg. Set `EGENTIX_KINETYPE` to the kinetype executable (`bin/kinetype.js`); without it, the skill looks for `kinetype` on your PATH.
- How to get kinetype: it is not public yet. Until it is, the skill stops with a short message saying it cannot find the renderer. This README will give the install line once it is published.

## Licence

MIT, see `LICENSE`. The skill folder layout follows video-shotcraft (Apache-2.0, https://github.com/Vincentwei1021/video-shotcraft); no code is copied from it.

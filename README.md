# Egentix Studio

Egentix Studio adds one skill to your Claude Code: **title-card**. Ask for a title card and you get a short video (mp4, 4 seconds by default, landscape or vertical) with your title and subtitle, made on your own computer.

Nothing is sent to Egentix: no prompts, no files, no videos. Claude Code itself still talks to Anthropic, as it always does, under your own login.

## Install

In a terminal:

```bash
claude plugin marketplace add Divineartworks/egentix-studio
claude plugin install content-studio@egentix-studio
```

Then ask Claude Code, for example: "Make a title card: Egentix, subtitle Selg smartere i Drammen". The video lands in a new folder under `./title-card-out`.

## What you need

- Node.js 20 or newer.
- The kinetype renderer (MIT, https://github.com/Divineartworks/kinetype-renderer), plus ffmpeg and a headless Chrome. Install it once:

```bash
git clone https://github.com/Divineartworks/kinetype-renderer.git
cd kinetype-renderer && npm install
node bin/kinetype.js check
```

  Its README says how to get a headless Chrome if you have none. Then set `EGENTIX_KINETYPE` to the full path of `kinetype-renderer/bin/kinetype.js`, either in the terminal before you start Claude Code or under `env` in your Claude Code settings.

## Licence

MIT, see `LICENSE`. Inspired by video-shotcraft (Apache-2.0, https://github.com/Vincentwei1021/video-shotcraft); no code is copied from it.

# Egentix Studio

Claude Code plugin marketplace with one plugin, `content-studio` (skill: `title-card`).

TERMS: the plugin runs inside your own, unmodified Claude Code, signed in with your own login. Nothing is sent to Egentix: no prompts, no tokens, no files. Rendering happens on your machine with a local renderer.

## Install

```bash
claude plugin marketplace add <path-or-git-url-of-this-repo>
claude plugin install content-studio@egentix-studio
```

## Requirements

The local kinetype renderer. Set `EGENTIX_KINETYPE` to its executable (default: `kinetype` on PATH).

## Notice

The skill layout follows video-shotcraft (Apache-2.0, https://github.com/Vincentwei1021/video-shotcraft). This repo is Apache-2.0.

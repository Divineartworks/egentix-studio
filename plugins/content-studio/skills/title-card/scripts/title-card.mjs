#!/usr/bin/env node
// Local title-card render. Spec -> kinetype render. No network. Apache-2.0.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const a = process.argv.slice(2);
const opt = (n, d) => { const i = a.indexOf("--" + n); return i >= 0 && a[i + 1] ? a[i + 1] : d; };
const title = opt("title"), subtitle = opt("subtitle", "");
if (!title) { console.error("usage: title-card.mjs --title T [--subtitle S] [--out DIR] [--duration 4] [--format landscape|vertical] [--draft]"); process.exit(2); }
const out = resolve(opt("out", "./title-card-out"));
const duration = Number(opt("duration", "4"));
const kt = process.env.EGENTIX_KINETYPE || "kinetype";
mkdirSync(out, { recursive: true });

const spec = {
  template: "editorial-serif", format: opt("format", "landscape"), fps: 30, duration, bpm: 72, seed: 11,
  content: { mode: "title", number: "", section: subtitle, headline: title, swap: title.split(/\s+/).slice(-1)[0], standfirst: "", byline: "" },
};
const specPath = join(out, "spec.json");
writeFileSync(specPath, JSON.stringify(spec, null, 2));

const viaNode = kt.endsWith(".js") || kt.endsWith(".mjs");
const bin = viaNode ? process.execPath : kt;
const pre = viaNode ? [kt] : [];
const r = spawnSync(bin, [...pre, "render", specPath, "--out", out, "--formats", "mp4", ...(a.includes("--draft") ? ["--draft"] : [])], { stdio: "inherit" });
if (r.error) { console.error(`cannot run kinetype (${kt}): ${r.error.message}. Set EGENTIX_KINETYPE to the kinetype executable.`); process.exit(3); }
if (r.status !== 0) process.exit(r.status || 1);
const find = (d) => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? find(join(d, e.name)) : e.name.endsWith(".mp4") ? [join(d, e.name)] : []);
const mp4 = find(out)[0];
console.log(mp4 || "no mp4 produced");
if (!mp4) process.exit(4);

#!/usr/bin/env node
// Local title-card render: a JSON spec -> the kinetype renderer -> one mp4. No network. MIT, see the plugin's LICENSE.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const USAGE =
  "usage: title-card.mjs (--input FILE.json | --title T [--subtitle S]) [--out DIR] [--duration 1-30] [--format landscape|vertical] [--draft]";
const fail = (msg, code = 2) => { console.error(msg); process.exit(code); };

// Strict parser: every value flag needs a value that is not itself a flag; --draft is a flag only where it stands as one.
const VALUE_FLAGS = new Set(["input", "title", "subtitle", "out", "duration", "format"]);
const opts = { draft: false };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--draft") { opts.draft = true; continue; }
  const name = a.startsWith("--") ? a.slice(2) : null;
  if (!name || !VALUE_FLAGS.has(name)) fail(`unknown argument: ${a}\n${USAGE}`);
  const v = argv[i + 1];
  if (v === undefined || v.startsWith("--")) fail(`--${name} needs a value\n${USAGE}`);
  opts[name] = v; i++;
}

// --input lets the agent pass title and subtitle in a file, so they never pass through a shell command line.
if (opts.input) {
  let data;
  try { data = JSON.parse(readFileSync(opts.input, "utf8")); } catch (e) { fail(`cannot read --input ${opts.input}: ${e.message}`); }
  if (opts.title === undefined && typeof data.title === "string") opts.title = data.title;
  if (opts.subtitle === undefined && typeof data.subtitle === "string") opts.subtitle = data.subtitle;
}
const title = (opts.title || "").trim();
const subtitle = (opts.subtitle || "").trim();
if (!title) fail(`a title is required\n${USAGE}`);
const duration = opts.duration === undefined ? 4 : Number(opts.duration);
if (!Number.isFinite(duration) || duration < 1 || duration > 30) fail("--duration must be a number of seconds from 1 to 30");
const format = opts.format || "landscape";
if (format !== "landscape" && format !== "vertical") fail("--format must be landscape or vertical");

const kt = process.env.EGENTIX_KINETYPE || "kinetype";
const viaNode = kt.endsWith(".js") || kt.endsWith(".mjs");
if (viaNode && !existsSync(kt)) fail(`cannot find the kinetype renderer at ${kt}. Set EGENTIX_KINETYPE to kinetype's bin/kinetype.js.`, 3);

// Each run renders into its own new folder, so the mp4 reported is always this run's, never an older one.
const run = join(resolve(opts.out || "./title-card-out"), `run-${new Date().toISOString().replace(/[:.]/g, "-")}-${process.pid}`);
mkdirSync(run, { recursive: true });
const spec = {
  template: "editorial-serif", format, fps: 30, duration, bpm: 72, seed: 11,
  content: { mode: "title", number: "", section: subtitle, headline: title, swap: title.split(/\s+/).slice(-1)[0], standfirst: "", byline: "" },
};
const specPath = join(run, "spec.json");
writeFileSync(specPath, JSON.stringify(spec, null, 2));

const bin = viaNode ? process.execPath : kt;
const pre = viaNode ? [kt] : [];
const r = spawnSync(bin, [...pre, "render", specPath, "--out", run, "--formats", "mp4", ...(opts.draft ? ["--draft"] : [])], { stdio: ["ignore", "inherit", "inherit"] });
if (r.error) fail(`cannot run the kinetype renderer (${kt}): ${r.error.message}. Set EGENTIX_KINETYPE to kinetype's bin/kinetype.js.`, 3);
if (r.status !== 0) fail(`the renderer stopped with exit code ${r.status}`, r.status || 1);
const find = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? find(join(d, e.name)) : e.name.endsWith(".mp4") ? [join(d, e.name)] : []));
const mp4 = find(run)[0];
if (!mp4) fail("the renderer finished but produced no mp4", 4);
console.log(mp4);

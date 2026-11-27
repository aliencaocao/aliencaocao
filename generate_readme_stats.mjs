// Renders the github-readme-stats card to a static SVG (replaces the Vercel-hosted endpoint).
// Usage: GRS_DIR=<path to github-readme-stats checkout> PAT_1=<token> node generate_readme_stats.mjs <username> <out.svg>
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [username, out] = process.argv.slice(2);
const dir = process.env.GRS_DIR;
const load = (p) => import(pathToFileURL(join(dir, p)).href);
const { fetchStats } = await load("src/fetchers/stats.js");
const { renderStatsCard } = await load("src/cards/stats.js");

const stats = await fetchStats(username);
writeFileSync(out, renderStatsCard(stats, { show_icons: true }));

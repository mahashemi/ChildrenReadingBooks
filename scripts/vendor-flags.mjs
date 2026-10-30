import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";

const data = await readFile("flags-data.js", "utf8");
const codes = [...data.matchAll(/^([A-Z]{2})\|/gm)].map((match) => match[1].toLowerCase());
const uniqueCodes = [...new Set(codes)];
if (uniqueCodes.length !== 221) throw new Error(`Expected 221 unique flag codes; found ${uniqueCodes.length}`);
const outputDir = "assets/flags";
await mkdir(outputDir, { recursive: true });

async function download(code, attempt = 1) {
  const path = join(outputDir, `${code}.svg`);
  try { await access(path, constants.F_OK); return { code, cached: true }; } catch {}
  const url = `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${code}.svg`;
  try {
    const response = await fetch(url, { headers: { "User-Agent": "LittleLanterns-asset-vendor" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const svg = await response.text();
    if (!svg.includes("<svg") || svg.length < 100) throw new Error("Invalid SVG response");
    await writeFile(path, svg, "utf8");
    return { code, bytes: Buffer.byteLength(svg) };
  } catch (error) {
    if (attempt < 3) { await new Promise((resolve) => setTimeout(resolve, attempt * 1000)); return download(code, attempt + 1); }
    throw new Error(`Could not download ${code}: ${error.message}`);
  }
}
const failures = []; let downloaded = 0; let cached = 0;
for (let i = 0; i < uniqueCodes.length; i += 10) {
  const batch = await Promise.allSettled(uniqueCodes.slice(i, i + 10).map((code) => download(code)));
  for (const result of batch) {
    if (result.status === "rejected") failures.push(result.reason.message);
    else if (result.value.cached) cached++; else downloaded++;
  }
}
if (failures.length) throw new Error(`Flag asset download incomplete:\n${failures.join("\n")}`);
const licenseResponse = await fetch("https://raw.githubusercontent.com/lipis/flag-icons/main/LICENSE");
if (!licenseResponse.ok) throw new Error(`Could not fetch flag-icons license: HTTP ${licenseResponse.status}`);
await writeFile(join(outputDir, "LICENSE.flag-icons.txt"), await licenseResponse.text(), "utf8");
await writeFile(join(outputDir, "README.txt"), "Local flag artwork from lipis/flag-icons (MIT License).\nFiles are named by lowercase country/territory code and served locally by Little Lanterns.\nSource: https://github.com/lipis/flag-icons\nSee LICENSE.flag-icons.txt for the upstream license.\n", "utf8");
console.log(`Local flags ready: ${uniqueCodes.length} total, ${downloaded} downloaded, ${cached} already present.`);

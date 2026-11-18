import { copyFile, mkdir, rm, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { build as viteBuild } from "vite";

import { publicAssets } from "./public-assets.mjs";
import { verifyDist } from "./verify-dist.mjs";

const rootDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDir = path.join(rootDir, "dist");
const serverOutDir = path.join(distDir, "server");
const serverEntry = path.join(serverOutDir, "entry-server.js");
const modeFlagIndex = process.argv.indexOf("--mode");
const mode = modeFlagIndex >= 0 ? process.argv[modeFlagIndex + 1] : "production";

if (!mode) {
  throw new Error("Expected a value after --mode");
}

try {
  await viteBuild({ root: rootDir, mode, build: { copyPublicDir: false } });
  await Promise.all(publicAssets.map(async (asset) => {
    const destination = path.join(distDir, asset);
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(path.join(rootDir, "public", asset), destination);
  }));
  await viteBuild({
    root: rootDir,
    mode,
    build: {
      copyPublicDir: false,
      emptyOutDir: false,
      outDir: serverOutDir,
      ssr: path.join(rootDir, "src", "entry-server.tsx"),
      rollupOptions: {
        output: {
          entryFileNames: "entry-server.js",
        },
      },
    },
  });

  const { render } = await import(`${pathToFileURL(serverEntry).href}?v=${Date.now()}`);
  const appHtml = render();
  const indexPath = path.join(distDir, "index.html");
  const template = await readFile(indexPath, "utf8");
  const emptyRootPattern = /<div id="root">\s*<\/div>/;
  const emptyRootMatches = template.match(new RegExp(emptyRootPattern.source, "g")) ?? [];

  if (emptyRootMatches.length !== 1) {
    throw new Error(`Expected one empty #root in ${indexPath}, found ${emptyRootMatches.length}`);
  }

  const prerenderedHtml = template.replace(
    emptyRootPattern,
    () => `<div id="root">${appHtml}</div>`,
  );
  await writeFile(indexPath, prerenderedHtml, "utf8");
} finally {
  await rm(serverOutDir, { force: true, recursive: true });
}

const { indexPath: verifiedPath } = await verifyDist({ rootDir });
console.log(`Built and verified prerendered HTML: ${verifiedPath}`);

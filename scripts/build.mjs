import { access, rm, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { build as viteBuild } from "vite";

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

let verifiedPath;

try {
  await viteBuild({ root: rootDir, mode });
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
    `<div id="root">${appHtml}</div>`,
  );
  await writeFile(indexPath, prerenderedHtml, "utf8");
  ({ indexPath: verifiedPath } = await verifyDist({ rootDir }));
} finally {
  await rm(serverOutDir, { force: true, recursive: true });
}

try {
  await access(serverOutDir);
  throw new Error(`Temporary SSR output was not removed: ${serverOutDir}`);
} catch (error) {
  if (!(error && typeof error === "object" && "code" in error && error.code === "ENOENT")) {
    throw error;
  }
}

console.log(`Built and verified prerendered HTML: ${verifiedPath}`);

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { publicAssets } from "./public-assets.mjs";

const generatedAssets = /^assets\/[\w.-]+-[\w-]{8,}\.[a-z0-9]+$/i;
const publishedFiles = new Set(["index.html", "sitemap.xml", "robots.txt", ...publicAssets]);

function assert(condition, message) {
  if (!condition) throw new Error(`dist verification failed: ${message}`);
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readMetaContent(html, attribute, name) {
  const metaPattern = new RegExp(
    `<meta\\s+[^>]*${attribute}="${escapeRegExp(name)}"[^>]*>`,
    "i",
  );
  const tag = html.match(metaPattern)?.[0];
  assert(tag, `missing ${attribute}="${name}"`);
  const content = tag.match(/content="([^"]*)"/i)?.[1];
  assert(content, `missing content for ${attribute}="${name}"`);
  return content;
}

function readCanonical(html) {
  const tag = html.match(/<link\s+[^>]*rel="canonical"[^>]*>/i)?.[0];
  assert(tag, "missing canonical URL");
  const href = tag.match(/href="([^"]*)"/i)?.[1];
  assert(href, "canonical link has no href");
  return href;
}

async function assertAsset(distDir, relativePath, minimumBytes = 100) {
  const assetPath = path.join(distDir, ...relativePath.split("/"));
  const assetStat = await stat(assetPath);
  assert(assetStat.isFile(), `${relativePath} is not a file`);
  assert(assetStat.size >= minimumBytes, `${relativePath} is unexpectedly small`);
  return assetPath;
}

async function verifyPublishedFiles(distDir, relativeDir = "") {
  const items = await readdir(path.join(distDir, relativeDir), { withFileTypes: true });
  for (const item of items) {
    const relativePath = relativeDir ? relativeDir + "/" + item.name : item.name;
    if (item.isDirectory()) {
      assert(["assets", "fonts", "landing"].includes(relativePath), "unexpected published directory: " + relativePath);
      await verifyPublishedFiles(distDir, relativePath);
      continue;
    }
    assert(item.isFile() && (publishedFiles.has(relativePath) || generatedAssets.test(relativePath)),
      "unexpected published file: " + relativePath);
    if (/\.(?:js|css|html)$/i.test(relativePath)) {
      const source = await readFile(path.join(distDir, relativePath), "utf8");
      assert(!/plonbli/i.test(source), "legacy branding in " + relativePath);
      if (relativePath.endsWith(".css")) {
        for (const [, reference] of source.matchAll(/url\(\s*["']?\/(?!\/)([^\s)"']+)/gi)) {
          assert(publishedFiles.has(reference) || generatedAssets.test(reference), "unapproved asset referenced in CSS: " + reference);
          await assertAsset(distDir, reference);
        }
      }
    }
  }
}

function sameOriginAsset(url, origin, label) {
  const assetUrl = new URL(url);
  assert(assetUrl.origin === origin && !assetUrl.search && !assetUrl.hash, label + " must point to a static asset on the canonical origin");
  const relativePath = assetUrl.pathname.slice(1);
  assert(publicAssets.includes(relativePath), label + " is not an approved public asset");
  return relativePath;
}

async function verifyReferencedAssets(distDir, markup) {
  const assetReferences = new Set();
  for (const [, reference] of markup.matchAll(/\b(?:src|href)="\/([^"/][^"]*)"/gi)) assetReferences.add(reference);
  for (const [, candidates] of markup.matchAll(/\bsrcset="([^"]+)"/gi)) {
    for (const candidate of candidates.split(",")) {
      const [reference] = candidate.trim().split(/\s+/);
      assert(reference.startsWith("/") && !reference.startsWith("//"), "srcset must point to a local asset");
      assetReferences.add(reference.slice(1));
    }
  }
  for (const reference of assetReferences) {
    assert(publishedFiles.has(reference) || generatedAssets.test(reference), "unapproved asset referenced in HTML: " + reference);
    await assertAsset(distDir, reference);
  }
}

function readPngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  assert(buffer.subarray(0, 8).toString("hex") === signature, "invalid PNG signature");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpegDimensions(buffer) {
  assert(buffer[0] === 0xff && buffer[1] === 0xd8, "invalid JPEG signature");
  let offset = 2;

  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const segmentLength = buffer.readUInt16BE(offset);
    const isStartOfFrame = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);

    if (isStartOfFrame) {
      return { height: buffer.readUInt16BE(offset + 3), width: buffer.readUInt16BE(offset + 5) };
    }

    offset += segmentLength;
  }

  throw new Error("dist verification failed: JPEG dimensions were not found");
}

export async function verifyDist({ rootDir } = {}) {
  const projectRoot = rootDir ?? path.resolve(fileURLToPath(new URL("..", import.meta.url)));
  const distDir = path.join(projectRoot, "dist");
  const indexPath = path.join(distDir, "index.html");
  const html = await readFile(indexPath, "utf8");
  await verifyPublishedFiles(distDir);
  await verifyReferencedAssets(distDir, html);
  assert(/<script\b[^>]*type="module"[^>]*src="\/assets\/[^"]+\.js"/i.test(html), "hashed module script is missing");
  assert(/<link\s+[^>]*rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"/i.test(html), "hashed stylesheet is missing");

  // A returning browser must use the same fingerprinted fonts in the preload and CSS,
  // and a fingerprinted image for every portrait/landscape srcset option.
  const cssPath = html.match(/<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"/i)[1];
  const css = await readFile(path.join(distDir, cssPath.slice(1)), "utf8");
  for (const asset of publicAssets.filter((file) => file.endsWith(".woff2") || file.startsWith("landing/atlas-garden-morning-"))) {
    const { name, ext } = path.parse(asset);
    const pattern = new RegExp(`/assets/${escapeRegExp(name)}-[\\w-]{8}${escapeRegExp(ext)}(?=["')\\s,])`);
    const isFont = ext === ".woff2";
    const matchedUrl = pattern.exec(isFont ? css : html)?.[0];
    assert(matchedUrl, `no fingerprinted reference to ${asset} in ${isFont ? "CSS" : "hero markup"}`);
    if (isFont && name.endsWith("-latin")) {
      assert(html.includes(`as="font" type="font/woff2" href="${matchedUrl}"`), `preload must reuse CSS URL for ${asset}`);
    }
  }

  assert(!html.includes("__SITE_LOCALE__"), "locale placeholder was not replaced");
  assert(!html.includes("<!-- site-metadata -->"), "metadata placeholder was not replaced");
  assert(!html.includes("fonts.googleapis.com"), "build still depends on Google Fonts");
  assert(countMatches(html, /<title(?:\s[^>]*)?>/gi) === 1, "expected exactly one title");
  assert(
    countMatches(html, /<meta\s+[^>]*name="description"[^>]*>/gi) === 1,
    "expected exactly one description",
  );
  assert(
    countMatches(html, /<link\s+[^>]*rel="canonical"[^>]*>/gi) === 1,
    "expected exactly one canonical URL",
  );
  assert(
    countMatches(html, /<meta\s+[^>]*property="og:image"[^>]*>/gi) === 1,
    "expected exactly one Open Graph image",
  );
  assert(
    countMatches(html, /<meta\s+[^>]*name="twitter:image"[^>]*>/gi) === 1,
    "expected exactly one Twitter image",
  );

  const canonical = readCanonical(html);
  const openGraphUrl = readMetaContent(html, "property", "og:url");
  const openGraphImage = readMetaContent(html, "property", "og:image");
  const twitterImage = readMetaContent(html, "name", "twitter:image");
  const siteUrl = new URL(canonical);
  assert(siteUrl.protocol === "https:" && canonical === siteUrl.origin + "/", "canonical URL must be the root HTTPS page");
  assert(openGraphUrl === canonical, "canonical and og:url differ");
  await assertAsset(distDir, sameOriginAsset(openGraphImage, siteUrl.origin, "og:image"));
  assert(openGraphImage === twitterImage, "Open Graph and Twitter images differ");
  assert(readMetaContent(html, "property", "og:image:width") === "1200", "OG image width is not 1200");
  assert(readMetaContent(html, "property", "og:image:height") === "630", "OG image height is not 630");

  const [robots, sitemap] = await Promise.all([
    readFile(path.join(distDir, "robots.txt"), "utf8"),
    readFile(path.join(distDir, "sitemap.xml"), "utf8"),
  ]);
  const siteOrigin = siteUrl.origin;
  assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`), "robots sitemap URL differs from canonical");
  assert(sitemap.includes(`<loc>${canonical}</loc>`), "sitemap URL differs from canonical");

  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert(jsonLdMatches.length === 1, "expected exactly one JSON-LD block");
  const structuredData = JSON.parse(jsonLdMatches[0][1]);
  assert(structuredData["@context"] === "https://schema.org", "invalid JSON-LD context");
  assert(Array.isArray(structuredData["@graph"]), "JSON-LD graph is missing");
  const organization = structuredData["@graph"].find((entry) => entry["@type"] === "Organization");
  const website = structuredData["@graph"].find((entry) => entry["@type"] === "WebSite");
  assert(organization?.url === canonical && organization?.["@id"] === canonical + "#organization",
    "Organization URL and ID must match canonical");
  assert(website?.url === canonical && website?.["@id"] === canonical + "#website",
    "WebSite URL and ID must match canonical");
  assert(website.publisher?.["@id"] === organization["@id"], "WebSite publisher must link to the Organization");
  await assertAsset(distDir, sameOriginAsset(organization.logo, siteOrigin, "Organization logo"));

  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf("</body>", rootStart);
  assert(rootStart >= 0 && bodyEnd > rootStart, "cannot locate prerendered root");
  const prerenderedRoot = html.slice(rootStart, bodyEnd);
  assert(/<h1[\s>]/i.test(prerenderedRoot), "prerendered H1 is missing");
  assert(!/<input\b[^>]*\btype="email"/i.test(prerenderedRoot), "public page still collects e-mail");
  assert(!/lista-oczekujacych|data-js-required="waitlist"/i.test(prerenderedRoot), "obsolete signup link or form in public HTML");
  assert(prerenderedRoot.includes('id="faq"'), "prerendered FAQ is missing");
  assert(prerenderedRoot.includes('class="faq-item" data-open="true"'), "no-JS FAQ is not expanded");
  assert(/class="faq-item-panel"[^>]*aria-hidden="false"/i.test(prerenderedRoot), "no-JS FAQ answers are hidden");
  assert(prerenderedRoot.includes('id="jak-to-dziala"'), "prerendered discovery story is missing");
  const targets = new Set([...prerenderedRoot.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id));
  for (const [, fragment] of prerenderedRoot.matchAll(/\bhref="#([^"]+)"/g)) {
    assert(targets.has(fragment), "unresolved fragment link: #" + fragment);
  }
  const inlineStyles = [...prerenderedRoot.matchAll(/style="([^"]*)"/gi)].map((match) => match[1]);
  assert(
    !inlineStyles.some((style) => /(?:^|;)\s*opacity:\s*0(?:;|\s|$)/i.test(style)),
    "prerendered content contains an opacity: 0 inline style",
  );

  await Promise.all(publicAssets.map((asset) => assertAsset(distDir, asset)));
  const notFound = await readFile(path.join(distDir, "404.html"), "utf8");
  assert(notFound.includes('lang="pl"') && notFound.includes('name="robots" content="noindex"'), "404 must be localized and excluded from indexing");
  assert(notFound.includes("Nie znaleziono strony") && notFound.includes('href="/"'), "404 must explain the error and link to the homepage");
  await verifyReferencedAssets(distDir, notFound);

  const expectedRasterDimensions = [
    ["favicon-48.png", 48, 48, readPngDimensions],
    ["favicon-96.png", 96, 96, readPngDimensions],
    ["apple-touch-icon.png", 180, 180, readPngDimensions],
    ["landing/og-od-swoich.jpg", 1200, 630, readJpegDimensions],
  ];

  for (const [relativePath, expectedWidth, expectedHeight, readDimensions] of expectedRasterDimensions) {
    const buffer = await readFile(path.join(distDir, ...relativePath.split("/")));
    const { width, height } = readDimensions(buffer);
    assert(width === expectedWidth && height === expectedHeight, `${relativePath} has ${width}x${height}`);
  }

  return { indexPath };
}

const isDirectRun = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
  : false;

if (isDirectRun) {
  const { indexPath } = await verifyDist();
  console.log(`Verified prerendered HTML: ${indexPath}`);
}

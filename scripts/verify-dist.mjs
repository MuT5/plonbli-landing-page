import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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
  assert(canonical.startsWith("https://"), "canonical URL must be absolute HTTPS");
  assert(openGraphUrl === canonical, "canonical and og:url differ");
  assert(openGraphImage.startsWith("https://"), "og:image must be absolute HTTPS");
  assert(openGraphImage === twitterImage, "Open Graph and Twitter images differ");
  assert(readMetaContent(html, "property", "og:image:width") === "1200", "OG image width is not 1200");
  assert(readMetaContent(html, "property", "og:image:height") === "630", "OG image height is not 630");

  const [robots, sitemap] = await Promise.all([
    readFile(path.join(distDir, "robots.txt"), "utf8"),
    readFile(path.join(distDir, "sitemap.xml"), "utf8"),
  ]);
  const siteOrigin = new URL(canonical).origin;
  assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`), "robots sitemap URL differs from canonical");
  assert(sitemap.includes(`<loc>${canonical}</loc>`), "sitemap URL differs from canonical");

  const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert(jsonLdMatches.length === 1, "expected exactly one JSON-LD block");
  const structuredData = JSON.parse(jsonLdMatches[0][1]);
  assert(structuredData["@context"] === "https://schema.org", "invalid JSON-LD context");
  assert(Array.isArray(structuredData["@graph"]), "JSON-LD graph is missing");

  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf("</body>", rootStart);
  assert(rootStart >= 0 && bodyEnd > rootStart, "cannot locate prerendered root");
  const prerenderedRoot = html.slice(rootStart, bodyEnd);
  assert(/<h1[\s>]/i.test(prerenderedRoot), "prerendered H1 is missing");
  assert(/<form[\s>]/i.test(prerenderedRoot), "prerendered waitlist form is missing");
  assert(
    /<form[^>]*data-js-required="waitlist"[^>]*hidden/i.test(prerenderedRoot),
    "no-JS waitlist form is not safely disabled",
  );
  assert(prerenderedRoot.includes("waitlist-noscript-fallback"), "no-JS waitlist explanation is missing");
  assert(prerenderedRoot.includes('id="faq"'), "prerendered FAQ is missing");
  assert(prerenderedRoot.includes('class="faq-item" data-open="true"'), "no-JS FAQ is not expanded");
  assert(/class="faq-item-panel"[^>]*aria-hidden="false"/i.test(prerenderedRoot), "no-JS FAQ answers are hidden");
  assert(prerenderedRoot.includes('id="lista-oczekujacych"'), "prerendered waitlist section is missing");
  const inlineStyles = [...prerenderedRoot.matchAll(/style="([^"]*)"/gi)].map((match) => match[1]);
  assert(
    !inlineStyles.some((style) => /(?:^|;)\s*opacity:\s*0(?:;|\s|$)/i.test(style)),
    "prerendered content contains an opacity: 0 inline style",
  );

  const requiredAssets = [
    "favicon.ico",
    "favicon-48.png",
    "favicon-96.png",
    "apple-touch-icon.png",
    "plonbli-logo-96.webp",
    "plonbli-logo-192.webp",
    "landing/og-plonbli-logo.jpg",
    "landing/hero-storybook-768.avif",
    "landing/hero-storybook-768.webp",
    "landing/hero-storybook-1280.avif",
    "landing/hero-storybook-1280.webp",
    "landing/hero-storybook-1536.avif",
    "landing/hero-storybook-1536.webp",
    "landing/hero-storybook-mobile-768.avif",
    "landing/hero-storybook-mobile-768.webp",
    "landing/hero-storybook-mobile-1024.avif",
    "landing/hero-storybook-mobile-1024.webp",
    "fonts/alegreya-600-700-latin.woff2",
    "fonts/alegreya-600-700-latin-ext.woff2",
    "fonts/alegreya-sans-400-latin.woff2",
    "fonts/alegreya-sans-400-latin-ext.woff2",
    "fonts/alegreya-sans-500-latin.woff2",
    "fonts/alegreya-sans-500-latin-ext.woff2",
    "fonts/alegreya-sans-700-latin.woff2",
    "fonts/alegreya-sans-700-latin-ext.woff2",
    "fonts/alegreya-sans-800-latin.woff2",
    "fonts/alegreya-sans-800-latin-ext.woff2",
  ];
  await Promise.all(requiredAssets.map((asset) => assertAsset(distDir, asset)));

  const expectedRasterDimensions = [
    ["favicon-48.png", 48, 48, readPngDimensions],
    ["favicon-96.png", 96, 96, readPngDimensions],
    ["apple-touch-icon.png", 180, 180, readPngDimensions],
    ["landing/og-plonbli-logo.jpg", 1200, 630, readJpegDimensions],
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

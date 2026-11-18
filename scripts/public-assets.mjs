// Only reviewed files from public/ are published. Local art experiments stay local.
export const publicAssets = Object.freeze([
  "404.html",
  "favicon.ico",
  "favicon-48.png",
  "favicon-96.png",
  "apple-touch-icon.png",
  "od-swoich-pin-96.webp",
  "od-swoich-pin-192.webp",
  "landing/og-od-swoich.jpg",
  ...Object.entries({
    morning: [768, 1280, 1536],
    "morning-portrait": [640, 960],
    entry: [640, 960],
    harvest: [640, 960],
    meeting: [640, 960],
  }).flatMap(([view, widths]) => widths.flatMap((width) =>
    ["avif", "webp"].map((extension) => `landing/atlas-garden-${view}-${width}.${extension}`))),
  "fonts/source-sans-3-latin.woff2",
  "fonts/source-sans-3-latin-ext.woff2",
  "fonts/OFL-Source-Sans-3.txt",
  "fonts/alegreya-600-700-latin.woff2",
  "fonts/alegreya-600-700-latin-ext.woff2",
  "fonts/OFL-Alegreya.txt",
]);

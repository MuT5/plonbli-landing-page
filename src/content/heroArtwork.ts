// A new atlas edition supplies its reviewed asset set here, without changing the hero layout.
// Import exact variants rather than a directory-wide glob: draft illustrations stay private.
const heroImages = import.meta.glob<string>(
  "/public/landing/atlas-garden-morning-{768,1280,1536,portrait-640,portrait-960}.{avif,webp}",
  { eager: true, query: "?url", import: "default" },
);

export function heroImageUrl(stem: string, width: number, ext: string) {
  const url = heroImages[`/public/${stem}-${width}.${ext}`];
  if (!url) throw new Error(`Missing hero image: ${stem}-${width}.${ext}`);
  return url;
}

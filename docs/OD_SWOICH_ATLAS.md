# Od Swoich | Local atlas

The site uses a series of watercolors of a fictional Polish vegetable farm to illustrate discovery, availability and direct contact. The scenes are not partner listings. The official logo remains the supplied artwork.

## Product and copy guardrails

- Od Swoich helps people find local places and view offers in the app before planning a visit. Local food is the current edition; keep the shared layout and copy ready for other categories.
- The app helps people discover places and contact them directly. It does not process orders or take payments. Do not promise that a place or product was verified unless the product actually provides that assurance.
- This site introduces the app. Do not add signup forms, a waitlist, claims that the app is available today, or links to test environments.
- Keep the copy practical and warm. Say what a visitor can learn or decide at each step.

## Editing content

- Set display titles in the local Alegreya serif; use Source Sans 3 for reading text, small labels and navigation. Both include Polish diacritics. See `public/fonts` for the licenses.
- The footer links to the confirmed [X profile](https://x.com/odswoich) and [Telegram community group](https://t.me/Plonbligrupa). Keep them in `src/config/siteMetadata.ts`; only identity profiles belong in the Organization markup. The Telegram group URL is the only approved legacy brand reference in the build.

- Change the current category in `src/content/launchCategory.ts`. The evergreen brand promise, step titles and layout stay the same. The ceramics fixture in the content tests is intentionally not shipped as a public category.
- The canonical section hash is `#dla-lokalnych-miejsc`. Keep the adjacent `#dla-gospodarstw` anchor working for old links.
- The lead picture uses desktop widths 768/1280/1536 and portrait widths 640/960. Each story step has 640/960 AVIF and WebP assets. Image descriptions and captions must describe what is actually in the frame.

## Farm illustration series

The opening spread uses the approved harvest watercolor. All three story illustrations use the same opening illustration as the visual reference. The entry scene, detail of the day's harvest and conversation at collection are separate paintings rather than crops. The same assets also supply the ambient chapters and the static reduced-motion layout.

Run `python scripts/prepare-atlas-images.py MORNING.png ENTRY.png HARVEST.png MEETING.png FULL_LOGO.png` to export the responsive assets in `public/landing/atlas-garden-*` and the 1200 × 630 sharing card. Mobile and desktop variants of the opening illustration retain the full composition.

### Generation prompts for the three steps

Each prompt consists of the shared direction followed by the corresponding scene:

> Use case: illustration-story. Create one new standalone horizontal 3:2 plate for a three-step story on a Polish vegetable farm. Image 1 is the exact approved visual reference for the same location, medium, pens, palette and paper. Match that warm, natural storybook watercolor: fine sepia pencil contours and detailed foliage, thin transparent olive and meadow-green washes, sunlit pale ochre, warm ivory paper and airy blue-grey sky, edges of pigment gently dissolving near some corners. No photography, no flat poster/vector, no glossy digital painting. Present-day Poland, late summer. Retain the modest plaster farmhouse with grey pitched roof, red brick farm building, low translucent polytunnel and apple tree wherever in view. Vegetables are the subject, everyday unposed human actions. A new composition rather than a crop or duplicate of the hero. Put key subjects safely in the central area for narrower mobile screens. No typography, prices, street numbers, logo, labels, frames, collage or watermark.

**entry**

> Plate 01, discovering a place: view approaching from the gravel lane just outside an open simple farm gate, looking into the yard; the track bends inward past carrot beds to the same plaster house and red brick barn. Apple canopy on one side, a glimpse of polytunnel to the right. Frame the invitation to enter, with the lane and gate as the focal point near centre, five times further back than a portrait. At most one very small distant worker beside the field. Wide, quiet establishing scene; do not show a foreground group of workers or hands.

**harvest**

> Plate 02, seeing what is available: close observational study from just above soil level, an adult farmer's two working hands lay a bunch of freshly lifted orange carrots into a low weathered wooden produce crate beside two ruby beets with leaves and pale green kohlrabi. Fine roots, a little soil, fine botanical details in delicate brushwork. Crop the figure naturally to forearms and rolled work sleeves; the carrot bunch, hands and crate are centered. The garden is only softly suggested behind the produce. No posed display. The vegetables fill the canvas so the crop reads immediately at small size.

**meeting**

> Plate 03, direct conversation at collection: intimate medium two-shot of the same blonde woman grower in a faded muted lavender working shirt with hair tied back, from the hero art, speaking to a male neighbour in a faded blue overshirt. Side on, focused on one another, unposed, one gestures naturally toward freshly gathered vegetables on a rough wooden farm table. Both faces, gesturing hand and vegetables visible around the centre of the illustration, woman left, neighbour right. A crate of carrots in front, same red brick outbuilding with wooden doors and glimpse of a low polytunnel behind. No one looks to the viewer, no payments, cash or shop. Emphasize a genuine exchange after harvest. Illustrate with the same soft hand-rendered faces, delicate washes and warm pencil as the reference, not a realistic photo.

## Production release

1. Build with `https://odswoich.pl` as the canonical origin. Check canonical, Open Graph/Twitter image and logo URLs, JSON-LD, robots and sitemap in `dist`.
2. In Netlify, attach `odswoich.pl`, point its DNS to the project and confirm HTTPS. Custom domains are configured in Netlify rather than in the build output. No environment variables are needed.
3. Smoke-test navigation and FAQ, check the sharing card and submit the new sitemap. If the old domain is also being retired, set up permanent redirects separately and preserve paths and queries.

## Production audit

- Validate the exact build with `npm run lint -- --max-warnings=0`, `npm run typecheck`, `npm test`, `npm run build`, `npm run verify:dist` and `npm run test:e2e:run` (Chromium and WebKit).
- Review the first screen, illustrations, and both directions of the scroll story on narrow mobile and desktop. Check keyboard navigation, no-JavaScript mode, reduced motion, and FAQ expansion and collapse.
- Keep `scripts/public-assets.mjs` in sync when introducing a public file. The build packages only this list plus generated outputs and rejects unapproved files, broken asset references, and legacy branding in the HTML/CSS/JS.
- Check the live site separately from CI: a trusted HTTPS certificate for both hostnames, the `www` redirect, canonical links, sitemap, sharing card, and a missing path returning the branded 404. GitHub Actions does not verify DNS, certificates, or the Netlify project.
- Run `npm audit --omit=dev` for runtime dependencies and review the full npm audit separately. Do not apply forced upgrades of the build/test toolchain without revalidating the build and both browser projects.

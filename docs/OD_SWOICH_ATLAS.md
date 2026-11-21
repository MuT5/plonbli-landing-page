# Od Swoich | Local atlas

The site uses a series of watercolors of a fictional Polish vegetable farm to illustrate discovery, availability and direct contact. The scenes are not partner listings. The official logo remains the supplied artwork.

## Product and copy guardrails

- Od Swoich helps people find local places and view offers in the app before planning a visit. Local food is the current edition; keep the shared layout and copy ready for other categories.
- The app helps people discover places and contact them directly. It does not process orders or take payments. Do not promise that a place or product was verified unless the product actually provides that assurance.
- This site introduces the app. Do not add signup forms, a waitlist, claims that the app is available today, or links to test environments.
- Until public launch, both hero links explain the journey, not an available map. Keep the status in the local-places section and FAQ in sync. When submissions open, replace the notice in both places with the confirmed submission path.
- Keep the copy practical and warm. Say what a visitor can learn or decide at each step.

## Editing content

- Set display titles in the local Alegreya serif; use Source Sans 3 for reading text, small labels and navigation. Both include Polish diacritics. See `public/fonts` for the licenses.
- The footer links to the confirmed [X profile](https://x.com/odswoich) and [Telegram community group](https://t.me/Plonbligrupa). Keep them in `src/config/siteMetadata.ts`; only identity profiles belong in the Organization markup. The Telegram group URL is the only approved legacy brand reference in the build.

- Change the current category in `src/content/launchCategory.ts`. The evergreen brand promise, step titles and layout stay the same. The ceramics fixture in the content tests is intentionally not shipped as a public category.
- The canonical section hash is `#dla-lokalnych-miejsc`. Keep the adjacent `#dla-gospodarstw` anchor working for old links.
- The lead picture uses desktop widths 768/1280/1536 and portrait widths 640/960. Each story step has 640/960 AVIF and WebP assets. Image descriptions and captions must describe what is actually in the frame.
- When replacing the cover, update the reviewed variants in `src/content/heroArtwork.ts`. Serve fingerprinted cover and font URLs with long caching; keep HTML and stable asset aliases revalidatable.

## Farm illustration series

The opening spread uses the approved harvest watercolor. All three story illustrations use the same opening illustration as the visual reference. The entry scene, detail of the day's harvest and conversation at collection are separate paintings rather than crops. Step 01 uses a phone variant in both the scroll story and its reduced-motion layout. Ambient chapter backgrounds keep the original paintings.

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

### Discovery step: phone variant

Built-in ImageGen edited the original entry watercolor. The phone shows an illustrative map and a fictional listing for the farm in the picture; it is not a screenshot of a live app or a link to one. Export the selected edit with `python scripts/prepare-atlas-images.py --entry-phone ENTRY_PHONE.png`. This produces only the four approved `public/landing/atlas-garden-entry-phone-*` assets and preserves the original entry plate.

Initial prompt (edit target: the original entry watercolor):

> Use case: precise-object-edit.
>
> Asset type: horizontal 3:2 editorial watercolor for step 1 of the Od Swoich landing page.
>
> Input images: Image 1 is the edit target and the exact farm that must stay recognisable.
>
> Primary request: add a single naturally held smartphone in the foreground showing the illustrated Od Swoich app locating this very farm. Change only the addition; preserve the original late-summer Polish farm scene, same angle, palette, watercolor-and-pencil grain, and soft ivory edges. Keep the apple tree, cream farmhouse, brick barn, polytunnel, dirt lane, and right-hand gate visibly recognizable; no new backgrounds or objects.
>
> Composition: portrait handset, facing camera almost straight with a very slight natural tilt, modest dark forest-green bezel, held well left of center around x=30% and y=57%, phone about 50% of the frame height, whole screen visibly inside the inner 74% of the canvas for a narrower mobile crop. The hand and plain oat linen sleeve enter naturally from the lower left, realistic proportions and grip with fingers mostly behind the device and not blocking the display. Keep the lane visible on the right of the phone and the lower left corner quiet for the website’s small route diagram. The farm should remain larger and visually richer than the handset.
>
> Screen: clear warm-white interface and a simple map of THIS lane and the field parcels in front of the cream house and brick barn, one high-contrast golden pin at the farm. The bottom info card includes a tiny watercolor thumbnail recognizable as the same cream house and red brick barn visible behind the phone. Large restful shapes, no tiny controls. The only screen text, rendered accurately in clean dark green lettering, is “Od Swoich” and “Gospodarstwo warzywne”. No mock status text, badges, ratings, prices, addresses, other brands, or fake route instructions. Keep the screen softly luminous, not glossy or photorealistic; use tidy painted edges that fit the scene. No watermarks, borders, split scenes or canvas text. Output one full landscape watercolor composition.

Final refinement (edit target: the phone illustration from the first pass; visual reference: the supplied Od Swoich pin):

> Use case: precise-object-edit. Image 1 is the approved landscape watercolor with a hand holding a smartphone at a Polish farm entrance: edit this exact image. Image 2 is the official Od Swoich pin icon (reference only, green pin with white landscape, yellow sun, house and fields). Change only the tiny two-leaf symbol at the top of the handset screen, centered directly above the words “Od Swoich”. Replace that symbol with a faithful small version of Image 2, at the same visual scale and aligned with the existing heading. Keep the logo's recognizable green map-pin shape, white interior, yellow sun and small house. Do not place any icon outside the handset. Preserve literally everything else in Image 1 including crop, handset tilt and dimensions, hand, color and lighting, full original landscape, golden farm pin on the phone map, thumbnail, and the exact readable Polish strings “Od Swoich” and “Gospodarstwo warzywne”. Do not reformat the phone screen or retouch the background. No new text or icons. One horizontal 3:2 image.

## Production release

1. Build with `https://odswoich.pl` as the canonical origin. Check canonical, Open Graph/Twitter image and logo URLs, JSON-LD, robots and sitemap in `dist`.
2. In Netlify, attach `odswoich.pl`, point its DNS to the project and confirm HTTPS. Custom domains are configured in Netlify rather than in the build output. No environment variables are needed.
3. Smoke-test navigation and FAQ, check the sharing card and submit the new sitemap. If the old domain is also being retired, set up permanent redirects separately and preserve paths and queries.

## Production audit

- Validate the exact build with `npm run lint -- --max-warnings=0`, `npm run typecheck`, `npm test`, `npm run build`, `npm run verify:dist` and `npm run test:e2e:run` (Chromium and WebKit).
- Review the first screen, illustrations, and both directions of the scroll story on narrow mobile and desktop. Check keyboard navigation, no-JavaScript mode, reduced motion, and FAQ expansion and collapse.
- On mobile, pause halfway through each photo transition. Only the images should crossfade; the description must remain opaque on a solid surface and meet 4.5:1 contrast.
- Keep `scripts/public-assets.mjs` in sync when introducing a public file. The build packages only this list plus generated outputs and rejects unapproved files, broken asset references, and legacy branding in the HTML/CSS/JS.
- Check the live site separately from CI: a trusted HTTPS certificate for both hostnames, the `www` redirect, canonical links, sitemap, sharing card, and a missing path returning the branded 404. GitHub Actions does not verify DNS, certificates, or the Netlify project.
- Run `npm audit --omit=dev` for runtime dependencies and review the full npm audit separately. Do not apply forced upgrades of the build/test toolchain without revalidating the build and both browser projects.

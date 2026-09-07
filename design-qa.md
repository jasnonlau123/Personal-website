# Design QA: 城市文字记忆

## Source truth

- Primary project board: `/Users/jasonlau/Downloads/7565966b-315e-43b0-a0d1-93b59a1016ae.png` (1024 x 1536 px).
- Browser Comment 1 reference: Apple Photos-style depth gallery with a dominant center image and perspective side previews.
- Browser Comment 2 reference: dotted China map with city markers and an adjacent city image strip.
- Generated map asset: `网页素材/文化传播-城市文字记忆/china-city-map-dots.png` (1536 x 1024 px).

## Implementation evidence

- Runtime URL used only for QA: `http://127.0.0.1:4173/city-text-memory.html?v=20260907-3`.
- User-facing page: `file:///Users/jasonlau/Documents/个人网站/city-text-memory.html`.
- Implementation screenshots: Codex in-app browser runtime captures from tab 8; desktop default viewport and mobile 390 x 844 CSS px at device scale factor 1.
- State: gallery default and advanced image states, city map, footer, and mobile responsive states.

## Full-view comparison

- The page retains the reference board's restrained black, white, and pale-gray editorial system.
- The archive browser now uses a dominant center image with progressively smaller, perspective-rotated side images instead of a flat row.
- The city section replaces the bordered city table with a light-gray dotted China map and geographically positioned interactive city markers.
- The title reads `WHERE / TYPE / LIVE`, preserving the reference's three-line hierarchy.
- The footer social row matches the homepage's centered inline alignment.

## Focused comparison

- Gallery: center image is 52% desktop width and 76% mobile width; side images overlap in depth without flattening into a grid. Arrow, side-image, keyboard, and drag navigation remain available.
- Map: markers for 北京、济南、青岛、上海、广州、淄博、西安、成都 are readable and select the corresponding archive filter.
- Footer: the contact label and four icons share the same 1.8rem alignment box and vertical center.
- Mobile: 390 px viewport has `scrollWidth` 390 px; gallery rail and map are both 350 px wide, with no horizontal page overflow.

## Interaction verification

- Next navigation advanced the archive counter from `01` to `02`.
- Center image opened the lightbox and the close control restored the page.
- 北京 map marker selected the 北京 filter and reduced the archive to `03` matching items.
- The current browser-rendered accessibility tree reports `26` total archive images, the new `城市文字记忆_画板 1.jpg` entry, and matching 淄博 controls in both filter and map sections.
- Browser console warnings/errors: none.

## Comparison history

- P1: original archive browser displayed seven images as a flat strip. Fixed with absolute depth positioning, perspective transforms, center-image dominance, and swipe support. Post-fix evidence shows the layered album composition on desktop and mobile.
- P1: original city section used a bordered city table. Fixed with a dedicated dotted-map image and interactive geographic markers. Post-fix evidence shows the map and city image strip side by side.
- P2: English heading used `WORDS`; changed to `TYPE` and restored the three-line title structure.
- P2: footer icons sat slightly below the contact label. Fixed by sharing a centered 1.8rem alignment box.
- P2: the newly added `城市文字记忆_画板 1.jpg` asset was absent from the archive. Added it as item 26 with temporary copy that can be replaced later.
- P2: the footer WeChat path only rendered one chat bubble. Replaced both page instances with the complete two-bubble homepage icon.
- P2: the city taxonomy still used 深圳. Replaced it with 淄博 across the filter, archive data, and map marker.

## Final result

passed

# ijelly

Six themes for Jellyfin — from Apple TV glass to museum gallery to editorial print. Target Jellyfin Web 10.9+ and 12+ (both Legacy and the new Modern / React-MUI chrome). Tuned for desktop and Samsung Tizen TVs.

---

## Themes

| Theme | File | Direction |
|---|---|---|
| Apple TV | `ijelly.css` | Dark glass, pill nav, spring-physics cards, white primary accents — the native tvOS feel. |
| Cinematheque Noir | `ijelly_noir.css` | Warm sepia, Didone serif titles, brass hairline poster frames, film-grain overlay, italic lowercase sections. |
| Editorial | `ijelly_editorial.css` | Letterboxd × New Yorker. Deep ink, cream, ink-red accent. Serif display, byline metadata, asymmetric first-card-double-wide shelves, pull-quote synopsis. |
| Gallery | `ijelly_gallery.css` | MoMA-wall minimalism. Charcoal walls, cream-matted posters inside gold hairline frames, museum wall-tag captions, opacity-only focus. |
| Blueprint | `ijelly_blueprint.css` | Deep navy-black, ember amber accent, square corners, mono uppercase annotations, dashed borders, blueprint grid overlay. Based on the kontexta.dev dark palette. |
| Poster-Tinted | `ijelly_tinted.css` + `ijelly_tinted.js` | Base dark theme that re-tints the UI accent to the dominant color of the currently focused poster. Needs the companion JS. |

---

## Installation

Dashboard → General → Custom CSS. Pick one of the imports below.

### Apple TV
```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@2/ijelly.css');
```

### Cinematheque Noir
```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@2/ijelly_noir.css');
```

### Editorial
```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@2/ijelly_editorial.css');
```

### Gallery
```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@2/ijelly_gallery.css');
```

### Blueprint
```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@2/ijelly_blueprint.css');
```

### Poster-Tinted
CSS in Dashboard → Custom CSS:
```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@2/ijelly_tinted.css');
```
Companion JS (install via a Tampermonkey userscript, a Jellyfin plugin that permits inline JS, or a reverse-proxy injection). The script reads the dominant color from focused posters and sets `--pt-accent` on `:root`:
```
https://cdn.jsdelivr.net/gh/safiyu/ijelly@2/ijelly_tinted.js
```
If the JS isn't loaded, the CSS still works — accent stays white.

After saving CSS, go to Settings → Display and enable Backdrops.

The `@2` pin tracks the latest `2.x` release tag. See Releases for the changelog.

---

## Preview

Two demo pages ship with the repo: `demo.html` (library home) and `movie.html` (item detail). Clone the repo and serve the directory, then open either page in a browser:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/demo.html — switch themes top-right, swap Home/Movie views top-left.

---

## Compatibility

- Jellyfin Web 10.9+ with Legacy layout: all six themes work.
- Jellyfin Web 12+ with Modern (React/MUI) layout: each theme targets the MUI app bar, drawer, dialog, tab, button, and input components alongside the Legacy rules, so chrome and content both re-skin without a mode toggle. The Apple TV theme additionally maps its tokens onto Jellyfin 12's native `--jf-palette-*` / `--mui-palette-*` variables.
- Samsung Tizen TV app: subtitle OSD lift uses body-class fallbacks + `:has()` as progressive enhancement, so older Tizen firmware degrades gracefully.
- Mobile/tablet (≤1000px width) reduces or disables backdrop blur to avoid GPU stalls on low-power devices.
- Apple TV uses system fonts only. Noir, Editorial, Gallery, Blueprint pull Google Fonts (Playfair Display, Fraunces, Cormorant Garamond, Saira, JetBrains Mono) over `@import`. On offline/LAN-only servers the system fonts take over — the themes still look right, just less distinct.

---

## Customising

Each theme exposes its design tokens as CSS custom properties on `:root`. Override them in your own Custom CSS block, after the `@import`.

| Theme | Token prefix |
|---|---|
| Apple TV | `--apple-*` |
| Cinematheque Noir | `--noir-*` |
| Editorial | `--ed-*` |
| Gallery | `--gl-*` |
| Blueprint | `--kxta-*` |
| Poster-Tinted | `--pt-*` |

Example — swap Apple TV's accent:
```css
:root {
    --apple-accent: #ff375f;
}
```

---

## License

Released under the [MIT License](LICENSE).

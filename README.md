# ijelly

Six themes for Jellyfin. Covers everything from Apple TV glass to museum gallery to editorial print. Targets Jellyfin Web **10.9+** and **12+**, both the Legacy and the new Modern / React-MUI chrome. Tuned for desktop and Samsung Tizen TVs.

## Contents

1. [Themes](#themes)
2. [Installation](#installation)
3. [Preview locally](#preview-locally)
4. [Compatibility](#compatibility)
5. [Customising](#customising)
6. [License](#license)

## Themes

| Theme | File | Direction |
| :--- | :--- | :--- |
| **Apple TV** | `ijelly.css` | Dark glass, pill navigation, spring-physics cards, white primary accents. The native tvOS feel. |
| **Cinematheque Noir** | `ijelly_noir.css` | Warm sepia, Didone serif titles, brass hairline poster frames, film-grain overlay, italic lowercase sections. |
| **Editorial** | `ijelly_editorial.css` | Letterboxd meets The New Yorker. Deep ink, cream, ink-red accent. Serif display, byline metadata, asymmetric shelves, pull-quote synopsis. |
| **Gallery** | `ijelly_gallery.css` | MoMA-wall minimalism. Charcoal walls, cream-matted posters inside gold hairline frames, museum wall-tag captions, opacity-only focus. |
| **Blueprint** | `ijelly_blueprint.css` | Deep navy-black, ember amber accent, square corners, mono uppercase annotations, dashed borders, blueprint grid overlay. Based on the kontexta.dev dark palette. |
| **Poster-Tinted** | `ijelly_tinted.css` + `ijelly_tinted.js` | Base dark theme that re-tints the UI accent to the dominant color of the currently focused poster. Needs the companion script. |

## Installation

Open **Dashboard › General › Custom CSS** and paste one of the imports below. Save, then enable **Settings › Display › Backdrops**.

The `@latest` tag automatically tracks the newest release, so you always get the latest styling fixes and theme updates.

### Apple TV

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly.css');
```

### Cinematheque Noir

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_noir.css');
```

### Editorial

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_editorial.css');
```

### Gallery

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_gallery.css');
```

### Blueprint

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_blueprint.css');
```

### Poster-Tinted

Two parts. First, paste the CSS into **Custom CSS** as above:

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_tinted.css');
```

Then install the companion script, which samples the dominant color from the focused poster and writes it to `--pt-accent` on `:root`. Load it via a Tampermonkey userscript, a Jellyfin plugin that permits inline JS, or a reverse-proxy injection:

```
https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_tinted.js
```

Without the script the CSS still applies, but the accent stays white instead of adapting.

## Preview locally

Two demo pages ship with the repo: `demo.html` for the library home and `movie.html` for the item detail. Clone the repo, serve the directory, then open either page in a browser:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/demo.html`. Switch themes from the top-right chip bar, swap between Home and Movie from the top-left chip bar.

## Compatibility

| Platform | Status |
| :--- | :--- |
| Jellyfin Web 10.9+ (Legacy) | All six themes work. |
| Jellyfin Web 12+ (Modern / React-MUI) | Chrome and content both re-skin without a mode toggle. Each theme targets the MUI app bar, drawer, dialog, tab, button, and input components alongside the Legacy rules. The Apple TV theme additionally maps its tokens onto Jellyfin 12's native `--jf-palette-*` and `--mui-palette-*` variables. |
| Samsung Tizen TV app | Subtitle OSD lift uses body-class fallbacks and `:has()` as a progressive enhancement, so older Tizen firmware degrades gracefully. |
| Mobile and tablet (≤ 1000 px) | Backdrop blur is reduced or disabled to avoid GPU stalls on low-power devices. |

**Fonts:** The Apple TV theme uses the OS system font stack and makes no network requests. Noir, Editorial, Gallery, and Blueprint pull Google Fonts (**Playfair Display**, **Fraunces**, **Cormorant Garamond**, **Saira**, **JetBrains Mono**) over `@import`. On offline or LAN-only servers the system fonts take over automatically. The themes still read correctly, just less distinctive.

## Customising

Each theme exposes its design tokens as CSS custom properties on `:root`. Override them in your own Custom CSS block, placed after the `@import`.

| Theme | Token prefix |
| :--- | :--- |
| Apple TV | `--apple-*` |
| Cinematheque Noir | `--noir-*` |
| Editorial | `--ed-*` |
| Gallery | `--gl-*` |
| Blueprint | `--kxta-*` |
| Poster-Tinted | `--pt-*` |

Example. Swap the Apple TV accent for hot pink:

```css
:root {
    --apple-accent: #ff375f;
}
```

## License

Released under the [MIT License](LICENSE).

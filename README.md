<div align="center">

# ijelly

**Six handcrafted design languages for Jellyfin — transformed with one line of CSS.**

Built for **Jellyfin Web 12+** (Modern React-MUI chrome + legacy views) and tuned for **desktop and Samsung Tizen TVs**. No plugins, no scripts, no server restarts.

[Live Interactive Showcase & Snippet Builder](https://safiyu.github.io/ijelly/) · [Browse Themes](#six-themes) · [1-Line Install](#installation) · [Customize (`:root`)](#customising)

</div>

---

| Stock Jellyfin | ijelly · Blueprint |
| :---: | :---: |
| ![Stock Jellyfin detail page](screenshots/web/stock-detail.jpg) | ![Blueprint detail page](screenshots/web/blueprint-detail.jpg) |

> [!TIP]
> **[Compare all 6 themes interactively on the live showcase →](https://safiyu.github.io/ijelly/#compare)**
> Drag the live before/after slider across all six themes, preview all six animated wormhole loaders, and build a customized `@import` + `:root` snippet in one click.

---

<div align="center">

### Six looks, one paste

![All six ijelly themes at a glance](screenshots/launch-sheet.png)

[Apple TV](#apple-tv) · [Cinematheque Noir](#cinematheque-noir) · [Editorial](#editorial) · [Gallery](#gallery) · [Blueprint](#blueprint) · [Poster-Tinted](#poster-tinted)

</div>

---

## Why ijelly?

Stock Jellyfin works well, yet every server looks identical. **ijelly** completely re-architects Jellyfin's visual hierarchy across every screen using clean, standalone CSS:

- **Full-Surface Restyle in One Line:** Homescreen, `My Media` plaques, movie & show libraries, item detail pages, cast rows, search, login/profile pickers, music player bar, Skip Intro / Skip Credits, Up Next cards, and chapter/trickplay bubbles — all styled seamlessly out of the box.
- **Architect's Lightbox & Chamfered Viewfinder Cards (`v3.4`):** Oversized `My Media` library tiles with crisp geometric chamfer framing and indexed optical counters replace flat default cards across desktop and TV grids.
- **Six Bespoke Homescreen Separators (`v3.5`):** Every theme stamps its own architectural signature across section dividers — from Apple TV's cobalt **Dual-Hairline Horizon** and Gallery's perforated **35mm Filmstrip Rail** to Blueprint's **Chamfered Nameplate Datum**.
- **Signature Detail Hero Horizons (`v3.6`):** Each theme terminates the widescreen detail backdrop into the body with its own custom transition (**Atmospheric Cinema Dissolve**, **Floating Command Island**, **Illuminated Horizon Datum**, **35mm Film-Gate Curtain**, **Architectural Chamfer Horizon**) with action buttons precision-locked to the horizon line.
- **Modular Pro Split-Dock Player OSD (`v3.2–v3.3`):** Pairs a **Full-Width Floating Header Dock** with dual transport & utility islands below a full-bleed scrub bar, plus automatic vertical lift for WebVTT, ASS (`libass`), and HTML subtitles so controls never cover captions.
- **TV-First Speed & Zero-Blur Loaders (`v3.1 / v3.4.2`):** Lightweight zero-blur **Balanced Feather-Silk** wormhole spinners replace Jellyfin's default loader, while reduced-motion hover/focus rules prevent GPU stalls on smart TVs (tested on a 2024 Samsung Neo QLED).
- **Live `:root` Tokens & Feature Toggles:** Change theme accents, blur unwatched episode thumbnails against spoilers, hide card captions for pure poster walls, or resize and reposition subtitles without editing a line of source CSS.

---

<a id="six-themes"></a>

## Themes at a Glance

| Theme | File | Visual Direction | Homescreen Separator | Detail Hero Seam | Best For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [**Apple TV**](#apple-tv) | `ijelly.css` | Obsidian slate, electric azure (`#007aff`), frosted glass controls | **Dual-Hairline Horizon** | **Atmospheric Cinema Dissolve** | Clean, modern streaming-app polish |
| [**Cinematheque Noir**](#cinematheque-noir) | `ijelly_noir.css` | Warm espresso sepia, antique gold (`#d4a24c`), `Playfair Display` | **Refined Vernier Horizon** | **Floating Command Island** | Late-night screening-room atmosphere |
| [**Editorial**](#editorial) | `ijelly_editorial.css` | Deep carbon ink, warm cream type, ink-crimson (`#c8102e`), `Fraunces` | **Optical Viewfinder Brackets** | **Illuminated Horizon Datum** | Film buffs who love magazine typography |
| [**Gallery**](#gallery) | `ijelly_gallery.css` | Curatorial charcoal wall, cream mats, champagne (`#c9a978`), `Cormorant Garamond` | **35mm Filmstrip Rail** | **35mm Film-Gate Curtain** | Museum-wall art-house presentation |
| [**Blueprint**](#blueprint) | `ijelly_blueprint.css` | Navy-black drafting grid, ember amber (`#E09030`), `Saira` & `JetBrains Mono` | **Chamfered Nameplate Datum** | **Architectural Chamfer Horizon** | Precision HUD aesthetics & crisp scannability |
| [**Poster-Tinted**](#poster-tinted) | `ijelly_tinted.css` | Pitch-black chrome (`#ffffff`); backdrops & poster art supply all color via CSS | **Monolith Plinth & Fade Rule** | **Atmospheric Cinema Dissolve** | Pure ambient poster glow with zero scripts |

---

### Apple TV

Obsidian slate meets vibrant cobalt azure (`#007aff`), pairing crisp Chamfered Viewfinder grids and **Dual-Hairline Horizon** section rules with a **Seamless Atmospheric Dissolve** on detail pages. On playback, a frosted **Full-Width Floating Header Dock** and **Modular Pro Split-Dock** keep controls effortless and tactile on both mouse and TV remote.

| Home | Library |
| :---: | :---: |
| ![Apple TV homescreen](screenshots/web/apple-home.jpg) | ![Apple TV library](screenshots/web/apple-library.jpg) |
| **Detail** | **Player** |
| ![Apple TV detail](screenshots/web/apple-detail.jpg) | ![Apple TV player](screenshots/web/apple-player.jpg) |

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly.css');
```

---

### Cinematheque Noir

An intimate sepia darkroom bathed in brushed brass (`#d4a24c`), pairing tracked uppercase gold navigation with `Playfair Display` serif titles and numbered **Refined Vernier Horizon** section ticks. Detail pages elevate playback and library actions onto a bordered **Floating Command Island** straddling the hero horizon.

| Home | Library |
| :---: | :---: |
| ![Cinematheque Noir homescreen](screenshots/web/noir-home.jpg) | ![Cinematheque Noir library](screenshots/web/noir-library.jpg) |
| **Detail** | **Player** |
| ![Cinematheque Noir detail](screenshots/web/noir-detail.jpg) | ![Cinematheque Noir player](screenshots/web/noir-player.jpg) |

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_noir.css');
```

---

### Editorial

Sharp ink-crimson (`#c8102e`) precision over deep charcoal black, marrying crisp **Optical Viewfinder Brackets** and dotted hairline rules on the homescreen with expressive `Fraunces` display typography. Detail pages lock a vivid crimson square play button directly over an **Illuminated Horizon Datum** beneath the backdrop banner.

| Home | Library |
| :---: | :---: |
| ![Editorial homescreen](screenshots/web/editorial-home.jpg) | ![Editorial library](screenshots/web/editorial-library.jpg) |
| **Detail** | **Player** |
| ![Editorial detail](screenshots/web/editorial-detail.jpg) | ![Editorial player](screenshots/web/editorial-player.jpg) |

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_editorial.css');
```

---

### Gallery

Designed like a darkened exhibition wing: spaced champagne-gold (`#c9a978`) walls frame artwork in `Cormorant Garamond` italics and mount detail posters inside museum-grade cream mats (`#f3ede1`). Perforated **35mm Filmstrip Rails** run cleanly across homescreen reels and the detail hero's **Film-Gate Curtain** seam.

| Home | Library |
| :---: | :---: |
| ![Gallery homescreen](screenshots/web/gallery-home.jpg) | ![Gallery library](screenshots/web/gallery-library.jpg) |
| **Detail** | **Player** |
| ![Gallery detail](screenshots/web/gallery-detail.jpg) | ![Gallery player](screenshots/web/gallery-player.jpg) |

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_gallery.css');
```

---

### Blueprint

Engineered over a faint midnight drafting grid (`#070b12`) with high-visibility ember amber (`#E09030`), angular 45° corner chamfers, and technical `Saira` + `JetBrains Mono` readouts. Homescreen rows snap to **Chamfered Nameplate Datums**, while detail banners terminate in a stepped **45° Architectural Chamfer Horizon**.

| Home | Library |
| :---: | :---: |
| ![Blueprint homescreen](screenshots/web/blueprint-home.jpg) | ![Blueprint library](screenshots/web/blueprint-library.jpg) |
| **Detail** | **Player** |
| ![Blueprint detail](screenshots/web/blueprint-detail.jpg) | ![Blueprint player](screenshots/web/blueprint-player.jpg) |

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_blueprint.css');
```

---

### Poster-Tinted

Pure obsidian monochrome UI where the movies themselves become the palette — zero JavaScript required. Focused posters inherit a radial halo of their own artwork via CSS (`background-image: inherit`), blurred backdrops tint library walls, and stark white **Monolith Plinths** frame each section so every still breathes on TV and desktop alike.

| Home | Library |
| :---: | :---: |
| ![Poster-Tinted homescreen](screenshots/web/tinted-home.jpg) | ![Poster-Tinted library](screenshots/web/tinted-library.jpg) |
| **Detail** | **Player** |
| ![Poster-Tinted detail](screenshots/web/tinted-detail.jpg) | ![Poster-Tinted player](screenshots/web/tinted-player.jpg) |

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_tinted.css');
```

---

## Installation

1. In Jellyfin, open **Dashboard › General › Custom CSS**.
2. Paste the `@import` line for the theme you want (copy any box above or build a custom snippet on the [showcase page](https://safiyu.github.io/ijelly/#customize)).
3. Click **Save**, then enable **Settings › Display › Backdrops** so detail hero banners and ambient backgrounds appear.

The `@latest` tag tracks the newest release. jsDelivr caches `@latest`, so to pin an exact immutable build, replace `@latest` with a release tag such as `@3.6.1`:

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@3.6.1/ijelly_blueprint.css');
```

### Refreshing the cache

If `@latest` still serves an older cached release right after an update, open the jsDelivr purge endpoint for your theme file:

```
https://purge.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_gallery.css
```

## TV layout

Every theme ships dedicated rules for Jellyfin TV mode (**Settings › Display › Layout › TV**), including the Samsung Tizen client:

- **Detail page:** Desktop-parity composition — widescreen backdrop banner, poster overlapping the theme's horizon seam, focus-safe action bar beside the poster, then title and synopsis.
- **Home and library:** Safe overscan margins, six evenly scaled posters per row, Chamfered Viewfinder cards, and lightweight hover/focus transitions so D-pad navigation stays instant on TV hardware.
- **Player OSD:** Full-width top Floating Header Dock paired with Modular Pro dual islands below a full-bleed seek bar, plus automatic subtitle lift above the control deck.
- **Tizen tip:** Keep the Jellyfin app on your TV up to date; older Tizen client releases ship older DOM structures that render pages differently from Jellyfin Web 12+.

## Showcase page

[index.html](index.html) is a self-contained interactive showcase of all six themes featuring the stock-vs-theme comparison slider, animated loader preview strip, 4-shot high-res galleries per theme, and a live `:root` custom CSS snippet generator. Preview it locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

[launch.html](launch.html) renders a 2400 px summary grid of all six themes for social cards and release posts (`launch.html?full` for native 2400 px scale, exported to [screenshots/launch-sheet.png](screenshots/launch-sheet.png)).

## Compatibility

| Platform | Status |
| :--- | :--- |
| **Jellyfin Web 12+ (Modern / React-MUI)** | Styles both the MUI app bar, drawers, dialogs, tabs, buttons, and inputs alongside legacy detail, library, search, and OSD views with zero toggle required. Apple TV also maps tokens onto `--jf-palette-*` and `--mui-palette-*`. |
| **Samsung Tizen TV app** | Verified on a 2024 Samsung Neo QLED. Subtitle OSD lift uses body-class fallbacks and progressive `:has()` enhancement. |
| **Mobile and tablet (≤ 1000 px)** | Automatically reduces or disables expensive backdrop blurs to keep scrolling smooth on lower-power GPUs. |

Older Jellyfin versions are not tested.

**Self-contained fonts:** Apple TV uses the native OS system font stack (`-apple-system`, `SF Pro Display`, system UI) and performs zero external font requests. Noir, Editorial, Gallery, and Blueprint load static `@fontsource` `.woff2` files (**Playfair Display**, **Fraunces**, **Inter**, **Cormorant Garamond**, **Saira**, **JetBrains Mono**) directly from jsDelivr — the same CDN serving the CSS — avoiding Google Fonts requests and variable fonts that older Smart TV WebKit engines can choke on.

## Customising

Every theme works cleanly out of the box across libraries, detail pages, Modular Pro player OSDs, **Skip Intro / Skip Credits**, **Up Next**, **Trickplay / Chapter** bubbles, login & profile pickers, the bottom **Music player bar**, and **Search**.

To tune colors or behavior without forking a file, override CSS custom properties on `:root` right below your `@import`:

| Theme | Accent token prefix |
| :--- | :--- |
| Apple TV | `--apple-*` |
| Cinematheque Noir | `--noir-*` |
| Editorial | `--ed-*` |
| Gallery | `--gl-*` |
| Blueprint | `--kxta-*` |
| Poster-Tinted | `--pt-*` |

### Feature toggles (`:root`)

| Property | Default | Example override | What it does |
| :--- | :--- | :--- | :--- |
| `--spoiler-blur` | `0px` | `16px` | Blurs unwatched episode thumbnails until hovered; watched episodes stay sharp |
| `--card-labels` | `block` | `none` | Hides titles below library cards for a clean poster wall (keeps login profile names visible) |
| `--sub-size` | `100%` | `120%` | Scales HTML & WebVTT subtitle size relative to player base |
| `--sub-color` | Theme text | `#ffeb85` | Overrides subtitle text color (`::cue` and HTML subtitle spans) |
| `--sub-bg` | Theme dark tint | `rgba(0, 0, 0, 0.75)` | Overrides subtitle caption background tint |
| `--sub-offset` | `0px` | `-1.5rem` | Fine-tunes subtitle vertical position; composes with automatic OSD lift |

Example — swap Blueprint to a cobalt cyan accent, enable spoiler blur, hide card titles, and nudge TV subtitles slightly higher:

```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@latest/ijelly_blueprint.css');

:root {
    --kxta-accent: #38bdf8;
    --spoiler-blur: 16px;
    --card-labels: none;
    --sub-size: 115%;
    --sub-offset: -1.5rem;
}
```

Or generate a ready-to-paste snippet interactively on the [showcase customizer](https://safiyu.github.io/ijelly/#customize).

## License

Released under the [MIT License](LICENSE).

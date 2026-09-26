# 📚 ijelly — Theming Reference

> Distilled from the live Jellyfin 12.0 source code (`jellyfin/jellyfin-web@master`) and
> community theme research. Use this as a lookup guide for future development.

---

## 1. Jellyfin Version Compatibility Matrix

| Feature | JF 10.8 | JF 10.9 | JF 12.0 |
|---|:---:|:---:|:---:|
| `--theme-*` variables | ✅ | ✅ | ⚠️ partial |
| `--jf-palette-*` variables | ❌ | ⚠️ partial | ✅ |
| `--mui-palette-*` variables | ❌ | ❌ | ✅ |
| `.skinHeader` class | ✅ | ✅ | ✅ legacy |
| `.MuiAppBar-root` class | ❌ | ❌ | ✅ |
| `.emby-tab-button` | ✅ | ✅ | ✅ legacy |
| `.MuiTab-root` | ❌ | ❌ | ✅ |
| `.mainDrawer` | ✅ | ✅ | ✅ legacy |
| `.MuiDrawer-paper` | ❌ | ❌ | ✅ |
| `.detailRibbon` | ✅ | ✅ | ✅ |
| CSS `:has()` support | ⚠️ | ✅ | ✅ |
| MUI CSS-vars mode | ❌ | ❌ | ✅ |

> **JF 12** defaults to the "Modern" layout but keeps "Legacy" as an option.
> Always target both old and new selectors side-by-side.

---

## 2. Jellyfin 12.0 Native CSS Variable System

### Source location
`jellyfin/jellyfin-web` → `src/themes/_base/_theme.scss` + `src/themes/_base/_palette.scss`

### Base palette defaults (`_palette.scss`)
```scss
$common-white:          #fff
$background-default:    #101010
$background-paper:      #202020
$primary-main:          #00a4dc   /* Jellyfin teal */
$primary-dark:          #00729a
$primary-light:         #33b6e3
$primary-hover:         rgba(0, 164, 220, 0.2)
$error-main:            #c62828
```

### SCSS theme variables (`_theme.scss`) → compiled as `--jf-palette-*`

| SCSS var | CSS custom property | Purpose |
|---|---|---|
| `$background-default` | `--jf-palette-background-default` | Page background |
| `$background-defaultImage` | `--jf-palette-background-defaultImage` | BG image (none by default) |
| `$background-paper` | `--jf-palette-background-paper` | Surface/card background |
| `$primary-main` | `--jf-palette-primary-main` | Primary accent color |
| `$primary-dark` | `--jf-palette-primary-dark` | Darker primary |
| `$primary-light` | `--jf-palette-primary-light` | Lighter primary |
| `$secondary-main` | `--jf-palette-secondary-main` | Secondary accent |
| `$text-primary` | `--jf-palette-text-primary` | Main text |
| `$text-secondary` | `--jf-palette-text-secondary` | Dimmed text |
| `$divider` | `--jf-palette-divider` | Separator lines |
| `$action-focus` | `--jf-palette-action-focus` | Focus state overlay |
| `$action-hover` | `--jf-palette-action-hover` | Hover state overlay |
| `$appBar-defaultBg` | `--jf-palette-AppBar-defaultBg` | Header background |
| `$appBar-transparentBg` | `--jf-palette-AppBar-transparentBg` | Transparent header bg |
| `$appBar-gradient` | `--jf-palette-AppBar-gradient` | Header gradient overlay |
| `$card-borderRadius` | `--jf-card-borderRadius` | Card corner radius |
| `$surface-overlay` | `--jf-palette-surface-overlay` | Legacy surface bg |

### MUI v6 CSS-vars mode (`--mui-palette-*`)
MUI v6 exposes its theme tokens as `--mui-palette-*` at runtime:
```css
--mui-palette-background-default
--mui-palette-background-paper
--mui-palette-primary-main
--mui-palette-secondary-main
--mui-palette-text-primary
--mui-palette-text-secondary
--mui-palette-divider
--mui-palette-AppBar-defaultBg
--mui-shape-borderRadius
```

### Legacy community variables (`--theme-*`)
Still respected by some Jellyfin builds. Less reliable in 12.0:
```css
--theme-background
--theme-header-background
--theme-drawer-background
--theme-dialog-background
--theme-card-background
--theme-primary-color
--theme-accent-color
--theme-text-color
--theme-text-color-dim
```

---

## 3. Jellyfin Class Name Reference

### Header / App Bar
| Class (Legacy) | Class (JF 12 MUI) | Description |
|---|---|---|
| `.skinHeader` | `.MuiAppBar-root` | Top navigation bar |
| `.header`, `header` | `.MuiToolbar-root` | Inner toolbar |
| `.skinHeader-withBackground` | — | Header with solid bg |
| `.skinHeader.semiTransparent` | — | Header with translucent bg |
| `.headroom--pinned` | — | Sticky header state |
| `.headroom--not-top` | — | Scrolled-down header |
| `.headerLeft` | — | Left header region |
| `.headerRight` | — | Right header region |
| `.headerLogo` | — | Jellyfin wordmark |

### Navigation Tabs
| Class (Legacy) | Class (JF 12 MUI) | Description |
|---|---|---|
| `.emby-tab-button` | `.MuiTab-root` | Nav tab item |
| `.emby-tab-button-active` | `.MuiTab-root.Mui-selected` | Active tab |
| `.emby-tabs-selectionbar` | `.MuiTabs-indicator` | Tab underline indicator |
| `.emby-tabs-slider` | — | Tab scroll container |

### Sidebar / Drawer
| Class (Legacy) | Class (JF 12 MUI) | Description |
|---|---|---|
| `.mainDrawer` | `.MuiDrawer-paper` | Side navigation panel |
| `.navDrawer` | — | Alternative drawer |
| `.mainDrawer-scrollContainer` | — | Drawer scroll wrapper |

### Cards
| Class | Description |
|---|---|
| `.card` | Base card wrapper (always present) |
| `.portraitCard` | Portrait-aspect card (movies/shows) |
| `.backdropCard` | Widescreen-aspect card |
| `.squareCard` | Square-aspect card (music) |
| `.scalableCard` | Hover-scalable card variant |
| `.cardBox` | Card inner box (clips hover) |
| `.cardScalable` | Scaled inner wrapper |
| `.cardContent` | Card face (image + overlay) |
| `.cardImageContainer` | Background image container |
| `.cardPadder` | Aspect-ratio spacer |
| `.cardText` | Title below card |
| `.cardTextCentered` | Centered card title |
| `.cardOverlayButton` | Play/like button overlay |
| `.defaultCardBackground1-4` | Fallback solid color fills |
| `.MuiCard-root` | JF 12 MUI card wrapper |
| `.MuiCardMedia-root` | JF 12 card image |

### Dialogs & Menus
| Class (Legacy) | Class (JF 12 MUI) | Description |
|---|---|---|
| `.dialog`, `.formDialog` | `.MuiDialog-paper` | Modal dialog |
| `.dialogContainer` | — | Dialog backdrop wrapper |
| `.actionSheet` | — | Bottom sheet |
| `.paperList` | `.MuiMenu-paper` | Context/dropdown menu |
| `.emby-input` | `.MuiFilledInput-root` | Text input |
| `.emby-select` | — | Select dropdown |
| `.emby-textarea` | — | Textarea |

### Detail / Item Page
| Class | Description |
|---|---|
| `#itemDetailPage` | Detail page root |
| `.detailPagePrimaryContainer` | Hero poster + metadata region |
| `.detailPageWrapperContainer` | Scrollable content below hero |
| `.detailRibbon` | App bar on detail page (JF 12 uses this) |
| `.detailPageContent` | Main info block |
| `.detailSection` | Info sub-block |
| `.detailButtons` | Action buttons (Play, Shuffle…) |
| `.mainDetailButtons` | Primary action buttons |
| `.itemBackdrop` | Hero backdrop image |
| `.itemName .logo` | Movie/show logo image |
| `.detailImageContainer` | Poster card wrapper |
| `.itemMiscInfo` | Year / rating / runtime row |
| `.itemGenres` | Genre tags row |
| `.itemTags` | Metadata tags row |
| `.mediaInfoItem` | Individual info badge (year, rating) |
| `.starRatingContainer` | Star rating badge |
| `.itemCommunityRating` | Community score badge |
| `.sectionTitle` | Section heading ("Next Up", "Cast"…) |

### Video Player / OSD
| Class | Description |
|---|---|
| `.videoPlayerContainer` | Full-screen video wrapper |
| `.videoOsdBottom` | OSD bar root |
| `.videoOsdBottom-maincontrols` | Main playback control pill |
| `.videoOsdHeader` | Top OSD (back button, title) |
| `.osdControls` | Button + slider group |
| `.btnPlayPause` | Play/pause toggle |
| `.btnVideoOsdBack` | Back button in OSD |
| `.osdTimeText` | Elapsed time display |
| `.endsAtText` | End-time display |
| `.sliderContainer` | Progress bar track |
| `.mdl-slider-background-lower` | Played portion of slider |
| `.mdl-slider-background-upper` | Unplayed portion |
| `.osdVolumeSliderContainer` | Volume slider |
| `.videoOsdBottom-hidden` | OSD hidden state (`:has()` target) |

### Subtitles
| Class | Description |
|---|---|
| `.videoSubtitles` | Subtitle container |
| `.videoSubtitlesInner` | Inner subtitle text wrapper |
| `.subtitle-container` | Alternative subtitle wrapper |
| `.libassjs-canvas-parent` | ASS/SSA subtitle canvas |
| `.shaka-text-container` | Shaka-player text |

### Layout Modes
| Class | Description |
|---|---|
| `.layout-tv` | Applied when Tizen TV layout active |
| `.layout-desktop` | Desktop layout |
| `.layout-mobile` | Mobile layout |

---

## 4. Jellyfin 12.0 "Modern" UI — Key Changes

1. **Modern layout is now default** — old "experimental" label removed
2. **Library toolbar merged into app bar** — sticky header replaces separate toolbar
3. **All built-in themes share a single base** — `src/themes/_base/_theme.scss`
4. **MUI v6 (CSS-vars mode)** — design tokens surfaced as `--mui-palette-*`
5. **New sticky library header** — `.stickyLibraryHeader` class
6. **Detail ribbon** — `.detailRibbon` used for item page header background

### Recommended theming strategy for JF 12
1. Override `--jf-palette-*` variables in `:root` for color theming
2. Override `--mui-palette-*` for MUI component coverage
3. Target `.Mui*` classes for component-specific overrides
4. Use `[class*="Mui*"]` attribute selectors for hash-suffixed CSS module class names
5. Keep legacy `.skinHeader`, `.mainDrawer`, `.emby-*` selectors for fallback

---

## 5. Selector Patterns & Gotchas

### Targeting MUI CSS-modules classes safely
MUI in CSS-modules mode generates hashed class names like `MuiAppBar-root-abc123`.
Always pair the canonical class with an attribute selector:
```css
.MuiAppBar-root,
[class*="AppBar-root"] { ... }
```

### The `!important` requirement
Custom CSS is injected via `@import` in the "Custom CSS" field, which sits *below*
Jellyfin's own stylesheet in cascade order. `!important` is unavoidable for overriding
Jellyfin's default styles from this injection point.

### TV layout detection
Jellyfin adds `.layout-tv` to `<html>` when the Tizen TV client is active.
Use it to scope TV-only overrides:
```css
.layout-tv .card { width: 280px !important; }
```

### OSD subtitle shift (`:has()` trick)
```css
/* Shift subs up when OSD is visible */
html:has(.videoOsdBottom:not(.videoOsdBottom-hidden)) .videoSubtitlesInner {
    transform: translateY(-11rem) !important;
}
```
Browser support: Chrome/Edge 105+, Safari 15.4+, Firefox 121+.
Pre-2023 Tizen firmware does NOT support `:has()`.

### Mobile blur performance guard
`backdrop-filter` causes GPU stalls on mobile. Disable globally, re-enable selectively:
```css
@media (max-width: 1000px) {
    :root { --apple-blur: none; }
    /* Re-enable only for high-visibility surfaces */
    .mainDrawer { backdrop-filter: blur(10px) !important; }
    .dialog { backdrop-filter: blur(10px) !important; }
}
```

### Backdrop image styling
```css
.backdropImage {
    filter: blur(25px) brightness(65%) !important;
    background-size: cover !important;
    background-position: center !important;
    transition: opacity 0.8s ease-in-out !important;
}
```

### Glass surface recipe
```css
.element {
    background-color: rgba(15, 15, 15, 0.9) !important;
    backdrop-filter: blur(25px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(25px) saturate(180%) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
}
```

### Spring-physics easing curves
```css
/* Quick, snappy — good for UI state changes */
--apple-spring-fast: cubic-bezier(0.16, 1, 0.3, 1);

/* Bouncy overshoot — good for card hover zoom */
--apple-spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 6. Source File Structure

```
src/themes/
├── _base/
│   ├── _palette.scss   ← base color palette (SCSS vars)
│   ├── _theme.scss     ← base theme → compiles to --jf-palette-* CSS vars
│   └── theme.ts        ← MUI theme config (DEFAULT_COLOR_SCHEME)
├── dark/
│   ├── theme.scss      ← imports _base, adds .defaultCardBackground* colors
│   └── index.ts
├── appletv/            ← Apple TV built-in theme
├── blueradiance/
├── purplehaze/
├── light/
├── wmc/
├── index.ts            ← theme registry
└── themeStorageManager.ts
```

### Default values from `theme.ts`
```ts
DEFAULT_COLOR_SCHEME = {
    palette: {
        mode: 'dark',
        primary:    { main: '#00a4dc' },
        secondary:  { main: '#00a4dc' },
        background: { default: '#101010', paper: '#202020' },
        starIcon:   { main: '#f2b01e' },
        error:      { main: '#c62828' },
        AppBar:     { defaultBg: '#202020' }
    }
}
```

---

## 7. Installation & Override Patterns

### Custom CSS injection (server-wide)
Dashboard → **Branding** → **Custom CSS** field.

### Custom CSS injection (per-user)
Profile picture → **Display** → **Custom CSS**.

### Import + token override pattern
```css
@import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@1/ijelly.css');

:root {
    --apple-accent: #ff375f;                          /* swap accent color */
    --apple-blur: blur(15px) saturate(140%);           /* lighter blur */
    --apple-radius: 8px;                               /* tighter corners */
    --jf-palette-primary-main: #ff375f;               /* sync JF 12 accent */
    --mui-palette-primary-main: #ff375f;              /* sync MUI accent */
}
```

---

## 8. Resources

| Resource | URL |
|---|---|
| Jellyfin web source | https://github.com/jellyfin/jellyfin-web |
| Base palette SCSS | `src/themes/_base/_palette.scss` |
| Base theme SCSS | `src/themes/_base/_theme.scss` |
| MUI theme config | `src/themes/_base/theme.ts` |
| Dark theme SCSS | `src/themes/dark/theme.scss` |
| Awesome Jellyfin list | https://github.com/awesome-jellyfin/awesome-jellyfin |
| ElegantFin JF12 patch | https://github.com/mihaif7/elegantfin-jf12 |
| theme.park docs | https://docs.theme-park.dev/ |
| Jellyfin official docs | https://jellyfin.org/docs/ |

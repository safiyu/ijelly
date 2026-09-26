# 🍎 ijelly

An Apple TV-inspired theme for Jellyfin. **ijelly** brings a glassmorphic aesthetic and tactile interactions to your media library, tuned for both desktop and lean-back TV use. This theme targets Samsung Tizen TVs and desktop browsers.

---

## 📸 Showcase

![Main Screen](screenshots/main.png)
*Modern, immersive library view with glassmorphic elements.*

![Item Details](screenshots/details.png)
*Cinematic detail page with high-contrast typography and hero backdrops.*

![Media Player](screenshots/mediaplayer.png)
*Revamped OSD layout for distraction-free playback control.*


---

## ✨ Features

- **💎 Glassmorphism**: Frosted glass effects across menus, dropdowns, dialogs, and the search overlay.
- **🏃 Spring-Physics Animations**: Tactile, "bouncy" card zooms and button presses inspired by the native Apple TV 4K experience.
- **🎬 Cinematic Item Details**: Hero backdrops with gradient transitions and enlarged posters.
- **📺 TV Optimized**: Larger card sizes and a TV-specific layout for high-resolution TV displays.
- **💊 Pill Navigation**: An underscore-free tab navigation system with spring-animated feedback.
- **♿ Accessible**: Visible keyboard focus rings and reduced-motion support for users who prefer fewer animations.

---

## 🚀 Installation

1. Go to your Jellyfin **Dashboard** → **General**.
2. Scroll down to **Custom CSS**.
3. Add the following:
   ```css
   @import url('https://cdn.jsdelivr.net/gh/safiyu/ijelly@1/ijelly.css');
   ```
4. Click **Save**.
5. Go to **Settings** → **Display** and enable **Backdrops**.

The `@1` pin tracks the latest `1.x` release tag, so you get fixes without an untested version landing on your server the moment it's pushed. See [Releases](../../releases) for the changelog.

---

## 🎨 Customising

ijelly exposes its design tokens as CSS custom properties on `:root`. Override any of them in your own Custom CSS block, after the `@import`, to retheme without editing the file:

| Variable | Default | Purpose |
|---|---|---|
| `--apple-bg` | `#0a0a0c` | Base page background |
| `--apple-glass` | `rgba(255, 255, 255, 0.1)` | Light glass fill |
| `--apple-glass-heavy` | `rgba(255, 255, 255, 0.2)` | Heavier glass fill |
| `--apple-text` | `#ffffff` | Primary text color |
| `--apple-text-dim` | `rgba(255, 255, 255, 0.6)` | Secondary/inactive text |
| `--apple-accent` | `#007aff` | Focus rings, active states |
| `--apple-radius` | `12px` | Standard corner radius |
| `--apple-radius-large` | `20px` | Large corner radius (TV cards) |
| `--apple-blur` | `blur(25px) saturate(180%)` | Backdrop blur intensity |
| `--apple-shadow` | see `ijelly.css` | Card hover shadow |
| `--apple-font` | system font stack | Base typeface |
| `--apple-spring-fast` | `cubic-bezier(0.16, 1, 0.3, 1)` | Quick UI transitions |
| `--apple-spring-bouncy` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Card hover/zoom transitions |

Example — swap the accent color:
```css
:root {
    --apple-accent: #ff375f;
}
```

---

## ✅ Compatibility

- **Jellyfin 12.0 (Modern UI):** Fully supported. ijelly maps its design tokens to Jellyfin 12's native `--jf-palette-*` and `--mui-palette-*` CSS variables, and targets the new MUI-based app bar, drawer, dialog, tab, and card components. No companion CSS file is needed — the theme works out of the box on both "Modern" (default) and "Legacy" display modes.
- **Jellyfin 10.9+:** Supported via the `--theme-*` legacy variable overrides.
- **Tested against:** Jellyfin Web 10.9 and 12.0, desktop Chrome/Firefox/Safari, and the Samsung Tizen TV app.
- **Subtitle repositioning** while the on-screen display is visible relies on the CSS `:has()` selector (Chrome/Edge 105+, Safari 15.4+, Firefox 121+). Older browsers, including some pre-2023 Tizen firmware, will keep subtitles at their default position instead of shifting them — playback and readability are unaffected.
- **Mobile/tablet** (≤1000px width) automatically reduces or disables backdrop blur to avoid GPU-related UI stalls on lower-powered devices.
- Uses the OS/browser's system font stack — no external font requests are made, so the theme works on offline or LAN-only servers.

---

## 🛠️ Design Philosophy

**ijelly** is built on the principles of **Aesthetics, Responsiveness, and Clarity** — engineered to make your Jellyfin server feel like a polished native application.

---

## 📄 License

Released under the [MIT License](LICENSE).

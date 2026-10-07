// ijelly Poster-Tinted companion
// Reads the dominant color of the focused/hovered poster and writes it
// to --pt-accent on :root, so the UI re-tints to match.
//
// Install as a Tampermonkey userscript or load via a Jellyfin plugin that
// permits custom JS. Needs CORS-enabled images (Jellyfin's own images are fine).

(function () {
    'use strict';

    const SMOOTH_MS = 800;
    const SAMPLE_SIZE = 50;
    const MIN_SATURATION = 0.25;
    const MIN_LIGHTNESS = 0.35;
    const MAX_LIGHTNESS = 0.75;

    const root = document.documentElement;
    let currentHex = null;
    let pending = null;

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h = 0, s = 0;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
            else if (max === g) h = (b - r) / d + 2;
            else h = (r - g) / d + 4;
            h /= 6;
        }
        return [h, s, l];
    }

    function hslToRgb(h, s, l) {
        if (s === 0) return [l * 255, l * 255, l * 255];
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const hk = h;
        const t = [hk + 1 / 3, hk, hk - 1 / 3];
        return t.map(c => {
            if (c < 0) c += 1;
            if (c > 1) c -= 1;
            if (c < 1 / 6) return (p + (q - p) * 6 * c) * 255;
            if (c < 1 / 2) return q * 255;
            if (c < 2 / 3) return (p + (q - p) * (2 / 3 - c) * 6) * 255;
            return p * 255;
        });
    }

    function rgbToHex(r, g, b) {
        const h = n => Math.round(n).toString(16).padStart(2, '0');
        return `#${h(r)}${h(g)}${h(b)}`;
    }

    function extractDominantColor(img) {
        const canvas = document.createElement('canvas');
        canvas.width = SAMPLE_SIZE;
        canvas.height = SAMPLE_SIZE;
        const ctx = canvas.getContext('2d');
        try {
            ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        } catch (e) {
            return null;
        }
        let data;
        try {
            data = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
        } catch (e) {
            return null;
        }
        const buckets = {};
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 200) continue;
            const [h, s, l] = rgbToHsl(r, g, b);
            if (s < MIN_SATURATION || l < MIN_LIGHTNESS || l > MAX_LIGHTNESS) continue;
            const key = Math.round(h * 24) + ':' + Math.round(s * 8);
            if (!buckets[key]) buckets[key] = { r: 0, g: 0, b: 0, n: 0 };
            buckets[key].r += r;
            buckets[key].g += g;
            buckets[key].b += b;
            buckets[key].n += 1;
        }
        let best = null;
        for (const k in buckets) {
            if (!best || buckets[k].n > best.n) best = buckets[k];
        }
        if (!best) return null;
        let r = best.r / best.n, g = best.g / best.n, b = best.b / best.n;
        let [h, s, l] = rgbToHsl(r, g, b);
        s = Math.min(1, s * 1.3);
        l = Math.max(0.5, Math.min(0.7, l));
        [r, g, b] = hslToRgb(h, s, l);
        return rgbToHex(r, g, b);
    }

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function applyAccent(hex) {
        if (hex === currentHex) return;
        currentHex = hex;
        root.style.setProperty('--pt-accent', hex);
        root.style.setProperty('--pt-accent-soft', hexToRgba(hex, 0.18));
        root.style.setProperty('--pt-accent-glow', hexToRgba(hex, 0.4));
    }

    function processImage(img) {
        if (!img || !img.complete || img.naturalWidth === 0) return;
        if (pending) cancelAnimationFrame(pending);
        pending = requestAnimationFrame(() => {
            const hex = extractDominantColor(img);
            if (hex) applyAccent(hex);
        });
    }

    function findPosterIn(el) {
        if (!el) return null;
        return el.querySelector('.cardImageContainer img, .cardImage img, img.cardImage, img');
    }

    let debounce;
    function schedule(fn) {
        clearTimeout(debounce);
        debounce = setTimeout(fn, 120);
    }

    document.addEventListener('focusin', (e) => {
        const card = e.target.closest('.card, .MuiCard-root');
        if (!card) return;
        schedule(() => processImage(findPosterIn(card)));
    }, true);

    document.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.card, .MuiCard-root');
        if (!card) return;
        schedule(() => processImage(findPosterIn(card)));
    });

    const detailBackdropObserver = new MutationObserver(() => {
        const backdrop = document.querySelector('.itemBackdrop img, .backdropImage');
        if (backdrop) processImage(backdrop);
    });
    detailBackdropObserver.observe(document.body, { childList: true, subtree: true });

    const style = document.createElement('style');
    style.textContent = `
    :root { transition: --pt-accent ${SMOOTH_MS}ms ease, --pt-accent-soft ${SMOOTH_MS}ms ease; }
  `;
    document.head.appendChild(style);
})();

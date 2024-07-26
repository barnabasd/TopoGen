function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}
function rgbToHsl({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s : 0;
    return {
        h: (60 * h < 0 ? 60 * h + 360 : 60 * h),
        s: (100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
        l: ((100 * (2 * l - s)) / 2)
    };
};
function hslToRgb({ h, s, l }) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b; if (s === 0) r = g = b = l;
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
}
function interpolateColorShorterHue(c1, c2, factor) {
    const hsl1 = rgbToHsl(c1); const hsl2 = rgbToHsl(c2);
    const dHue = ((hsl2.h - hsl1.h + 540) % 360) - 180;
    const h = hsl1.h + factor * dHue;
    const s = hsl1.s + factor * (hsl2.s - hsl1.s);
    const l = hsl1.l + factor * (hsl2.l - hsl1.l);
    return hslToRgb({h, s, l});
}

function interpolateColorLongerHue(c1, c2, factor) {
    const hsl1 = rgbToHsl(c1); const hsl2 = rgbToHsl(c2);
    const dHue = 360 - ((hsl2.h - hsl1.h + 360) % 360);
    const h = (hsl1.h + factor * dHue) % 360;
    const s = hsl1.s + factor * (hsl2.s - hsl1.s);
    const l = hsl1.l + factor * (hsl2.l - hsl1.l);
    return hslToRgb({h, s, l});
}

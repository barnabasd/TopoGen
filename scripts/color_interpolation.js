function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}
function linearInterpolate(start, end, factor) {
    return start + (end - start) * factor;
}
function cosineInterpolate(start, end, factor) {
    const ft = factor * Math.PI;
    const f = (1 - Math.cos(ft)) / 2;
    return start + (end - start) * f;
}
function quadraticInterpolate(start, end, factor) {
    return start + (end - start) * Math.pow(factor, 2);
}
function cubicInterpolate(start, end, factor) {
    return start + (end - start) * Math.pow(factor, 3);
}

function interpolateColor(color1, color2, factor, type = 'linear') {
    const interpolationMethods = {
        linear: linearInterpolate,
        cosine: cosineInterpolate,
        quadratic: quadraticInterpolate,
        cubic: cubicInterpolate
    };
    const interpolate = interpolationMethods[type] || linearInterpolate;
    const r = Math.round(interpolate(color1.r, color2.r, factor));
    const g = Math.round(interpolate(color1.g, color2.g, factor));
    const b = Math.round(interpolate(color1.b, color2.b, factor));
    return { r, g, b };
}
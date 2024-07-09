function getGradientColors(color1, color2, steps) {
    let hsl1 = hexToHSL(color1);
    let hsl2 = hexToHSL(color2);
    let result = [];
    for (let i = 0; i <= steps; i++) {
        let h = Math.round(hsl1[0] + (hsl2[0] - hsl1[0]) * i / steps);
        let s = Math.round(hsl1[1] + (hsl2[1] - hsl1[1]) * i / steps);
        let l = Math.round(hsl1[2] + (hsl2[2] - hsl1[2]) * i / steps);
        result.push(hexToRgb(hslToHex(h, s, l)));
    }
    return result;
}

function replaceColors(canvas, map) {
    const time = performance.now();
    const ctx = canvas.getContext('2d');
    const _imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const imageData = _imageData.data;
    for (let i = 0; i < imageData.length; i += 4) {
        const r = Math.round(imageData[i]), g = Math.round(imageData[i + 1]), b = Math.round(imageData[i + 2]);
        const originalHex = rgbToHexFast(r, g, b);
        const replacementColor = map[originalHex];
        if (replacementColor) {
            imageData[i] = replacementColor.r;
            imageData[i + 1] = replacementColor.g;
            imageData[i + 2] = replacementColor.b;
        }
    }
    ctx.putImageData(_imageData, 0, 0);
    return performance.now() - time;
}
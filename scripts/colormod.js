const colorDisplay = document.getElementById("colorDisplay");

function getCanvasColors(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorList = [];
    for(let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i + 0];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const rgb = { r, g, b }
        if (colorList.includes(rgbToHex(rgb))) continue;
        colorList.push(rgbToHex(rgb));
    }
    return colorList;
}
function interpolateColors(color1, color2, steps) {
    let hsl1 = hexToHSL(color1);
    let hsl2 = hexToHSL(color2);
    let result = [];
    for (let i = 0; i <= steps; i++) {
        let h = hsl1[0] + (hsl2[0] - hsl1[0]) * i / steps;
        let s = hsl1[1] + (hsl2[1] - hsl1[1]) * i / steps;
        let l = hsl1[2] + (hsl2[2] - hsl1[2]) * i / steps;
        result.push(hslToHex(h, s, l));
    }
    return result;
}
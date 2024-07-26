function posterizeAndColorize(iData, count, color1, color2, mode) {
    const newIData = new ImageData(iData.width, iData.height);
    const data = iData.data;
    const newData = newIData.data;
    const step = Math.floor(255 / (count - 1));
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const colors = [];
    for (let i = 0; i < count; i++) {
        const factor = i / (count - 1);
        colors.push(interpolateColor(rgb1, rgb2, factor, mode));
    }
    for (let i = 0; i < data.length; i += 4) {
        const intensity = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
        const colorIndex = Math.floor(intensity / step);
        const color = colors[colorIndex];
        newData[i] = color.r;
        newData[i + 1] = color.g;
        newData[i + 2] = color.b;
        newData[i + 3] = 255;
    }
    return newIData;
}

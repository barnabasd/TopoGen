function posterizeCanvas(canvas, radius) {
    const time = performance.now();
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    const step = 256 / radius;
    let colors = [];
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] = Math.round(Math.floor(data[i] / step) * step);
        const g = data[i + 1] = Math.round(Math.floor(data[i + 1] / step) * step);
        const b = data[i + 2] = Math.round(Math.floor(data[i + 2] / step) * step);
        if (!colors.includes(rgbToHex({ r, g, b }))) colors.push(rgbToHex({ r, g, b }));
    }
    context.putImageData(imageData, 0, 0);
    return [(performance.now() - time), colors];
}
//function posterizeCanvas(canvas, radius) {
//    const time = performance.now();
//    const context = canvas.getContext('2d');
//    const width = canvas.width;
//    const height = canvas.height;
//    const imageData = context.getImageData(0, 0, width, height);
//    const data = imageData.data;
//    const step = 256 / radius;
//    let colors = [];
//    for (let i = 0; i < data.length; i += 4) {
//        const r = data[i] = Math.trunc(Math.floor(data[i] / step) * step);
//        const g = data[i + 1] = Math.trunc(Math.floor(data[i + 1] / step) * step);
//        const b = data[i + 2] = Math.trunc(Math.floor(data[i + 2] / step) * step);
//        if (!colors.includes(rgbToHex(r, g, b))) colors.push(rgbToHex(r, g, b));
//    }
//    context.putImageData(imageData, 0, 0);
//    return [(performance.now() - time), colors];
//}
function posterizeCanvas(canvas, radius) {
    const startTime = performance.now();
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    const step = 256 / radius;
    const colors = new Set();

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.floor(data[i] / step) * step;
        data[i + 1] = Math.floor(data[i + 1] / step) * step;
        data[i + 2] = Math.floor(data[i + 2] / step) * step;

        colors.add(rgbToHex(data[i], data[i + 1], data[i + 2]));
    }

    context.putImageData(imageData, 0, 0);
    return [(performance.now() - startTime), Array.from(colors)];
}
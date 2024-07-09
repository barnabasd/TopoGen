function randomNoise(canvas) {
    const time = performance.now();
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const length = data.length;
    for (let i = 0; i < length; i += 4) {
        const value = Math.random() * 255;
        data[i] = data[i + 1] = data[i + 2] = value;
        data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return performance.now() - time;
}

function perlinNoise(canvas) {
    const time = performance.now();
    var noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = canvas.width;
    noiseCanvas.height = canvas.height;
    randomNoise(noiseCanvas);
    var g = canvas.getContext("2d");
    g.save();
    for (var size = 4; size <= noiseCanvas.width; size *= 2) {
        var x = (Math.random() * (noiseCanvas.width - size)) | 0,
            y = (Math.random() * (noiseCanvas.height - size)) | 0;
        g.globalAlpha = 4 / size;
        g.drawImage(noiseCanvas, x, y, size, size, 0, 0, canvas.width, canvas.height);
    }
    g.restore();
    return performance.now() - time;
}
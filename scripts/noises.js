const randomNoiseTimerDisplay = document.getElementById("randomnoisetiming");
const perlinNoiseTimerDisplay = document.getElementById("perlinnoisetiming");

function randomNoise(canvas) {
    const startTime = performance.now();
    const ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        let value = Math.random() * 255;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    const endTime = performance.now();
    randomNoiseTimerDisplay.innerText = Math.round(endTime - startTime) + "ms";
    return endTime - startTime;
}

function perlinNoise(canvas) {
    const startTime = performance.now();
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
    const endTime = performance.now();
    perlinNoiseTimerDisplay.innerText = Math.round(endTime - startTime) + "ms";
    return endTime - startTime;
}
const posterizingDisplay = document.getElementById("posterizingtiming");
const colorTimerDisplay = document.getElementById("colorizingtiming");
const blurTimerDisplay = document.getElementById("blurtiming");

function blurCanvas(canvas, radius) {
    return new Promise(resolve => {
        const startTime = performance.now();
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const hiddenCanvas = document.createElement('canvas');
        const hiddenCanvasCtx = hiddenCanvas.getContext('2d');
        hiddenCanvas.width = canvas.width;
        hiddenCanvas.height = canvas.height;
        hiddenCanvasCtx.putImageData(imageData, 0, 0);
        hiddenCanvasCtx.filter = `blur(${radius}px)`;
        hiddenCanvasCtx.drawImage(hiddenCanvas, 0, 0);
        const blurredImageData = hiddenCanvasCtx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.putImageData(blurredImageData, 0, 0);
        const endTime = performance.now();
        blurTimerDisplay.innerText = Math.floor(endTime - startTime) + "ms";
        resolve(endTime - startTime);
    });
}

function posterizeCanvas(canvas, radius) {
    return new Promise(resolve => {
        const startTime = performance.now();
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const imageData = context.getImageData(0, 0, width, height);
        const data = imageData.data;
        const step = 256 / radius;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.floor(data[i] / step) * step;
            data[i + 1] = Math.floor(data[i + 1] / step) * step;
            data[i + 2] = Math.floor(data[i + 2] / step) * step;
        }
        context.putImageData(imageData, 0, 0);
        const endTime = performance.now();
        posterizingDisplay.innerText = Math.floor(endTime - startTime) + "ms";
        resolve(endTime - startTime);
    });
}

function colorReplace(canvas, originalList, replaceList) {
    if (originalList.length !== replaceList.length) {
        alert("Differing original and replacement color count!");
        return;
    }

    return new Promise(resolve => {
        const startTime = performance.now();
        const ctx = canvas.getContext('2d');
        const _imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const imageData = _imageData.data;
        const colorMap = new Map();
        for (let i = 0; i < originalList.length; i++) {
            colorMap.set(originalList[i], hexToRgb(replaceList[i]));
        }
        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i], g = imageData[i + 1], b = imageData[i + 2];
            const originalHex = rgbToHex({ r, g, b });
            if (colorMap.has(originalHex)) {
                const replacementColor = colorMap.get(originalHex);
                imageData[i] = replacementColor.r;
                imageData[i + 1] = replacementColor.g;
                imageData[i + 2] = replacementColor.b;
            }
        }
        ctx.putImageData(_imageData, 0, 0);
        const endTime = performance.now();
        colorTimerDisplay.innerText = Math.floor(endTime - startTime) + "ms";
        resolve(endTime - startTime);
    });
}
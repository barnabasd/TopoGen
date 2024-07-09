function blurCanvas(canvas, radius) {
    const time = performance.now();
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
    return performance.now() - time;
}
function gaussianBlur(canvas, radius) {
    const time = performance.now();
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const kernel = createGaussianKernel(radius);
    const kernelSize = kernel.length;
    const halfKernelSize = Math.floor(kernelSize / 2);
    const tmpPixels = new Uint8ClampedArray(pixels.length);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let rSum = 0, gSum = 0, bSum = 0, aSum = 0, weightSum = 0;
            for (let i = -halfKernelSize; i <= halfKernelSize; i++) {
                const xOffset = x + i;
                if (xOffset >= 0 && xOffset < width) {
                    const offset = (y * width + xOffset) * 4;
                    const weight = kernel[i + halfKernelSize];
                    rSum += pixels[offset] * weight;
                    gSum += pixels[offset + 1] * weight;
                    bSum += pixels[offset + 2] * weight;
                    aSum += pixels[offset + 3] * weight;
                    weightSum += weight;
                }
            }
            const destOffset = (y * width + x) * 4;
            tmpPixels[destOffset] = rSum / weightSum;
            tmpPixels[destOffset + 1] = gSum / weightSum;
            tmpPixels[destOffset + 2] = bSum / weightSum;
            tmpPixels[destOffset + 3] = aSum / weightSum;
        }
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let rSum = 0, gSum = 0, bSum = 0, aSum = 0, weightSum = 0;
            for (let i = -halfKernelSize; i <= halfKernelSize; i++) {
                const yOffset = y + i;
                if (yOffset >= 0 && yOffset < height) {
                    const offset = (yOffset * width + x) * 4;
                    const weight = kernel[i + halfKernelSize];
                    rSum += tmpPixels[offset] * weight;
                    gSum += tmpPixels[offset + 1] * weight;
                    bSum += tmpPixels[offset + 2] * weight;
                    aSum += tmpPixels[offset + 3] * weight;
                    weightSum += weight;
                }
            }
            const destOffset = (y * width + x) * 4;
            pixels[destOffset] = rSum / weightSum;
            pixels[destOffset + 1] = gSum / weightSum;
            pixels[destOffset + 2] = bSum / weightSum;
            pixels[destOffset + 3] = aSum / weightSum;
        }
    }
    context.putImageData(imageData, 0, 0);
    return performance.now() - time;
}
function createGaussianKernel(radius) {
    const sigma = radius / 3;
    const size = Math.max(1, Math.floor(sigma * 6));
    const kernel = new Float32Array(size * 2 + 1);
    let sum = 0;
    for (let i = -size; i <= size; i++) {
        const value = Math.exp(-(i * i) / (2 * sigma * sigma));
        kernel[i + size] = value;
        sum += value;
    }
    for (let i = 0; i < kernel.length; i++) {
        kernel[i] /= sum;
    }
    return kernel;
}
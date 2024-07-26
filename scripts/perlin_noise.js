function noise(x, y, p) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x); 
    y -= Math.floor(y);
    const u = x * x * x * (x * (x * 6 - 15) + 10);
    const v = y * y * y * (y * (y * 6 - 15) + 10);
    const A = p[X] + Y; const AA = p[A];
    const AB = p[A + 1]; const B = p[X + 1] + Y;
    const BA = p[B]; const BB = p[B + 1];
    function grad(hash, x, y) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    function lerp(t, a, b) { return a + t * (b - a); }
    return lerp(v,
        lerp(u, grad(p[AA], x, y), grad(p[BA], x - 1, y)),
        lerp(u, grad(p[AB], x, y - 1), grad(p[BB], x - 1, y - 1))
    );
}
function createPerlinNoise(w, h, s) {
    const imageData = new ImageData(w, h);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = p[i]; p[i] = p[j]; p[j] = temp;
    }
    for (let i = 256; i < 512; i++) p[i] = p[i - 256];
    const data = imageData.data;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const value = (noise(x * s, y * s, p) + 1) / 2;
            const cell = (y * w + x) * 4;
            const val = value * 255;
            data[cell] = data[cell + 1] = data[cell + 2] = val;
            data[cell + 3] = 255;
        }
    }
    return imageData;
}
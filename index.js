const startColorChanger = document.getElementById("gradientStartPicker");
const posterizeLevelChanger = document.getElementById("posterizeLevel");
const endColorChnager = document.getElementById("gradientEndPicker");
const heightChnager = document.getElementById("imgHeight");
const blurChanger = document.getElementById("blurRadius");
const widthChnager = document.getElementById("imgWidth");


const timeDisplay = document.getElementById("overalltiming");
const output = document.getElementById("output");

function fillCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = parseInt(widthChnager.value);
    canvas.height = parseInt(heightChnager.value);
    ctx.fillRect(0, 0, parseInt(widthChnager.value), parseInt(heightChnager.value));
}

function generate() {
    fillCanvas(output);
    let time1 = randomNoise(output);
    let time2 = perlinNoise(output);
    let time3 = blurCanvas(output, parseInt(blurChanger.value));
    let time4 = posterizeCanvas(output, parseInt(posterizeLevelChanger.value));
    
    const originalColors = sortHexColorsByBrightness(getCanvasColors(output));
    const interpolatedColors = interpolateColors(startColorChanger.value, endColorChnager.value, originalColors.length - 1);
    let time5 = colorReplace(output, originalColors, interpolatedColors);

    timeDisplay.innerText = (time1 + time2 + time3 + time4 + time5) + "ms";
}

generate();

window.addEventListener("keypress", function(e) {
    if (e.code == "Space") generate();
});
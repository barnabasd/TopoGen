const posterizeLevel_slider = document.getElementById("input_posterizelevels");
const blurRadius_slider = document.getElementById("input_blurradius");
const output_canvas = document.getElementById("output_canvas");
const debugMode = document.getElementById("debugMode");
const debugData = document.getElementById("debugData");

const color1 = document.getElementById("colorPicker1");
const color2 = document.getElementById("colorPicker2");

debugMode.addEventListener('click', function() {
    debugData.style.display = debugMode.checked ? "block" : "none";
});

function fillCanvas() {
    const ctx = output_canvas.getContext('2d');
    ctx.fillRect(0, 0, output_canvas.width, output_canvas.height);
}

function generate() {
    fillCanvas();
    const prelinTime    = perlinNoise(output_canvas);
    const blurTime      = blurCanvas(output_canvas, parseInt(blurRadius_slider.value));
    const posterizeTime = posterizeCanvas(output_canvas, parseInt(posterizeLevel_slider.value));
    debugData.children[0].children[1].innerHTML = Math.floor(prelinTime) + "ms";
    debugData.children[1].children[1].innerHTML = Math.floor(blurTime) + "ms";
    debugData.children[2].children[1].innerHTML = Math.floor(posterizeTime[0]) + "ms";
    let originalColors = sortHexColorsByBrightness(posterizeTime[1]);
    let newColors = getGradientColors(color1.value, color2.value, originalColors.length - 1);
    let colorMap = new Map();
    for (let i = 0; i < originalColors.length; i++) {
        colorMap[originalColors[i]] = newColors[i];
    }
    let colorTime = replaceColors(output_canvas, colorMap);
    debugData.children[3].children[1].innerHTML = Math.floor(colorTime) + "ms";
}

function download(type) {
    const url = output_canvas.toDataURL("image/" + type)
    let a = document.createElement('a');
    a.download = "pattern." + type;
    a.href = url;
    a.click();
}

function reset() {
    posterizeLevel_slider.value = "10";
    blurRadius_slider.value = "10";
    if (debugMode.checked)
        debugMode.click();
    posterizeLevel_data.innerText = "10";
    blurRadius_data.innerText = "10";
}
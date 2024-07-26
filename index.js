const sliderdata = { 
    scale:       { slider: document.getElementById("scale_range"),       display: document.getElementById("scale_value"),      },
    smoothness:  { slider: document.getElementById("smoothness_range"),  display: document.getElementById("smoothness_value")  },
    colorlevels: { slider: document.getElementById("colorlevels_range"), display: document.getElementById("colorlevels_value") }
}
sliderdata.colorlevels.slider.addEventListener('mousemove', function() { sliderdata.colorlevels.display.innerText = sliderdata.colorlevels.slider.value; });
sliderdata.smoothness.slider.addEventListener('mousemove', function() { sliderdata.smoothness.display.innerText = sliderdata.smoothness.slider.value; });
sliderdata.scale.slider.addEventListener('mousemove', function() { sliderdata.scale.display.innerText = sliderdata.scale.slider.value; });
sliderdata.colorlevels.slider.addEventListener('change', function() { sliderdata.colorlevels.display.innerText = sliderdata.colorlevels.slider.value; startGenerating(); });
sliderdata.smoothness.slider.addEventListener('change', function() { sliderdata.smoothness.display.innerText = sliderdata.smoothness.slider.value; startGenerating(); });
sliderdata.scale.slider.addEventListener('change', function() { sliderdata.scale.display.innerText = sliderdata.scale.slider.value; startGenerating(); });

const interpolationmode_input = document.getElementById("interpolationmode_input");
const output_canvas = document.getElementById("output_canvas");

const canvasW_input = document.getElementById("imagew");
const canvasH_input = document.getElementById("imageh");
let canvasW = output_canvas.width = parseInt(canvasW_input.value);
let canvasH = output_canvas.height = parseInt(canvasH_input.value);
canvasW_input.addEventListener('change', function() { canvasW = output_canvas.width = parseInt(canvasW_input.value); });
canvasH_input.addEventListener('change', function() { canvasH = output_canvas.height = parseInt(canvasH_input.value); });

function startGenerating() {
    let times = []; let time = performance.now();

    const perlinNoiseData = createPerlinNoise(canvasW, canvasH, parseInt(sliderdata.scale.slider.value) / 1000);
    times.push(performance.now() - time); time = performance.now();

    const blurredData     = blurImageData(perlinNoiseData, parseInt(sliderdata.smoothness.slider.value));
    times.push(performance.now() - time); time = performance.now();

    const level = parseInt(sliderdata.colorlevels.slider.value);
    const color1 = document.getElementById("colorpr").value;
    const color2 = document.getElementById("colorsc").value;
    const mode = interpolationmode_input.value;

    const posterizedData  = posterizeAndColorize(blurredData, level, color1, color2, mode);
    times.push(performance.now() - time); time = performance.now();

    output_canvas.getContext('2d').putImageData(posterizedData, 0, 0);
    onresize();

    console.log(times);
}

function onresize() {
    const aspectRatio = canvasW / canvasH;
    const ww = window.innerWidth - 360;
    const wh = window.innerHeight;
    let canvasWidth = ww < canvasW ? ww : canvasW;
    let canvasHeight = canvasWidth / aspectRatio;
    if (canvasHeight > wh) {
        canvasHeight = wh;
        canvasWidth = canvasHeight * aspectRatio;
    }
    output_canvas.style.maxWidth = canvasWidth + "px";
    output_canvas.style.maxHeight = canvasHeight + "px";
}
window.addEventListener('resize', onresize);
onresize();

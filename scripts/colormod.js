const colorDisplay = document.getElementById("colorDisplay");

function getCanvasColors(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorList = [];
    for(let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i + 0];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const rgb = { r, g, b }
        if (colorList.includes(rgbToHex(rgb))) continue;
        colorList.push(rgbToHex(rgb));
    }
    return colorList;
}
function interpolateColors(color1, color2, steps) {
    let hsl1 = hexToHSL(color1);
    let hsl2 = hexToHSL(color2);
    let result = [];
    for (let i = 0; i <= steps; i++) {
        let h = hsl1[0] + (hsl2[0] - hsl1[0]) * i / steps;
        let s = hsl1[1] + (hsl2[1] - hsl1[1]) * i / steps;
        let l = hsl1[2] + (hsl2[2] - hsl1[2]) * i / steps;
        result.push(hslToHex(h, s, l));
    }
    return result;
}

function displayColors(original, replacement) {
    if (original.length !== replacement.length)
    { alert("Differing original and replacement color count!"); return; }
    Array.from(colorDisplay.children).forEach(c => colorDisplay.removeChild(c));
    for (let i = 0; i < original.length; i++) {
        let div = document.createElement('div');
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.flexDirection = "row";
        div.style.display = "flex";
        div.style.padding = "5px";
        div.style.height = "50px";
        let rect1 = document.createElement('div');
        rect1.style.width = rect1.style.height = "40px";
        rect1.style.backgroundColor = original[i];
        let arrow = document.createElement('p');
        arrow.style.textAlign = "center";
        arrow.innerText = "->";
        arrow.style.flexGrow = "1";
        let rect2 = document.createElement('div');
        rect2.style.width = rect2.style.height = "40px";
        rect2.style.backgroundColor = replacement[i];
        div.appendChild(rect1);
        div.appendChild(arrow);
        div.appendChild(rect2);
        colorDisplay.appendChild(div);
    }
}
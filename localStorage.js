function load() {
    output_canvas.width = sizePicker1.value = parseInt(localStorage.getItem("canvas_w"));
    output_canvas.height = sizePicker2.value = parseInt(localStorage.getItem("canvas_h"));

    colorPicker1.value = localStorage.getItem("color1");
    colorPicker2.value = localStorage.getItem("color2");

    posterizeLevel_slider.value = localStorage.getItem("slider1");
    blurRadius_slider.value = localStorage.getItem("slider2");

    let shouldbeChecked = (localStorage.getItem("dbg") == "true" ? true : false) != debugMode.checked;
    if (shouldbeChecked) debugMode.click();

    refreshSizeUI();
    pslsReset(true);
    brsReset(true);
}

function save() {
    localStorage.setItem("canvas_w", output_canvas.width);
    localStorage.setItem("canvas_h", output_canvas.height);

    localStorage.setItem("color1", colorPicker1.value);
    localStorage.setItem("color2", colorPicker2.value);

    localStorage.setItem("slider1", posterizeLevel_slider.value);
    localStorage.setItem("slider2", blurRadius_slider.value);

    localStorage.setItem("dbg", debugMode.checked);
}
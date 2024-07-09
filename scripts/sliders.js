const posterizeLevel_data = document.getElementById("input_posterizelevels_value");
const blurRadius_data = document.getElementById("input_blurradius_value");

let isDragging = false;
window.addEventListener('mousedown', function() { isDragging = true; });
window.addEventListener('mouseup', function() { isDragging = false; });

function pslsReset(ignore) {
    if (isDragging || ignore) posterizeLevel_data.innerText = posterizeLevel_slider.value;
}
function brsReset(ignore) {
    if (isDragging || ignore) blurRadius_data.innerText = blurRadius_slider.value;
}

posterizeLevel_slider.addEventListener('mousemove', function() { pslsReset(false); });
blurRadius_slider.addEventListener('mousemove', function() { brsReset(false); });
posterizeLevel_slider.addEventListener('change', function() { pslsReset(true); });
blurRadius_slider.addEventListener('change', function() { brsReset(true); });
posterizeLevel_slider.addEventListener('click', function() { pslsReset(true); });
blurRadius_slider.addEventListener('click', function() { brsReset(true); });
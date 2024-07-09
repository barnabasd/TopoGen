const posterizeLevel_data = document.getElementById("input_posterizelevels_value");
const blurRadius_data = document.getElementById("input_blurradius_value");

let isDragging = false;
window.addEventListener('mousedown', function() { isDragging = true; });
window.addEventListener('mouseup', function() { isDragging = false; });

posterizeLevel_slider.addEventListener('mousemove', function() {
    if (isDragging) posterizeLevel_data.innerText = posterizeLevel_slider.value;
});
blurRadius_slider.addEventListener('mousemove', function() {
    if (isDragging) blurRadius_data.innerText = blurRadius_slider.value;
});
const img = document.getElementById('sensor-chart-nav-icon'); 

function resizeImage() {
    img.width = window.innerWidth * 0.25; // Set image width to 25% of the window's inner width
}

window.addEventListener('resize', resizeImage);

resizeImage();
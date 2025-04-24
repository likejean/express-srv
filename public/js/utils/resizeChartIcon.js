const img = document.getElementById('sensor-chart-nav-icon'); 

//this function resizes the image to 25% of the window's inner width
//this function is called when the window is resized
//this function is also called when the page is loaded to set the initial size of the image
//this function is used to set the size of the image to 25% of the window's inner width
function resizeImage() {
    img.width = window.innerWidth * 0.25; // Set image width to 25% of the window's inner width
}

window.addEventListener('resize', resizeImage);

resizeImage();
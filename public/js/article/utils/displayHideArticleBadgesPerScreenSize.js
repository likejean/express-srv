function displayHideArticleBadgesPerScreenSize() {

	const badges = document.querySelectorAll(".hide-badge-on-small-screen");
	let originalDisplay = document.querySelector(".hide-badge-on-small-screen").style.display;
	const handleResize = () => {
		const currentWidth = window.innerWidth;
		if (currentWidth < 500) {
			badges.forEach(item => {
				item.style.display = "none";
			})
		}else{
			badges.forEach(item => {
				item.style.display = originalDisplay;
			});
		}
	};
	window.addEventListener('resize', handleResize);
	handleResize();
}


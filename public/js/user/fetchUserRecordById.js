const username = document.getElementById("sensor-name");
const avatarImg = document.getElementById("avatar-image");

const fetchUserRecordById = async () => {
    
	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

 	 // fetch all data using POST API endpoints: sensors, calibrations, procedures
    await axios
    .get(`../api/users/profile/${id}`)
		.then((result) => {
			const imgArray = result.data.user.image.avatar.data.data;
			function toBase64(arr) {
				//arr = new Uint8Array(arr) if it's an ArrayBuffer
				//btoa: decodes a string into bytes using Latin-1 (ISO-8859), and encodes those bytes into a string using Base64.
				return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
			}
			//render decoded image
			avatarImg.src = `data:image/*; base64, ${toBase64(imgArray)}`;
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

fetchUserRecordById();
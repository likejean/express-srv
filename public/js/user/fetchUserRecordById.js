const username = document.getElementById("sensor-name");
const avatarImg = document.getElementById("avatar-image");
const userFullName = document.getElementById("user-fullname");

const fetchUserRecordById = async () => {
    
	//obtain query string by id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

 	 // fetch all data using POST API endpoints: sensors, calibrations, procedures
    await axios
    .get(`../api/users/${id}`)
		.then((result) => {
			const imgArray = result.data.user.image.avatar.data.data;			
			//render decoded image
			avatarImg.src = `data:image/*; base64, ${toBase64(imgArray)}`;
			userFullName.innerHTML = result.data.user.firstname + " " + result.data.user.lastname;
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

fetchUserRecordById();
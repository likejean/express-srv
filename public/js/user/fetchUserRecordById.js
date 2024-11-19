const username = document.getElementById("sensor-name");
const avatarImg = document.getElementById("avatar-image");
const userFullName = document.getElementById("user-profile-fullname");
const userEmail = document.getElementById("user-profile-email");
const userNickname = document.getElementById("user-profile-nickname");
const userAboutYourself = document.getElementById("user-profile-about-yourself");
const userAge = document.getElementById("user-profile-age");
const userLevel= document.getElementById("user-profile-level");


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
			userEmail.innerHTML = result.data.user.email;
			userNickname.innerHTML = result.data.user.username;
			userAge.innerHTML = result.data.user.age;
			userAboutYourself.innerHTML = result.data.user.aboutYourself;
			userLevel.innerHTML = result.data.user.level;
		})
		.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
};

fetchUserRecordById();
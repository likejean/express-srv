var _userfactory = new userFactory();  //instantiate user factory;

const avatarImage = document.getElementById("main-bar-avatar-image");
const userProfileImgAnchor = document.getElementById("user-profile-anchor");

_userfactory.loginHtmlLabel = document.getElementById("login-anchor");
_userfactory.logoutHtmlLabel = document.getElementById("logout-anchor");
_userfactory.userId = window.localStorage.getItem("userId");
_userfactory.userEmail = window.localStorage.getItem("userEmail");

const userLabels = document.getElementById("user-labels");

function displayLoginUserStatus() {
	//if a user logged in successfully and token exists in localStorage
	if(window.localStorage.getItem("token") !== null) {	
		const avatar = JSON.parse(window.localStorage.getItem("userAvatar"));
		_userfactory.userAvatar = avatar;
		_userfactory.userAuthStatus = true;
		_userfactory.loginHtmlLabel.remove();	
		avatarImage.src	= `data:image/*; base64, ${toBase64(avatar.data)}`;
		userProfileImgAnchor.href = `../../html/userProfile.html?id=${_userfactory.userId}`;
	}
	//if no user logged in and token doesn't exist in localStorage
	else {	
		_userfactory.logoutHtmlLabel.remove();
		avatarImage.src = "./img/avatars/MissingAvatarIcon.png";
		_userfactory.userAuthStatus = false;
		_userfactory.userAvatar = undefined;
		_userfactory.userId = undefined;
		_userfactory.userEmail = undefined;
	}
}

displayLoginUserStatus();

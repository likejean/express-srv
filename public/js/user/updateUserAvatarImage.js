function updateUserAvatarImage() {
  //obtain query string by id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");

  const formData = new FormData();

  formData.append("avatar", avatarPostData.avatar);
  formData.append("title", avatarPostData.title);
  formData.append("description", avatarPostData.description);

  axios
    .patch(`../api/users/updateAvatar/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const userAvatar = response.data.result.image.avatar.data;
      window.localStorage.setItem("userAvatar", JSON.stringify(userAvatar));
      userProfileAvatarSubmitButton.removeEventListener(
        "click",
        clearFileInput
      );
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error: failed to update user avatar", error);
    });
}

function userAuthNotification(emailSpan, authSpan, userEmail, authStatus) {
    document.getElementById(emailSpan).innerText = userEmail;
    document.getElementById(authSpan).innerText = authStatus;
}
const jwt = require('jsonwebtoken');


// this function is used to sign the user and generate a token
// it takes the user object, secret key, response object and request object as parameters
function signUser(user, secretKey, res, req) {
	return jwt.sign({user}, secretKey, {expiresIn: '3000s'},(err, token) => {
		console.log({
			request: {
				type: 'POST',
				url: req.originalUrl                    
			},
			token
		});
		res.json({
			user,
			message: "Authentication is successful!",
			token
		});
	});
};


// this function is used to verify the token and check if it is valid
// it takes the request object, response object and next function as parameters
function verifyToken (req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined' && typeof bearerHeader === 'string'){
		//Split at the space to get token from bearer token
		const bearer = bearerHeader.split(' ');
		//Get token from array
		const bearerToken = bearer[1];
		//Set the token to req object
		req.token = bearerToken;
		//Next middleware
		next();
	}


	//If bearer is undefined
	else {
		console.log({
			request: {
				type: 'GET',
				url: req.originalUrl,
				status: "FAILED"
			},
			message: 'Undefined Bearer! You are not logged in! Sign in again to perform this action...'
		});
		res.status(403).json({
			authStatus: false,
			message: 'Undefined Bearer! You are not logged in! Sign in again to perform this action...'
		});
	}
}


module.exports = {
	signUser,
	verifyToken
}

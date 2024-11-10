const jwt = require('jsonwebtoken');


//Generate Token for User Login
function signUser(user, secretKey, response) {
	return jwt.sign({user}, secretKey, {expiresIn: '100s'},(err, token) => {
		console.log('TOKEN:', token);
		response.json({
			user,
			message: "Authentication is successful!",
			token
		});
	});
};


// Verify Token for User Login
function verifyToken (req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        //Forbidden
        res.sendStatus(403).json({
            message: 'Forbidden',
            description: 'You do not have permission to perform this operation'
        });
    }
}


module.exports = {
	signUser,
	verifyToken
}

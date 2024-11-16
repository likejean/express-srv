const jwt = require('jsonwebtoken');


//Generate Token for User Login
function signUser(user, secretKey, res, req) {
	return jwt.sign({user}, secretKey, {expiresIn: '1000s'},(err, token) => {
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


// Verify Token for User Login
function verifyToken (req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
	console.log('headers', req.headers['authorization'])
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

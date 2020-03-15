const jwt = require('jsonwebtoken');

const config = {
    authSecret: 'rahasia',
}

module.exports = config;

// check if user logged in
module.exports.isAuthenticated = (request, response, next) => {
    const token = request.headers.authorization;
    if(token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, (error, decode) => {
            if(error) {
                return response.status(401).json({
                    message: 'Unauthorization'
                });
            } else {
                return next();
            }
        })
    } else {
        return response.status(401).json({
            message: 'Unauthorization'
        });
    }
}
var jwt = require('jsonwebtoken');

exports.auth_check = async(req,res,next) => {
    jwt.verify(req.headers.authorization,"token_key",next)
}

exports.user_check = async(req,res,next) => {
    jwt.verify(req.headers.authorization,"user_token",next)
}
const { response } = require('express')
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No token provided"
        });
    }

    try {

        const { uuid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        
        req.uuid = uuid;
        req.name = name;
        next();
    } catch(error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        })
    }
}

module.exports = {
    validateJWT
}
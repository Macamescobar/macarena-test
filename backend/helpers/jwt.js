const jwt = require('jsonwebtoken');

const generateJWT = (uuid, name ) => {
    const payload = { uuid, name };
    // Create token, sign para firmar el token
    return jwt.sign( payload, process.env.SECRET_JWT_SEED, {expiresIn: '2h'});
}

module.exports = {
    generateJWT
}
const jwt = require('jsonwebtoken');


const jwtValidation = (req, res, next) => {

    if (req.cookies.jwt) {
        const token = req.cookies.jwt;

        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                res.status(401).send('Access is Denied');
            } else {
                next();
            }
        })
    } else {
        res.status(401).send('Access is Denied')
    }
}


module.exports = jwtValidation;
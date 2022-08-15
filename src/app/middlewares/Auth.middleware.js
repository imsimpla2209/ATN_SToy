const jwt = require('jsonwebtoken');
const secretKey = 'Cocaidbhackdc';

module.exports = {
    authenticator: (req, res, next) => {
        try {
            let token = req.cookies.token;
            let result = jwt.verify(token, secretKey);
            next();
        } catch (error) {
            // console.log(error);
            res.redirect('/account/login');
        }
    }
}
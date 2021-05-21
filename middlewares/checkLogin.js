const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {

    const {authorization} = req.headers;

    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {name, username, userId} = decoded;

        req.name = name;
        req.username = username;
        req.userId = userId;

        next();

    } catch (errors) {
        next('Authentication Error In Login Middleware');
        // console.log(errors);
    }
}

module.exports = checkLogin;

const jwt = require("jsonwebtoken")
const { secret } = require("../server")

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'No token, authorization denied' });
            return false;
        }
        const decoded = jwt.verify(token, secret);
        res.status(200).json({ message: 'have token', decoded });
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { auth }
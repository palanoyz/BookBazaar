const jwt = require("jsonwebtoken")
const { secret } = require("../server")

const checkToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "not token" });
        }
        const decode = jwt.verify(token, secret);
        res.status(200).send({ message: "have token", token: decode });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { checkToken }
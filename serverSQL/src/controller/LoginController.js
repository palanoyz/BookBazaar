const { dbConnect } = require("../lib/mysql")
const { matchPassword } = require("../lib/ManagePassword")
const jwt = require("jsonwebtoken")
const { secret } = require("../server")
const { getErrorMessage, reportError } = require("../lib/Error")

const login = async (req, res) => {
    try {
        const client = await dbConnect();
        const { email, password } = req.body;
        const result = await client.query(`SELECT * FROM User WHERE email = ?`, [email])
        const MatchPassword = await matchPassword(password, result[0].password);
        if (result[0] !== null && !(MatchPassword))
            return res.status(401).send({
                message: "Email or Password is incorrect"
            })
        else if (result[0] === null)
            return res.status(401).send({
                message: "Email or Password is incorrect"
            })
        const id = result[0][0]._id
        const role = result[0][0].role
        const token = jwt.sign({ id, role }, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
    } catch (error) {
        reportError({ message: getErrorMessage(error) })
        console.log(error);
    }
}

module.exports = { login }
const { dbConnect } = require("../lib/mysql")
const { matchPassword } = require("../lib/ManagePassword")
const jwt = require("jsonwebtoken")
const { secret } = require("../server")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    try {
        const client = dbConnect();
        const { email, password } = req.body;
        const result = await client.query(`SELECT * FROM User WHERE email = "${email}"`)

        if (result[0].length === 0) {
            return res.status(401).send({
                message: "Email or Password is incorrect",
            });
        }

        const storedPasswordHash = result[0][0].password;
        const isMatch = await matchPassword(password, storedPasswordHash);
        if (!isMatch) {
            return res.status(401).send({
                message: "Email or Password is incorrect",
            });
        }

        const id = result[0][0]._id
        const role = result[0][0].role
        const token = jwt.sign({ id, role }, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({
            message: "Login successful",
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = { login }
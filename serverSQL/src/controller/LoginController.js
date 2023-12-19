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

        const MatchPassword = await matchPassword(password, result[0][0].password); 

        if (!email || !password) {
            res.status(400).send({
                message: "Please fill the form"
            })
        } else if (result[0] !== null && (!MatchPassword))
            return res.status(401).send({
                message: "Email or Password is incorrect"
            })
        else if (result[0] === null)
            return res.status(401).send({
                message: "Email or Password is incorrect"
        })

        const id = result[0][0]._id
        const role = result[0][0].role
        const payload = { id, role }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({
            message: "Login successful",
            result: result[0][0]
        });
    } catch (error) {
        console.log(error);
    }

}

module.exports = { login }
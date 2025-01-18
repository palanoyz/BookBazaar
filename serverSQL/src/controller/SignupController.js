const { dbConnect } = require("../lib/mysql")
const { hashPassword } = require("../lib/ManagePassword")

const signup = async (req, res) => {
    try {
        const client = await dbConnect();
        const { username, email, password, role, fname, lname } = req.body;
        const createuser = {
            username,
            email,
            password: await hashPassword(password),
            role: role || "user",
            fname: "",
            lname: "",
        };

        await client.query(`INSERT INTO User(username, email, password, role, fname, lname) VALUES (?, ?, ?, ?, ?, ?)`, [
           createuser.username,
           createuser.email,
           createuser.password,
           createuser.role,
           createuser.fname,
           createuser.lname
        ]);     

        return res.status(201).send({
            message: "Sign up success",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signup }
const { dbConnect } = require("../lib/mysql");
const { hashPassword, matchPassword } = require("../lib/ManagePassword");

const changePassword = async (req, res) => {
    try {
        const { id, password, newpassword } = req.body;
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM User WHERE _id = ?`, id);
        const user = result[0][0];
        if (user === null) {
            return res.status(400).send("User not found");
        }
        const match = await matchPassword(password, result.password);
        if (!match) {
            return res.status(400).send("Wrong password");
        }
        const hash = await hashPassword(newpassword);
        const newpass = await client.query(`UPDATE User SET password = ? WHERE _id = ?`, { hash, id });
        res.status(200).send("Change password successed");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { changePassword }
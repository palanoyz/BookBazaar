const { dbConnect } = require("../lib/mysql");
const { hashPassword, matchPassword } = require("../lib/ManagePassword");

const ChangePassword = async (req, res) => {
    try {
        const { id, password, newpassword } = req.body;
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM User WHERE _id = ? `, id);

        if (!id || !password || !newpassword) {
            res.status(400).send({
                message: "Please fill the form"
            })
        } else if (result[0][0] < 1) {
            return res.status(400).send({
                message: "User not found"
            });
        }
        const match = await matchPassword(password, result[0][0].password);

        if (!match) {
            return res.status(400).send({
                message: "Invalid password"
            });
        }
        const hash = await hashPassword(newpassword);
        const newpass = await client.query(`UPDATE User SET password = "${hash}" WHERE _id = ${id}`);
        res.status(200).send({
            message: "Change password successed"
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { ChangePassword };

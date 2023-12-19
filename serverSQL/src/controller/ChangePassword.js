const { dbConnect } = require("../lib/mysql");
const { hashPassword, matchPassword } = require("../lib/ManagePassword");

const ChangePassword = async (req, res) => {
    try {
        const { id, password, newpassword } = req.body;
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM User WHERE _id = ?`, id);
        const user = result[0][0];

        if (user === null) {
            return res.status(400).send("User not found");
        }

        const isMatch = await matchPassword(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Wrong password");
        }

        const hash = await hashPassword(newpassword);
        await client.query(`UPDATE User SET password = ? WHERE _id = ?`, [hash, id]);

        return res.status(200).send("Change password succeeded");
    } catch (error) {
        console.log(error);
    }
};

module.exports = { ChangePassword };

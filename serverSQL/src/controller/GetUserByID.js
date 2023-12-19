const { dbConnect } = require("../lib/mysql");

const GetUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM User WHERE _id = ?`, id)
        if (result[0].length < 1) {
            res.status(404).send({
                message: "User not found"
            })
        }
        const User = result[0][0]
        return res.status(200).send(User)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetUserByID }
const { dbConnect } = require("../../lib/mysql")

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const client = dbConnect();
        const result = await client.query(`DELETE FROM User WHERE _id = ?`, id)
        return res.status(200).send({
            message: "Delete user success",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { DeleteUser }
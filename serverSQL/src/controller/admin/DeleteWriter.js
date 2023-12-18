const { dbConnect } = require("../../lib/mysql")

const DeleteWriter = async (req, res) => {
    try {
        const { type, id } = req.params;
        const client = await dbConnect();
        await client.query(`DELETE FROM ${type} WHERE _id = ?`, id)
        return res.status(200).send({
            message: "Delete author successed",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { DeleteWriter }
const { dbConnect } = require("../../lib/mysql")

const DeleteWriter = async (req, res) => {
    try {
        const { id, type } = req.params;
        const client = await dbConnect();
        const check = await client.query(`SELECT * FROM ${type} WHERE _id = ${id}`)

        await client.query(`DELETE FROM ${type} WHERE _id = ${id}`)
        return res.status(200).send({
            message: `Delete ${type} success`
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { DeleteWriter }
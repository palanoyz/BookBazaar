const { dbConnect } = require("../../lib/mysql")

const GetWriter = async (req, res) => {
    try {
        const { type } = req.params;
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM ${type}`)

        const table = result[0]
        return res.status(200).send({result: table});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetWriter }
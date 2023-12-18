const { dbConnect } = require("../../lib/mysql")

const GetWriter = async (req, res) => {
    try {
        const { type } = req.params;
        const client = await dbConnect();
        await client.query(`SELECT * FROM ${type}`)
        return res.status(200).send({
            message: "Get writer successed",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetWriter }
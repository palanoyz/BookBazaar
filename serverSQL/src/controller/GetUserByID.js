const { dbConnect } = require("../lib/mysql");

const GetUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        await client.query(`SELECT * FROM User WHERE _id = ${id}`)
        return res.status(200).send({
            message: "Get user data successed",
        })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { GetUserByID }
const { error } = require("console");
const { dbConnect } = require("../lib/mysql");

const GetBookByID = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        await client.query(`SELECT * FROM Books WHERE _id = ?`, id)
        return res.status(200).send({
            message: "Get book data successed",
        })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
}

module.exports = { GetBookByID }
const { dbConnect } = require("../lib/mysql");

const GetBookByID = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM Manga WHERE _id = ${id}`);
        return res.status(200).send(result[0][0])
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetBookByID }
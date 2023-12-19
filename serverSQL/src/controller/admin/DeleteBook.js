const { dbConnect } = require("../../lib/mysql")

const DeleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        const check = await client.query(`SELECT * FROM Book WHERE _id = ?`, id)

        if (check[0].length < 1) {
            res.status(404).send({
                message: "Book not found"
            });
            return false;
        };
        await client.query(`DELETE FROM Book WHERE _id = ?`, id)
        return res.status(200).send({
            message: "Delete book success",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { DeleteBook }
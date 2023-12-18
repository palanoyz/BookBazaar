const { dbConnect } = require("../lib/mysql")

const DeleteBookInCart = async (req, res) => {
    try {
        const client = await dbConnect();
        const { id } = req.body;
        await client.query(`DELETE FROM Cart WHERE book_id = ${id}`)
        return res.status(200).send({
            message: "Delete book in cart successed",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { DeleteBookInCart }
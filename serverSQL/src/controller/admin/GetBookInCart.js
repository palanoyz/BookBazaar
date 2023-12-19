const { dbConnect } = require("../../lib/mysql")

const GetBookInCart = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await dbConnect();
        const result = await client.query(`select Cart._id _id, Manga._id bookID , title bookName, author authorName, price bookPrice, image bookImage from Manga join Cart on Manga._id = Cart.bookID WHERE userID = ?`, id);
        const matching = result[0].map((item) => {
            return {
                _id: String(item._id),
                bookID: String(item.bookID),
                bookName: String(item.bookName),
                bookPrice: String(item.bookPrice),
                bookImage: String(item.bookImage),
                authorName: String(authorName)
            }
        })
        return res.status(200).send({ message: "Get book in cart", matching });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetBookInCart }
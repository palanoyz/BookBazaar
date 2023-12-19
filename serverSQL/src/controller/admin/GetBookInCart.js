const { dbConnect } = require("../../lib/mysql")

const GetBookInCart = async (req, res) => {
    try {
        const { userID } = req.query;
        const client = await dbConnect();
        const result = await client.query(`SELECT Cart._id _id, Manga._id bookID , title bookName, author authorName, price bookPrice, image bookImage FROM Manga JOIN Cart ON (Manga._id = Cart.bookID) WHERE userID = ?`, userID);
        const matching = result[0].map((item) => {
            return {
                _id: String(item._id),
                bookID: String(item.bookID),
                bookName: String(item.bookName),
                authorName: String(item.authorName),
                bookPrice: String(item.bookPrice),
                bookImage: String(item.bookImage),
            }
        })
        return res.status(200).send({ matching });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetBookInCart }
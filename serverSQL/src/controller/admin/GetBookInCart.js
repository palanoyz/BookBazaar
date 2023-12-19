const { dbConnect } = require("../../lib/mysql")

const GetBookInCart = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await dbConnect();
        const result = await client.query(`SELECT 
            Manga._id AS _id , title , author , publisher , category , price , image , description , date
            FROM Manga JOIN Cart ON Manga._id = Cart.bookID WHERE userID = ?`, id)
        const bookcart = result[0]
        return res.status(200).send({
            bookcart
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetBookInCart }
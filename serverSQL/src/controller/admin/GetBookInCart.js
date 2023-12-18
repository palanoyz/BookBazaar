const { dbConnect } = require("../../lib/mysql")

const GetBookInCart = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await dbConnect();
        const result = await client.query(`SELECT 
            Manga._id _id , title , author , publisher , category , price , image , descriptionpdf , date
            FROM Manga JOIN Cart ON Manga._id=Cart.bookID userID=?`, id)
        const bookcart = result[0]
        return res.status(200).send({
            bookcart
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetBookInCart }
const { dbConnect } = require("../lib/mysql")

const MyBooks = async (req, res) => {
    try {
        const { userID } = req.query;
        const client = await dbConnect();
        const result = await client.query(`select Transaction._id , Transaction.totalAmount , Transaction.date , 
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT(
        '_id', Manga._id ,
        'title', Manga.title ,
        'author', Manga.author ,
        'publisher', Manga.publisher , 
        'category' ,Manga.category , 
        'price', Manga.price ,
        'image', Manga.image , 
        'description', Books.description
        )), ']') AS books
        FROM Manga JOIN Transaction ON Manga._id = Transaction.bookID where userID = ?` , userID)
        const tranbook = result[0]
        return res.status(200).send({
            tranbook
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { MyBooks }
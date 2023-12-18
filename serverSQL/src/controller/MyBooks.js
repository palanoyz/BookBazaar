const { dbConnect } = require("../lib/mysql")

const MyBooks = async (req, res) => {
    try {
        const { userID } = req.query;
        const client = await dbConnect();
        const result = await client.query(`select Transaction._id , Transaction.totalAmount , Transaction.date , 
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT(
        '_id', Books._id, 'title', Books.title, 'author', Books.author,
        'publisher', Books.publisher , 'Category' ,Books.Category , 'price', Books.price ,
        'image', Books.image , 'description', Books.description
        )), ']') AS books
        from Books join Transaction on Books._id = Transaction.book_id where user_id = ?` , userID)
        const tranbook = result[0]
        return res.status(200).send({
            tranbook
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { MyBooks }
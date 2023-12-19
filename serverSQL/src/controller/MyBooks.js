const { dbConnect } = require("../lib/mysql")

const MyBooks = async (req, res) => {
    try {
        const { userID } = req.query;
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM Transaction JOIN View_Manga ON Transaction.bookID = View_Manga._id WHERE userID = ?`, userID);

        const collection = Array.isArray(result[0])
            ? result[0].map((item) => {
                return { bookImage: item.image };
            })
            : [];
        res.status(200).send(collection);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { MyBooks }
const {dbConnect} = require("../lib/mysql")

const GetAllBooks = async (req, res) => {
    try {
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM MangaInfo`)

        const allbook = result[0].map((book) => {
            return {
                _id: String(book._id),
                title: book.title,
                author: String(book.author_id),
                publisher: String(book.publisher_id),
                category: String(book.category_id),
                price: book.price,
                image: book.image,
                description: book.description,                               
                authorInfo: [
                    {
                        _id: String(book.author_id),
                        name: book.author,
                    }
                ],
                publisherInfo: [
                    {
                        _id: String(book.publisher_id),
                        name: book.publisher,
                    }
                ],
                categoryInfo: [
                    {
                        _id: String(book.category_id),
                        name: book.category,
                    }
                ],
            };
        });

        return res.status(200).send(allbook)
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {GetAllBooks}
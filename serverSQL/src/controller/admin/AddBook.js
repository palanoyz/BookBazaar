const { dbConnect } = require("../../lib/mysql");

const AddBook = async (req, res) => {
    try {
        const { title, author, publisher, category, price, image, description } = req.body;
        const client = await dbConnect();
        const data = {
            title,
            author,
            publisher,
            category,
            price,
            image,
            description,
        };

        const addbook = await client.query(`INSERT INTO 
        Book(title,price,image,description) VALUES("${data.title}",${data.price},"${data.image}","${data.description}")`)

        const book = await client.query(`SELECT _id FROM Book WHERE title = "${data.title}"`)

        const findaut = await client.query(`SELECT * FROM Author WHERE name = "${data.author}"`)
        await client.query(`INSERT INTO Author_Book SET bookID = ${book[0][0]._id} , authorID = ${findaut[0][0]._id}`)

        const findpub = await client.query(`SELECT * FROM Publisher WHERE name = "${data.publisher}"`);
        await client.query(`INSERT INTO Publisher_Book SET bookID = ${book[0][0]._id} , publisherID = ${findpub[0][0]._id}`)

        const findcat = await client.query(`SELECT * FROM Category WHERE name = "${data.category}"`)
        await client.query(`INSERT INTO Category_Book SET bookID = ${book[0][0]._id} , categoryID = ${findcat[0][0]._id}`)

        const result = await client.query(`SELECT * FROM Books WHERE _id = ${book[0][0]._id}`)
        res.send(result[0])

    } catch (error) {
        console.log(error);
    }
}

module.exports = { AddBook }
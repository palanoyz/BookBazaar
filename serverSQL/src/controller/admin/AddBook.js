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
            description
        };

        // add book
        const addbook = await client.query(`INSERT INTO 
        Book(title,price,image,description) VALUES('${data.title}',${data.price},'${data.image}','${data.description}')`)

        // get bookID
        const book = await client.query(`SELECT _id FROM Book WHERE title = "${data.title}"`)

        // add publisher to book
        const findpub = await client.query(`SELECT * FROM Publisher WHERE _id = "${data.publisher}"`);
        if (findpub[0].length < 1) {
            res.status(404).send({
                message: "Publisher not found"
            });
            return false;
        };
        await client.query(`INSERT INTO Publisher_Book SET bookID = ${book[0][0]._id} , publisherID = ${findpub[0][0]._id}`)

        // add author to book
        const findaut = await client.query(`SELECT * FROM Author WHERE _id = "${data.author}"`)
        if (findaut[0].length < 1) {
            res.status(404).send({
                message: "Author not found"
            });
            return false;
        };
        await client.query(`INSERT INTO Author_Book SET bookID = ${book[0][0]._id} , authorID = ${findaut[0][0]._id}`)

        //add category to book
        const findcat = await client.query(`SELECT * FROM Category WHERE _id = "${data.category}"`)
        if (findcat[0].length < 1) {
            res.status(404).send({
                message: "Category not found"
            });
            return false;
        };
        await client.query(`INSERT INTO Category_Book SET bookID = ${book[0][0]._id} , categoryID = ${findcat[0][0]._id}`)

        const result = await client.query(`SELECT * FROM View_Manga WHERE _id = ${book[0][0]._id}`)
        res.status(200).send(result[0])

    } catch (error) {
        console.log(error);
    }
}

module.exports = { AddBook }
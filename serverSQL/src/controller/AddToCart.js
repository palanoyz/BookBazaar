const { dbConnect } = require("../lib/mysql")

const AddToCart = async (req, res) => {
    try {
        const { userID, bookID } = req.body;
        const client = await dbConnect();
        await client.query(`INSERT INTO Cart(userID, bookID) VALUES(${userID}, ${bookID})`)
        return res.status(201).send({
            message: "Add to cart successed",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { AddToCart }
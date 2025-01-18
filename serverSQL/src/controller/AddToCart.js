const { dbConnect } = require("../lib/mysql")

const AddToCart = async (req, res) => {
    try {
        const { userID, bookID } = req.query;
        const client = await dbConnect();
        await client.query(`INSERT INTO Cart(userID, bookID) VALUES(${userID}, ${bookID})`)
        return res.status(201).send({
            message: "Add to cart success",
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { AddToCart }
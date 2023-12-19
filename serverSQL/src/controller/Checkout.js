const { dbConnect } = require("../lib/mysql");
const { v4: uuidv4 } = require("uuid")

const Checkout = async (req, res) => {
    try {
        const { userID, bookID, totalAmount } = req.body;

        const _id = uuidv4();

        const result = await Promise.all(bookID?.map(async (item) => {
            const client = await dbConnect();
            await client.query(`INSERT INTO Transaction (_id, userID, bookID, totalAmount, date) VALUES (?,?,?,?,?)`, [_id, userID, item, totalAmount, new Date()]);
        }));
        res.status(200).send({
            checkout: "success",
            data: result,

        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { Checkout }
const { dbConnect } = require("../lib/mysql")

const DeleteFromCart = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await dbConnect();        
        await client.query(`DELETE FROM Cart WHERE _id = ?`, id)
        return res.status(200).send({
            message: "Deleted",
        })
    } catch (error) {
        console.log(error);
    }
}

const DeleteBookAfterCheckout = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await dbConnect();
        await client.query(`DELETE FROM Cart WHERE userID = ?` , id)
        res.status(200).send({
            message: "Deleted"
        })
    } catch (error) {
        console.log(error);        
    }
}

module.exports = { DeleteFromCart, DeleteBookAfterCheckout }
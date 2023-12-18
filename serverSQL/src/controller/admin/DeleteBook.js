const { dbConnect } = require("../../lib/mysql")

const DeleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await dbConnect();
        await client.query(`DELETE FROM Book WHERE _id = ${id}`)
        return res.status(200).send({
            message: "Delete book successed",
        })
    } catch (error) {
        console.log(error);    
    } 
}

module.exports = {DeleteBook}
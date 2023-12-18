const {dbConnect} = require("../lib/mysql")

const GetAllBooks = async (req, res) => {
    try {
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM Manga`)
        const book = result[0]
        return res.status(200).send({
            book    
        })
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {GetAllBooks}
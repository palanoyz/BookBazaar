const { dbConnect } = require("../../lib/mysql");

const GetAllUser = async (req, res) => {
    try {
        const client = await dbConnect();
        const result = await client.query(`SELECT * FROM User WHERE role='user'`)
        const user = result[0]
        return res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetAllUser }
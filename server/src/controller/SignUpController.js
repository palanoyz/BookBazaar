const { client, connectDB } = require('../server.js');
const bcrypt = require('bcrypt');


const saltRounds = 10;
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash
};
module.exports = async (req, res) => {
    try {
        const { username, password, email, phonenumber } = req.body
        await connectDB()
        const createuser = {
            username,
            password: await hashPassword(password),
            email,
            phonenumber
        }
        await client.db('user').collection('user').insertOne(createuser)
        res.status(201).json(createuser)
        client.close()
    }
    catch (error) {
        console.log('Error', error);
    }
}  
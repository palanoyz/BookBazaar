const { client, connectDB } = require('../server.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body
        await connectDB()
        const result = await client.db('user').collection('user').findOne({ email })
        if (!result) {
            return res.status(400).json({ message: 'not users' })
        }
        const passMatch = await bcrypt.compare(password, result.password)
        if (!passMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }
        res.status(200).json(result)
        await client.close()
    } catch (error) {
        console.log(error);
    }
}
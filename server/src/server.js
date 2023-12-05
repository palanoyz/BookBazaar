const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const { MongoClient, ObjectId } = require('mongodb')

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: [`http://localhost:${PORT}`]
}))

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
})

app.get('/', (req,res)=>{
    res.send({ message: 'home' })
})

const url = "mongodb+srv://kritamet:1234@cluster0.ebbbwuy.mongodb.net/"
const client = new MongoClient(url)

app.post('/api/signup', async (req,res)=>{
    try {
        const {username, email, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const user = {
            username,
            email,
            password
        }
        await client.db("bookbazaar").collection("user").insertOne(user)
        res.status(201).send(user)
    } catch(err) {
        res.send(err)
    }
})

app.post()
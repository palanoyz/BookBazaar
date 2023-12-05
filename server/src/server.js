const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const { MongoClient, ObjectId } = require('mongodb')

const PORT = 5000
const app = express()
const url = "mongodb+srv://kritamet:1234@cluster0.ebbbwuy.mongodb.net/"
const client = new MongoClient(url)

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: [`http://localhost:${PORT}`]
}))

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
})

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to DB");
    } catch (e) {
        console.log("Error", e);
    }
};

app.get('/', (req,res)=>{
    res.send({ message: 'BookBazaar' })
})

// Sign Up
app.post('/api/signup', async (req,res)=>{
    try {
        const { username, email, password } = req.body
        if (email === '' || password === '') {
            return res.status(400).send({
              message: 'Enter email and password',
              success: false,
            })
        }
        const user = {
            username,
            email,
            password: await bcrypt.hash(password, 5),
        }
        await client.db("bookbazaar").collection("user").insertOne(user)
        res.status(200).send(user)
    } catch(err) {
        res.send(err)
    }
})

// Login
app.post('/api/login', async (req,res)=>{
    try {
        const { email, password } = req.body
        if (email === '' || password === '') {
            return res.status(400).send({
                message: 'Enter email and password',
                success: false,
            })
        }

        const result = await client.db('bookbazaar').collection('user').findOne({ email: email })

        if (result !== null && !(await bcrypt.compare(password, result.password))) {
            return res.status(401).send({
                message: 'Email or Password is incorrect',
                success: false,
            })
        } else if (result === null) {
            return res.status(404).send({
                message: 'Email or Password is incorrect',
                success: false,
            })
        } 
        return res.status(200).send({
            message: 'Login Success',
            success: true,
        })
    } catch(err) {
        res.send(err)
    }
})
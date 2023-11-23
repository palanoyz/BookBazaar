const login = require("./controller/LoginController")
const signup = require("./controller/SignupController")
const { MongoClient } = require('mongodb');
const express = require("express")
const cors = require("cors")

const app = express()
const port = 5000
const uri = 'mongodb+srv://kritamet:1234@cluster0.kdvkhdy.mongodb.net/'
const client = new MongoClient(uri)

app.use(cors())
app.use(express.json())

const connectDB = async () => {
    try {
        await client.connect()
        console.log('Connected to DB');
    }
    catch (e) {
        console.log('Error', e);
    }
}

app.post('/login', login)
app.post('/signup', signup)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})

connectDB();
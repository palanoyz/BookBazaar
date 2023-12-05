const express = require("express")
const { MongoClient } = require('mongodb')
const cors = require("cors")

const login = require("./controller/LoginController")
const signup = require("./controller/SignupController")

const app = express()
const PORT = 5000
const uri = 'mongodb+srv://kritamet:1234@cluster0.kdvkhdy.mongodb.net/bookbazaar'
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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})

connectDB();

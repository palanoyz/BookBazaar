const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const PORT = 5000
const url = "mongodb+srv://kritamet:1234@cluster0.ebbbwuy.mongodb.net/"
const client = new MongoClient(url)
const secret = "GN0000"

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: [`http://localhost:3000`]
}))

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
})
const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error", err);
    }
}

app.get('/', (req,res)=>{
    res.send({ message: 'BookBazaar' })
})

const saltRounds = 10;
const matchPassword = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds); 
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// Sign Up
app.post('/api/signup', async (req,res) => {
    try {
        const { username, password, email ,role} = req.body;
        await connectDB();
        const createuser = {
            username,
            email,
            password: await hashPassword(password), 
            role: role || "user"
        };
        await client.db('bookbazaar').collection('user').insertOne(createuser);
        res.status(201).json(createuser);
        await client.close();
    }
    catch (error) {
        console.log('Error', error);
    }
})

// Login
app.post('/api/login', async (req,res) => {
    try {
        await connectDB();
        const { email, password } = req.body;
        const findEmail = await client.db('bookbazaar').collection('user').findOne({ email: email });
        if (!findEmail) {
            res.status(400).json({ message: 'email not found' });
            return false;
        }
        const MatchPassword = await matchPassword(password, findEmail.password);
        if (!MatchPassword) {
            res.status(400).json({ message: 'password not match' });
            return false;
        }
        const payload = { id: findEmail._id, role: findEmail.role };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'login success', result: findEmail});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
})

// Check if user logged in
app.get('/api/checkToken', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "not token" });
        }
        const decode = jwt.verify(token, secret);
        res.status(200).send({ message: "have token", token: decode });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
})

// Logout
app.post('/api/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({message : 'logout'});
    } catch (error) {
        console.log(error);        
    }
})


const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const PORT = 5000
const secret = "GN000"; module.exports = { secret };
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))


// import
const { signup } = require("./controller/SignupController");
const { login } = require("./controller/LoginController");
const { changePassword } = require('./controller/ChangePassword');
const { checkToken } = require('./controller/CheckToken');



// routes
app.post('/api/signup', signup)
app.post('/api/login', login)
app.get("/api/checkToken", checkToken)
app.put('/api/changepassword', changePassword)


app.listen(PORT, () => {
    console.log(`Server's running at http://localhost:${PORT}`)
})
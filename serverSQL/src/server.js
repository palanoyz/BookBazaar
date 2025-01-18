const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const PORT = 5000
const secret = "GN000"; module.exports = { secret };
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: [`http://localhost:3000`]
}))


// import
const { signup } = require("./controller/SignupController");
const { login } = require("./controller/LoginController");
const { ChangePassword } = require('./controller/ChangePassword');
const { checkToken } = require('./controller/CheckToken');
const { auth } = require("./middleware/auth");
const { GetAllUser } = require('./controller/admin/GetAllUser');
const { AddAuthor } = require('./controller/admin/AddAuthor');
const { AddPublisher } = require("./controller/admin/AddPublisher");
const { AddCategory } = require("./controller/admin/AddCategory");
const { AddBook } = require('./controller/admin/AddBook');
const { DeleteUser } = require('./controller/admin/DeleteUser');
const { logout } = require('./controller/LogoutController');
const { GetUserByID } = require('./controller/GetUserByID');
const { GetBookByID } = require('./controller/GetBookByID');
const { AddToCart } = require('./controller/AddToCart');
const { DeleteWriter } = require('./controller/admin/DeleteWriter');
const { GetWriter } = require('./controller/admin/GetWriter');
const { DeleteFromCart, DeleteBookAfterCheckout } = require('./controller/DeleteFromCart');
const { MyBooks } = require('./controller/MyBooks');
const { DeleteBook } = require('./controller/admin/DeleteBook');
const { GetAllBooks } = require('./controller/GetAllBooks');
const { GetBookInCart } = require('./controller/admin/GetBookInCart');
const { Checkout } = require('./controller/Checkout');



// routes
app.post('/api/signup', signup)
app.post('/api/login', login)
app.get('/api/checkToken', checkToken)
app.put('/api/changepassword', auth, ChangePassword)
app.post('/api/logout', logout)
app.get('/api/getuser/:id', GetUserByID)
app.get('/api/getbook/:id', GetBookByID)
app.post('/api/addToCart', AddToCart)
app.get('/api/getmybooks', MyBooks)
app.get('/api/getallbooks', GetAllBooks)
app.get('/api/getBookInCart', GetBookInCart)
app.delete('/api/deleteBookInCart', DeleteFromCart)
app.delete('/api/deleteBookAfterCheckout', DeleteBookAfterCheckout)
app.post('/api/checkout', Checkout)

app.get('/admin/getalluser', GetAllUser)
app.post('/admin/addAuthor', AddAuthor)
app.post('/admin/addPublisher', AddPublisher)
app.post('/admin/addCategory', AddCategory)
app.post('/admin/addBook', AddBook)
app.delete('/admin/deletebook/:id', DeleteBook)
app.delete('/admin/deleteuser/:id', DeleteUser)
app.get('/admin/getwriter/:type', GetWriter)
app.delete('/admin/deletewriter/:type/:id', DeleteWriter)




app.listen(PORT, () => {
    console.log(`Server's running on port ${PORT}`)
})
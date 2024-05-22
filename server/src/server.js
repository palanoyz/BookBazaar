const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
const PORT = 5000
const url = ""
const client = new MongoClient(url)
const secret = ""

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: [`http://localhost:3000`]
}))

app.listen(PORT, async () => {
    console.log(`Server's running on port ${PORT}`)
})
const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error", err);
    }
}

app.get('/', (req, res) => {
    res.send({ message: 'BookBazaar' })
})

// hash and compare password
const saltRounds = 5;
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
const matchPassword = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

// Sign Up
app.post('/api/signup', async (req, res) => {
    try {
        await connectDB();
        const { username, password, email, role } = req.body;
        if (username === '' || email === '' || password === '') {
            return res.status(400).send({
                message: 'Enter email and Password',
                success: false,
            })
        }
        const createuser = {
            username,
            email,
            password: await hashPassword(password),
            role: role || "user",
            fname: "",
            lname: "",
        };
        await client.db('bookbazaar').collection('user').insertOne(createuser);
        res.status(201).json(createuser);
        await client.close();
    }
    catch (error) {
        console.log(error);
    }
})

// Login
app.post('/api/login', async (req, res) => {
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
        res.status(200).json({ message: 'login success', result: findEmail });
    } catch (error) {
        console.log(error);
    }
})

// change password
app.put('/api/changepassword', async (req, res) => {
    try {
        const { id, password, newpassword } = req.body;
        await connectDB();
        const findUser = await client.db("bookbazaar").collection("user").findOne({ _id: new ObjectId(id) });
        if (!findUser) {
            return res.status(400).send("User not found");
        }
        const match = await matchPassword(password, findUser.password);
        if (!match) {
            return res.status(400).send("Wrong password");
        }
        const hash = await hashPassword(newpassword);
        await client.db("bookbazaar").collection("user").updateOne({ _id: new ObjectId(id) }, { $set: { password: hash } });
        res.status(200).send("Change Password Success");
    } catch (error) {
        console.log("Error", error);
    }
})

// Middleware, Check if user logged in
app.get('/api/checkToken', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "not token" });
        }
        const decode = jwt.verify(token, secret);
        res.status(200).send({ message: "have token", token: decode });
    } catch (error) {
        console.log(error);
    }
})

// Logout
app.post('/api/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'logout' });
    } catch (error) {
        console.log(error);
    }
})

// get user by id
app.get('/api/getuser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await connectDB();
        const findUser = await client.db("bookbazaar").collection("user").findOne({ _id: new ObjectId(id) });
        if (!findUser) {
            res.status(404).json({ message: "User not found" });
            return false;
        }
        res.status(200).json(findUser);
    } catch (error) {
        console.log(error);
    }
})

// get all books
app.get('/api/getallbooks', async (req, res) => {
    try {
        await client.connect();
        const result = await client
            .db("bookbazaar")
            .collection("book")
            .aggregate([
                {
                    $lookup: {
                        from: "author",
                        localField: "author",
                        foreignField: "_id",
                        as: "authorInfo"
                    },
                },
                {
                    $lookup: {
                        from: "publisher",
                        localField: "publisher",
                        foreignField: "_id",
                        as: "publisherInfo",
                    },
                },
                {
                    $lookup: {
                        from: "category",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryInfo",
                    },
                },
            ])
            .toArray();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
})

// get book by id
app.get('/api/getbook/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await connectDB();
        const matching = await client
            .db("bookbazaar")
            .collection("book")
            .aggregate([
                {
                    $lookup: {
                        from: "author",
                        localField: "author",
                        foreignField: "_id",
                        as: "authorInfo",
                    },
                },
                {
                    $lookup: {
                        from: "publisher",
                        localField: "publisher",
                        foreignField: "_id",
                        as: "publisherInfo",
                    },
                },
                {
                    $lookup: {
                        from: "category",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryInfo",
                    },
                },
            ]);
        const result = await matching.toArray();
        const book = await result.find((book) => book._id.toString() === id);
        res.status(200).send(book);
    } catch (error) {
        console.log(error);
    }
})

// Add to cart
app.post('/api/addToCart', async (req, res) => {
    try {
        await connectDB();
        const { userID, bookID } = req.query;
        const data = {
            userID: new ObjectId(String(userID)),
            bookID: new ObjectId(String(bookID)),
        };
        const result = await client
            .db("bookbazaar")
            .collection("cart")
            .insertOne(data);
        res.status(200).send({ message: "Add to cart", result: result });
    } catch (error) {
        console.log(error);
    }
})

// Delete books in cart
app.delete('/api/deleteBookInCart', async (req, res) => {
    try {
        await connectDB();
        const { id } = req.query;
        const deleteBookinCart = await client.db("bookbazaar").collection("cart").deleteOne({ _id: new ObjectId(id) });
        res.status(200).send({ message: "Delete book in cart", deleteBookinCart });
    } catch (error) {
        console.log(error);
    }
})

//get books in cart
app.get('/api/getBookInCart', async (req, res) => {
    try {
        //await connectDB();
        await client.connect();
        const { userID } = req.query;
        const matching = await client
            .db("bookbazaar")
            .collection("cart")
            .aggregate([
                {
                    $match: {
                        userID: new ObjectId(userID),
                    },
                },
                {
                    $lookup: {
                        from: "book",
                        localField: "bookID",
                        foreignField: "_id",
                        as: "bookInfo",
                    },
                },
                {
                    $unwind: "$bookInfo",
                },
                {
                    $project: {
                        _id: 1,
                        bookID: 1,
                        userID: 1,
                        bookName: "$bookInfo.title",
                        bookPrice: "$bookInfo.price",
                        bookImage: "$bookInfo.image",
                        authorID: "$bookInfo.author",
                    },
                },
                {
                    $lookup: {
                        from: "author",
                        localField: "authorID",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $unwind: "$author",
                },
                {
                    $project: {
                        _id: 1,
                        bookID: 1,
                        userID: 1,
                        bookName: 1,
                        bookPrice: 1,
                        bookImage: 1,
                        authorName: "$author.name",
                    },
                }
            ])
            .toArray();
        res.status(200).send({ message: "Get book in cart", matching });
    } catch (error) {
        console.log(error);
    }
})
// clear cart when checkout
app.delete('/api/deleteBookAfterCheckout', async (req, res) => {
    try {
        const { id } = req.query;
        const result = await client.db("bookbazaar").collection("cart").deleteMany({ userID: new ObjectId(id) });
        res.status(200).send({ message: "Delete book in cart", result });
    } catch (error) {
        console.log(error);
    }
})

// Checkout
app.post('/api/checkout', async (req, res) => {
    try {
        const { userID, bookID, totalAmount } = req.body;

        const book = Promise.all(bookID?.map(async (item) => {
            return new ObjectId(item);
        }));
        const transactionData = {
            userID,
            bookID: await book,
            totalAmount,
            date: new Date(),
        };

        await connectDB();
        const result = await client
            .db("bookbazaar")
            .collection("transaction")
            .insertOne(transactionData)
            .catch((error) => {
                console.log(error);
            });
        res.status(200).send({
            checkout: "success",
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
})

// get user's books collection
app.get('/api/getmybooks', async (req, res) => {
    try {
        await connectDB();
        const { userID } = req.query;
        const collection = await client
            .db("bookbazaar")
            .collection("transaction")
            .aggregate([
                {
                    $match: {
                        userID: userID,
                    },
                },
                {
                    $lookup: {
                        from: "book",
                        localField: "bookID",
                        foreignField: "_id",
                        as: "books",
                    },
                },
                {
                    $unwind: "$books",
                },
                {
                    $project: {
                        _id: 0,
                        bookID: "$books._id",
                        bookName: "$books.title",
                        bookImage: "$books.image",
                    },
                },
            ])
            .toArray();
        res.status(200).send(collection);
    } catch (error) {
        console.log(error);
    }
})

// Search book
app.get('/api/searchbook', async (req, res) => {
    try {
        await connectDB();
        const result = await client.db("bookbazaar").collection("book").find({}).toArray();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
})





// Admin permission

// get all user
app.get('/admin/getalluser', async (req, res) => {
    try {
        await connectDB();
        const result = await client.db("bookbazaar").collection("user").find({ role: "user" }).toArray();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
})
// delete user by id
app.delete('/admin/deleteuser/:id', async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;
        const result = await client.db("bookbazaar").collection("user").deleteOne({ _id: new ObjectId(id) });
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
})

// add book
app.post('/admin/addBook', async (req, res) => {
    try {
        const { title, author, publisher, category, price, image, description } = req.body;
        await connectDB();
        const data = {
            title,
            author: new ObjectId(author),
            publisher: new ObjectId(publisher),
            category: new ObjectId(category),
            price,
            image,
            description,
        };
        await client.db("bookbazaar").collection("book").insertOne(data);
        await client.close();
        res.status(200).send({
            status: "success",
            data: data,
        });
    } catch (error) {
        console.log(error);
    }
})
// delete book by id
app.delete('/admin/deletebook/:id', async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;
        const result = await client.db("bookbazaar").collection("book").deleteOne({ _id: new ObjectId(id) });
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
})
// update book
app.put('/admin/updatebook', async (req, res) => {
    try {
        const { _id, title, price } = req.body;
        await connectDB();
        const updateBook = {
            title,
            price
        };
        await client.db("bookbazaar").collection("book").updateOne({ _id }, { $set: updateBook });
        res.status(201).json(updateBook);
    } catch (error) {
        console.log(error);
    }
})


// add author
app.post('/admin/addAuthor', async (req, res) => {
    try {
        await connectDB();
        const { name } = req.body;
        if (!name) {
            res.status(400).send({ message: "Please enter author's name" });
            return false;
        }
        const find = await client.db("bookbazaar").collection("author").findOne({ name });
        if (find) {
            res.status(400).send({ message: "Author already exists" });
            return false;
        }
        const result = await client.db("bookbazaar").collection("author").insertOne({ name });
        res.status(200).send({ result });
    }
    catch (error) {
        console.log(error);
    }
})
// get author by name
app.get('/admin/getAuthor/:name', async (req, res) => {
    try {
        await connectDB();
        const { author } = req.params;
        const result = await client.db("bookbazaar").collection("author").find({ author }).toArray();
        res.status(200).send({ result });
    } catch (error) {
        console.log(error);
    }
})

// add publisher
app.post('/admin/addPublisher', async (req, res) => {
    try {
        const { name } = req.body;
        await connectDB();
        if (!name) {
            res.status(400).send({ message: "Please enter publisher's name" });
            return false;
        }
        const find = await client.db("bookbazaar").collection("publisher").findOne({ name });
        if (find) {
            res.status(400).send({ message: "Publisher already exists" });
            return false;
        }
        const result = await client.db("bookbazaar").collection("publisher").insertOne({ name });
        res.status(200).send({ result });
    } catch (error) {
        console.log(error);
    }
})

// add category
app.post('/admin/addCategory', async (req, res) => {
    try {
        const { name } = req.body;
        await connectDB();
        if (!name) {
            res.status(400).send({ message: "Please enter category's name" });
            return false;
        }
        const find = await client
            .db("bookbazaar")
            .collection("category")
            .findOne({ name });
        if (find) {
            res.status(400).send({ message: "Category already exists" });
            return false;
        }
        const result = await client
            .db("bookbazaar")
            .collection("category")
            .insertOne({ name });
        res.status(200).send({ result });
    } catch (error) {
        console.log(error);
    }
})

// get book_info (author, publisher, category)
app.get('/admin/getwriter/:type', async (req, res) => {
    try {
        await connectDB();
        const { type } = req.params;
        const result = await client.db("bookbazaar").collection(type).find({}).toArray();
        res.status(200).send({ result });
    } catch (error) {
        console.log(error);
    }
})
// delete book_info (author, publisher, category)
app.delete('/admin/deletewriter/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;
        await connectDB();
        const result = await client.db("bookbazaar").collection(type).deleteOne({ _id: new ObjectId(id) });
        res.status(200).send({
            result
        });
    } catch (error) {
        console.log(error);
    }
})

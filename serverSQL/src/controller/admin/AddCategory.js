const { dbConnect } = require("../../lib/mysql");

const AddCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const client = await dbConnect();
        if (!name) {
            res.status(400).send({ message: "Please enter Author Name" });
            return false;
        }
        await client.query(`INSERT INTO Category(name) VALUES(?)`, name)
        return res.status(201).send({
            message: "Add Category success",
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { AddCategory }
//import zone
import express from "express";
import mysql from "mysql2/promise";
// import { config } from "./lib/config";
// import { Connection } from "mysql2/typings/mysql/lib/Connection";
// import controller from './controller/test'

//define zone
const PORT = 5000;
const app = express();
app.use(express.json());

//route zone
app.get("/", (req,res) => {
    res.send("Home")
})


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
});
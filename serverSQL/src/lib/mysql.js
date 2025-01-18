const mysql = require("mysql2")

const dbConnect = () => {
    const pool = mysql
        .createPool({
            host: 'localhost',
            user: 'root',
            password: 'css222',
            port: '3306',
            database: 'bookbazaar',
            waitForConnections: true,
            queueLimit: 0,
            connectionLimit: 10
        })
        .promise()

    return pool
}

module.exports = { dbConnect };
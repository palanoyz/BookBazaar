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
            connectionLimit: 10,
            queueLimit: 0
        })
        .promise()

    return pool
}

module.exports = { dbConnect };
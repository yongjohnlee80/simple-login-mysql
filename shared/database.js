const mysql = require("mysql");

// Database (MySQL) connection.
// http://localhost/phpmyadmin/
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

module.exports = {
    db: db
};
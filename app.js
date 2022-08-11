// dependencies
const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');

// configure dotenv file path.
dotenv.config({ path: './.env'}); // environment file

// create express application.
const app = express();

// Database (MySQL) connection.
// http://localhost/phpmyadmin/
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL connected..");
    }
});

// Parse URL-encoded bodies (as sent by HTML forms).
app.use(express.urlencoded({
    extended: false
}));

// Parse JSON bodies (as sent by API clients).
app.use(express.json());

// Set public directory (static files) for express application.
const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));
console.log(publicDirectory);

// Set View Engine : hbs (handle bar template engine)
app.set('view engine', 'hbs');

// Routers
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Start Server.
app.listen(5000, () => {
    console.log("server started on port 5000");
});
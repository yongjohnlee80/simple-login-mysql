const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    // res.send("<h1>Home Page</h1>");
    res.render("index"); // index.hbs
});

router.get("/register", (req, res) => {
    res.render("register"); // register.hbs
})

module.exports = router;
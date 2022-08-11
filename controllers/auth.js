const database = require("../shared/database");
const jwt = require("jsonwebtoken"); // json web token for auth.
const bcrypt = require("bcryptjs"); // for password encryption.

exports.register = async (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    database.db.query(
        "SELECT email FROM users WHERE email = ?",
        [email],
        (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                return res.render("register", {
                    message: "That email is already in use",
                });
            } else if (password !== passwordConfirm) {
                return res.render("register", {
                    message: "Passwords do not match",
                });
            }
        }
    );

    let hashedPassword = await bcrypt.hash(password, 8); // 8 rounds of hashing
    console.log(hashedPassword);

    database.db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                res.send("user added");
            }
        }
    );
};

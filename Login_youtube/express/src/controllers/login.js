const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../routers/db_config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const  { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: "error", error: "Please Enter your email and password"});
    } else {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (!result.length || !await bcrypt.compare(password, result[0].password)) {
                return res.json({ status: "error", error: "Email or password is incorrect " });
            } else {
                // console.log(result[0].id, process.env.JWT_SECRET);
                // console.log(email);
                const id = result[0].id;
                console.log(id);
                console.log(process.env.JWT_SECRET);
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                    // httpOnly: true
                });
                console.log("the token is " + token);
                
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status:"success", success:"User has been logged In"});
            }
        })
    }
}

module.exports = login;
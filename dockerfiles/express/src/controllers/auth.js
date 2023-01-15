const express = require("express");
const register = require("./register");
const login = require("./login");
const router = express.Router();

//add
const cors = require('cors')
router.use(cors());

router.post("/register", register);
router.post("/login", login);

// app.post("/api/login", (req, res) => {
//     console.log(req.body.email)
//     var name = req.body.email;
//     var password = req.body.password;
//     var message = "Hello " + name +":" + password + "\nWelcome to Q-bo."
//     res.send(JSON.stringify({message: message}));
// });




module.exports = router;
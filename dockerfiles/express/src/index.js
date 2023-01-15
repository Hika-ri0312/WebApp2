const dotenv = require("dotenv").config();
const express = require("express");
const db = require("./routers/db_config.js");
const app = express();
const cookie = require("cookie-parser");
const PORT = process.env.EXPRESS_PORT;
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
db.connect((err) => {
    if (err) throw err;
    console.log("database connected!");
})
app.use("/", require("./routers/pages"))
app.use("/api",require("./controllers/auth"));
app.listen(PORT);
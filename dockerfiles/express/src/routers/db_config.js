const sql = require("mysql2");
const dotenv = require("dotenv").config();
const db = sql.createConnection({
    // host:process.env.DATABASE_HOST,
    // user:process.env.DATABASE_USER,
    // password:process.env.DATABASE_PASSWORD,
    // database:process.env.DATABASE_NAME

    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME

    
})

module.exports = db;
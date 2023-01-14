const db = require("../routers/db_config");
const jwt = require("jsonwebtoken");

const loggedIn = async(req, res, next) => {
    if (!req.cookies.userRegistered) {
        return next();
    }
    try {
        const decoed = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE id = ?', [decoed.id],(err, result) => {
            if(err) return next();
            req.user = result[0];
            return next();
        })
    } catch (err) {
        if(err){
            return next()
        }
    }
}
module.exports = loggedIn;
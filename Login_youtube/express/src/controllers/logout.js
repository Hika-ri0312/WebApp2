const logout = (req,res) => {
    res.clearCookie("useRegistered");
    res.redirect("/");
}

module.exports = logout;
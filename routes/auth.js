const router = require("express").Router();
const passport = require("passport");
const {isNotLoggedIn, isLoggedIn} = require("../lib/auth")

router.get("/login", (req,res)=>{
    res.render("../view/login")
});

router.post("/login", isNotLoggedIn, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
}));

router.get("/signup", (req,res)=>{
    res.render("../view/signup")
});

router.post("/signup", isNotLoggedIn, passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
}));

router.get('/logout', (req, res) =>{
    req.logOut();
    res.redirect('/login');
});

module.exports = router;
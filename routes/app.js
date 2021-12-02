const router = require("express").Router();
const { isLoggedIn } = require("../lib/auth")

router.get("/about", isLoggedIn, (req, res)=>{
    res.render("../view/about")
});

module.exports = router;
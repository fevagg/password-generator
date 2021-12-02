const router = require("express").Router();
const { isLoggedIn } = require("../lib/auth");
const { creatingPassword, 
        showingPassword, 
        deletePassword, 
        editPass, 
        updatePass } = require("../controller/mypass");

router.get("/mypass", isLoggedIn, (req, res)=>{
    res.render("../view/pass");
});

router.post("/mypass", isLoggedIn, creatingPassword);

router.get("/", isLoggedIn, showingPassword);

router.get("/:id/delete", isLoggedIn, deletePassword);

router.get("/:id/edit", isLoggedIn, editPass);

router.post("/:id/edit", isLoggedIn, updatePass);

module.exports = router;
const express = require("express");
const path = require("path");
const passport = require("passport");
const morgan = require("morgan");
const MySQLStore = require("express-mysql-session");
const session = require("express-session");
const { database } = require("./data/keys");
require("dotenv").config({ path: "port.env" });

//App initialization.
const app = express();
require("./lib/passport");

//Setting port.
const port = process.env.PORT || 5000;

//Setting middlewares.
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

//Statics
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "node_modules/font-awesome")));
app.use(express.static(path.join(__dirname, "public")))

//Local variables
app.use((req, res, next)=>{
    app.locals.user = req.user;
    next();
});

//Routing
app.use(require("./routes/app.js"));
app.use(require("./routes/auth.js"));
app.use(require("./routes/mypass.js"));

//Listen on port
app.listen(port, () =>{
    `Listen on port ${port}`
});

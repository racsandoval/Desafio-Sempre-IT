const express        = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    db               = require("./seed"),
    flash            = require("connect-flash"),
    session          = require('express-session');

//REQUIRING ROUTES
const indexRoutes      = require("./routes/index"),
    funcionarioRoutes  = require("./routes/funcionario"),
    promocaoRoutes     = require("./routes/promocao");

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    next();
 });

app.use("/", indexRoutes);
app.use("/funcionario", funcionarioRoutes);
app.use("/promocao", promocaoRoutes);

// DB SAMPLES
db.SeedDB();

app.listen(3000, function(){
    console.log("app.js is running")
});
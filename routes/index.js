const express = require("express"),
    router = express.Router();
    db = require("../seed");

// ROOT ROUTE
router.get("/", function(req, res){
    res.send("Hello World. Este Serviço foi desenvolvido por: \"Rafael Sandoval\"")
});

// INDEX ROUTE
router.get("/funcionarios", function(req, res){
    let sql = `SELECT id, nome FROM funcionarios`;
    db.all(sql, function(err, funcionarios){
        if (err){
            throw err;
        }
        res.render("index", {funcionarios: funcionarios})
    });
});

//SEARCH BAR ROUTE
router.get("/encontrar", function(req, res){
    if (req.query.funcionario && req.query.funcionario.id.length !== 0){
        return res.redirect("/funcionario/" + req.query.funcionario.id);
    }
    req.flash('error', 'Por favor digite ID de funcionário');
    res.redirect("/funcionarios");   
});


module.exports = router;
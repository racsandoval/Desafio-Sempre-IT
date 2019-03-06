const express = require("express"),
    router = express.Router();
    db = require("../seed");

//NEW ROUTE
router.get("/new", function (req, res){
    res.render("new");
});

//CREATE ROUTE
router.post("/", function(req, res){
    let sql = `INSERT INTO funcionarios(nome, cargo, salario, cpf) VALUES (?,?,?,?)`;
    let params = [req.body.funcionario.nome,
                  req.body.funcionario.cargo,
                  req.body.funcionario.salario,
                  req.body.funcionario.cpf];
    db.run(sql, params, function(err){
        if (err){
            throw err;
        }
        res.redirect("/funcionarios");
    });
});

//SHOW ROUTE
router.get("/:id", function(req, res){
    let sql = `SELECT * FROM funcionarios WHERE id = ?`;
    db.get(sql, [req.params.id] , function(err, funcionario){
        if (err || !funcionario){
            req.flash('error', 'Funcionário não encontrado');
            return res.redirect("/funcionarios");
        }
        res.render("show", {funcionario: funcionario});
        
    });
});

module.exports = router;

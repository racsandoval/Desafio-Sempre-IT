const express = require("express"),
    router = express.Router();
    db = require("../seed");

//EDIT ROUTE
router.get("/:id/edit", function(req, res){
    let sql = `SELECT * FROM funcionarios WHERE id = ?`;
    db.get(sql, [req.params.id], function(err, funcionario){
        if (err || !funcionario ){
            req.flash('error', 'Funcionário não encontrado');
            return res.redirect("/funcionarios");
        }
        res.render("edit" ,{funcionario: funcionario});
    });
});

//UPDATE ROUTE
router.put("/:id", function (req, res){
    let sql = `UPDATE funcionarios SET salario = ?, cargo = ? WHERE id = ?`
    db.run(sql, [req.body.funcionario.salario, req.body.funcionario.cargo, req.params.id],
        function(err){
            if (err){
                throw err;
            }
            res.redirect("/funcionario/"+req.params.id);
        }
    );
});

module.exports = router;
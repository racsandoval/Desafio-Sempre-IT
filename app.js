const express        = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    sqlite3          = require("sqlite3").verbose(),
    methodOverride   = require("method-override");

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// DATABASE SETTINGS
let db = new sqlite3.Database(':memory:', function(err) {
    if (err) {
      throw err; // Maneira ruim de lidar com erros, crasha o site e não avisa usuário de erro de fluxo.
    }
    console.log('Connected to the in-memory SQlite database.');
});

// DB SAMPLES
db.serialize(function(){
    db.run('CREATE TABLE funcionarios(id INTEGER PRIMARY KEY,nome text, cargo text, salario integer, cpf text)')
        .run(`INSERT INTO funcionarios(nome, cargo, salario, cpf) 
            VALUES('Simone Atherton', 'Junior Dev', '1000' , '38596515011'),
                ('Javan Hartley' , 'Senior Dev', '10000' , '64899437005'),
                ('Keanu Coombes' , 'CEO' , '100000' , '05542651097')`, 
            function(err) {
            if (err) {
              throw err;
            }
        });
});


app.get("/", function(req, res){
    res.send("Hello World. Este Serviço foi desenvolvido por: \"Rafael Sandoval\"")
});

// INDEX ROUTE
app.get("/funcionarios", function(req, res){
    let sql = `SELECT id, nome FROM funcionarios`;
    db.all(sql, function(err, funcionarios){
        if (err){
            throw err;
        }
        res.render("index", {funcionarios: funcionarios})
    });
});

//NEW ROUTE
app.get("/funcionario/new", function (req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/funcionario", function(req, res){
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

//SEARCH BAR ROUTE
app.get("/encontrar", function(req, res){
    res.redirect("/funcionario/" + req.query.funcionario.id);
});

//SHOW ROUTE
app.get("/funcionario/:id", function(req, res){
    let sql = `SELECT * FROM funcionarios WHERE id = ?`;
    db.get(sql, [req.params.id] , function(err, funcionario){
        if (err){
            throw err;
        }
        // Evita crash do app, porém não avisa usuário que seu id não foi encontrado.
        if (funcionario){ 
            res.render("show", {funcionario: funcionario});
        } else {
            res.redirect("/funcionarios");
        }
        
    });
});

//EDIT ROUTE
app.get("/promocao/:id/edit", function(req, res){
    let sql = `SELECT * FROM funcionarios WHERE id = ?`;
    db.get(sql, [req.params.id], function(err, funcionario){
        if (err){
            throw err;
        }
        res.render("edit" ,{funcionario: funcionario});
    });
});

//UPDATE ROUTE
app.put("/promocao/:id", function (req, res){
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


app.listen(3000, function(){
    console.log("app.js is running")
});
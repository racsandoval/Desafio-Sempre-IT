const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(':memory:', function(err) {
    if (err) {
      throw err; // Maneira ruim de lidar com erros, crasha o site e não avisa usuário de erro de fluxo.
    }
    console.log('Connected to the in-memory SQlite database.');
});


db.SeedDB = function (){
    db.serialize(function(){
        db.run('CREATE TABLE funcionarios(id INTEGER PRIMARY KEY,nome text, cargo text, salario integer, cpf text)')
            .run(`INSERT INTO funcionarios(nome, cargo, salario, cpf) 
                VALUES('Simone Atherton', 'Junior Dev', '1000' , '38596515011'),
                    ('Javan Hartley' , 'Senior Dev', '1000' , '64899437005'),
                    ('Keanu Coombes' , 'CEO' , '100000' , '05542651097')`, 
                function(err) {
                if (err) {
                  throw err;
                }
            });
    });
}

module.exports = db;

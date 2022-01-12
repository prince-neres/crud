const pg = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { user } = require("pg/lib/defaults");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "aula",
  password: "val44",
  port: 5432,
});

client.connect();

app.post("/users/create", function (req, res) {
  client
    .query({
      text: "INSERT INTO USERS(ID, NAME, PASS) VALUES($1, $2, $3)",
      values: [req.body.id, req.body.nome, req.body.senha],
    })
    .then(function (ret) {
        console.log('Usuário criado:', req.body)
    });
});

app.get('/users/read',function(req, res){
      client
      .query('SELECT * FROM USERS')
      .then(function (ret) {
          res.send(ret.rows)
      });
    }
)

app.put("/users/update", function (req, res) {
  client
    .query({
      text: "UPDATE USERS SET NAME = $1, PASS = $2 WHERE ID = $3",
      values: [req.body.nome, req.body.senha, req.body.id],
    })
    .then(function (ret) {
        console.log('Dados atualizados:', req.body)
    });
});

app.delete("/users/delete", function (req, res) {
  client
    .query({
      text: "DELETE FROM USERS WHERE ID = $1",
      values: [req.body.id],
    })
    .then(function (ret) {
        console.log(`Usuário de ID: ${req.body.id} foi removido com sucesso!`)
    });
});

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});

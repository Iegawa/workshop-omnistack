const express = require("express"); //salva o modulo express na variavel express
const cors = require('cors');
const routes = require('./routes'); //o ./ indica que é um arquivo e não um pacote

const app = express()  //instancia a aplicacao, ira conter todas as rotas

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);  //manda a aplicacao ouvir a porta 3333

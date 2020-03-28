const express = require('express');
// const crypto = require('crypto');
// const connection = require('./database/connection');
const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const routes = express.Router();

// routes.post('/users', (request, response) => {
//     const body = request.body;  //acesso a variavel depois de "?", no caso name=fabi | acesso a um query param vindo da requisicao

//     console.log(body);
//     return response.json({
//         evento: "Semana OmniStack 11.0",
//         aluno: "Fabiana"
//     });
// });

// routes.get('/ongs', async (request, response) => {
//     const ongs = await connection('ongs').select('*');

//     return response.json(ongs);
// })

// routes.post('/ongs', async (request, response) => {
//     const { name, email, whatsapp, city, uf } = request.body;     //nesse caso, salva um dado em cada variavel, evitando o usuario enviar dados em locais que nao desejamos
//     // const data = request.body;
//     // console.log(data);

//     const id = crypto.randomBytes(4).toString('HEX');    //gerar id

//     await connection('ongs').insert({     //como o insert demora e eu preciso retornar só depois de ter finalizado, vira uma funcao assincrona e o await espera terminar o comando para prosseguir
//         id,
//         name,
//         email,
//         whatsapp,
//         city,
//         uf,
//     });

//     return response.json({ id });  //devolve apenas o id pois eh a informacao que a ong usa para se cadastrar na aplicacao
// }); 
routes.get('/ongs', OngController.index);    //listar ongs criadas
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;
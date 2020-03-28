const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;     //nesse caso, salva um dado em cada variavel, evitando o usuario enviar dados em locais que nao desejamos
       
        const id = crypto.randomBytes(4).toString('HEX');    //gerar id

        await connection('ongs').insert({     //como o insert demora e eu preciso retornar só depois de ter finalizado, vira uma funcao assincrona e o await espera terminar o comando para prosseguir
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });  //devolve apenas o id pois eh a informacao que a ong usa para se cadastrar na aplicacao

    }
};
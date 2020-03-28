const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city',
                'ongs.uf'
            ]);
        
        return response.json(incidents);
    },
    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;   //pega o id que vem do request (parametro de rota)
        const ong_id = request.headers.authorization;   //pega o id da ong logada
        
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted."});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();   //204: no content (deu certo mas nao tem conteudo)
    }
};
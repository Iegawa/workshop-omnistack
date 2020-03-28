
exports.up = function(knex) {    //metodo up eh sempre referente a criacao da tabela, o que acontece quando executa a migration
  return knex.schema.createTable('ongs', function (table){    //cria tabela
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();   //o 2 indica o numero de caracteres esperados
  });
};

exports.down = function(knex) {    //metodo down eh se algo der errado, precisa desfazer
    return knex.schema.dropTable('ongs');
};

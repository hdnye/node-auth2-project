
exports.up = async function(knex) {
    await knex.schema.createTable('user_directory', (table) => {
        table.increments('id')
        table.string('username').notNullable().unique()
        table.string('password').notNullable()
        table.string('departments').notNullable()
    })
  
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user-directory')
};

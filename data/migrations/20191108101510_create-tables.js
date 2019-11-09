
exports.up = function(knex) {
  return knex.schema
    // projects
    .createTable('projects', tbl => {
        // id primary key
        tbl.increments()
        // name string required
        tbl.string('name').notNullable()
        // description string
        tbl.string('description')
        // completed boolean default false
        tbl.boolean('completed').defaultTo(false).notNullable()
    })

    // tasks
    .createTable('tasks', tbl => {
        // id primary key
        tbl.increments()
        // description string required
        tbl.string('description').notNullable()
        // notes string 
        tbl.string('notes')
        // completed boolean default false
        tbl.boolean('completed').defaultTo(false).notNullable()
        // project_id foreign key
        tbl.integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })

    // resources
    .createTable('resources', tbl => {
        // id primary key
        tbl.increments()
        // name string required unique
        tbl.string('name').unique().notNullable()
        // description string
        tbl.string('description')
    })

    // project_recources
    .createTable('project_recources', tbl => {
        // id primary key
        tbl.increments()
        // project_id foreign key
        tbl.integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        // resource_id foreign key
        tbl.integer('resource_id')
            .unsigned()
            .references('id')
            .inTable('resources')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('project_recources')
    .dropTable('resources')
    .dropTable('tasks')
    .dropTable('projects')
};

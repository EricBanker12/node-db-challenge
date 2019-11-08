
exports.up = function(knex) {
  return knex.schema
    .renameTable('project_recources', 'project_resources')
};

exports.down = function(knex) {
  return knex.schema
    .renameTable('project_resources', 'project_recources')
};

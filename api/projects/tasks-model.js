const knex = require('knex')

const config = require('../../knexfile')

const db = knex(config.development)

module.exports = {
    add,
    get
}

function add(project_id, item) {
    const {description, notes, completed} = item
    return db('tasks').insert({description, notes, completed: !!completed, project_id}).then(([id]) => get(project_id, id))
}

function get(project_id, id) {
    if (id) {
        return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('tasks.*', 'projects.name as project_name', 'projects.description as project_description')
        .where('tasks.id', id).first()
        .then(resp => {
            resp.completed = !!resp.completed
            return resp
        })
    }
    else {
        return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('tasks.*', 'projects.name as project_name', 'projects.description as project_description')
        .where({project_id})
        .then(resp => resp.map(task => {
            task.completed = !!task.completed
            return task
        }))
    }
}
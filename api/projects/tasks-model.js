const knex = require('knex')

const config = require('../../knexfile')

const db = knex(config.development)

module.exports = {
    add,
    get
}

function add(item, project_id) {
    const {description, notes, completed} = item
    return db('tasks').insert({description, notes, completed: !!completed, project_id}).then(([id]) => get(id))
}

function get(id) {
    if (id) {
        return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('tasks.*', 'projects.name as project_name', 'project.description as project_description')
        .where({id}).first()
        .then(resp => {
            resp.completed = !!resp.completed
            return resp
        })
    }
    else {
        return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('tasks.*', 'projects.name as project_name', 'project.description as project_description')
        .then(resp => resp.map(task => {
            task.completed = !!task.completed
            return task
        }))
    }
}
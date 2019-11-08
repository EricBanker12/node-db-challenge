const knex = require('knex')

const config = require('../../knexfile')

const db = knex(config.development)

module.exports = {
    add,
    get,
    getTree
}

function add(item) {
    const {name, description, completed} = item
    return db('projects').insert({name, description, completed: !!completed}).then(([id]) => get(id))
}

function get(id) {
    if (id) {
        return db('projects')
        .where({id}).first()
        .then(resp => {
            resp.completed = !!resp.completed
            return resp
        })
    }
    else {
        return db('projects')
        .then(resp => resp.map(project => {
            project.completed = !!project.completed
            return project
        }))
    }
}

async function getTree(id) {
    try {
        const project = await get(id)
        
        const tasks = await db('tasks')
            .select('id', 'description', 'completed')
            .where('project_id', id)
            .then(resp => resp.map(task => {
                task.completed = !!task.completed
                return task
            }))

        const resources = await db('project_resources')
            .join('resources', 'resources.id', 'project_resources.resource_id')
            .select('resources.*')
            .where('project_resources.project_id', id)

        return {...project, tasks, resources}
    }
    catch (err) {
        throw err
    }
}
const knex = require('knex')

const config = require('../../knexfile')

const db = knex(config.development)

module.exports = {
    add,
    get
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
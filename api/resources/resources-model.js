const knex = require('knex')

const config = require('../../knexfile')

const db = knex(config.development)

module.exports = {
    add,
    get
}

function add(item) {
    const {name, description} = item
    return db('resources').insert({name, description}).then(([id]) => get(id))
}

function get(id) {
    if (id) return db('resources').where({id}).first()
    else return db('resources')
}
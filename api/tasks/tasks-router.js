const router = require('express').Router()

const tasksDB = require('./tasks-model')

router.get('/', (req, res) => {
    tasksDB.get()
    .then(resp => {
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

router.get('/:id', (req, res) => {
    tasksDB.get(req.params.id)
    .then(resp => {
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = router
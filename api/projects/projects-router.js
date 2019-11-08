const router = require('express').Router()

const projectsDB = require('./projects-model')
const tasksDB = require('./tasks-model')

router.get('/', (req, res) => {
    projectsDB.get()
    .then(resp => {
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
    if (!req.body) return res.status(400).json({message: 'missing data body'})
    
    if (!req.body.name) return res.status(400).json({message: 'missing required field: name'})
    
    projectsDB.add(req.body)
    .then(resp => {
        res.status(201).json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

router.get('/:id/tasks', (req, res) => {
    tasksDB.get(req.params.id)
    .then(resp => {
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

router.post('/:id/tasks', (req, res) => {
    if (!req.body) return res.status(400).json({message: 'missing data body'})
    
    if (!req.body.description) return res.status(400).json({message: 'missing required field: description'})

    tasksDB.add(req.params.id, req.body)
    .then(resp => {
        res.status(201).json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = router
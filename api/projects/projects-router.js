const router = require('express').Router()

const projectsDB = require('./projects-model')

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
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = router
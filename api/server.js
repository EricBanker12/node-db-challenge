const express = require('express')
const helmet = require('helmet')

const resourcesRouter = require('./resources/resources-router')
const projectsRouter = require('./projects/projects-router')
const tasksRouter = require('./tasks/tasks-router')

const server = express()

server.use(helmet())
server.use(express.json())

server.use('/api/resources', resourcesRouter)
server.use('/api/projects', projectsRouter)
server.use('/api/tasks', tasksRouter)

module.exports = server
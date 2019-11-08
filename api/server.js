const express = require('express')
const helmet = require('helmet')

const resourcesRouter = require('./resources/resources-router')

const server = express()

server.use(helmet())
server.use(express.json())

server.use('/api/resources', resourcesRouter)

module.exports = server
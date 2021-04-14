const SERVER_PORT = 3333
const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// Using the template engine
server.set('view engine', 'ejs')

// Change view's path
server.set('views', path.join(__dirname, 'views'))

// Enable static files
server.use(express.static("public"))

// Using request body
server.use(express.urlencoded())

// Routes
server.use(routes)

server.listen(SERVER_PORT, () => console.log('running on port:' + SERVER_PORT))
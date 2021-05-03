#!/usr/bin/env node
const express = require('express')
const server = require('./app') // load up the web server
const port = 3000 // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const mode = `${process.env.NODE_ENV}`
//checks if an environment variable named NODE_ENV is set to PRODUCTION
if (mode === 'PRODUCTION') {
    // if we're in PRODUCTION mode, server static files in front-end/build
    //only need to npx nodemon server in back-end. no need to npm start in front-end.
    console.log('in production mode. express run on port 3000.')
    const path = require('path')
    const dirPath = path.join(__dirname, '../front-end/build')
    server.use(express.static(dirPath))
    console.log('server static files in', dirPath)
    server.get('/*', (req, res) => res.sendFile(path.join(dirPath, './index.html')))
} else {
    //if we're in DEVELOPMENT mode, or there is not variable named NODE_ENV.
    //same operation as before. in back-end, run npx nodemon server. in front-end, run npm start
    console.log('in development mode. client react run on port 4000. express server run on 3000.')
}

const listener = server.listen(port, function () {
    console.log(`Server running on port: ${port}`)
})
// a function to stop listening to the port
const close = () => {
    listener.close()
}
module.exports = {
    close: close,
}

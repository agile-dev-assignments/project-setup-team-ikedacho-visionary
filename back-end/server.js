#!/usr/bin/env node
const server = require('./app') // load up the web server
const port = 3000 // the port to listen to for incoming requests
// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
    console.log(`Server running on port: ${port}`)
})
;('use strict')

var app = require('./app.js')

require('greenlock-express')
    .init({
        packageRoot: __dirname,
        configDir: './greenlock.d',

        // contact for security and critical bug notices
        maintainerEmail: 'lh2510@nyu.edu',

        // whether or not to run at cloudscale
        cluster: false,
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app)
// a function to stop listening to the port
const close = () => {
    listener.close()
}
module.exports = {
    close: close,
}

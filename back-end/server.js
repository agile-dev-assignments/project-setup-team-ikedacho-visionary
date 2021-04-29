#!/usr/bin/env node
const express = require('express')
const server = require('./app') // load up the web server
const port = 3000 // the port to listen to for incoming requests
// call express's listen function to start listening to the port

const path = require('path')
const dirPath = path.join(__dirname, '../front-end/build');
console.log(__dirname)  
server.use(express.static(dirPath))
console.log(dirPath) 
server.get('/*', (req, res) => res.sendFile(path.join(dirPath, './index.html')))

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

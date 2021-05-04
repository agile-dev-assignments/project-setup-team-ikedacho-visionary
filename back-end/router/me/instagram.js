const instagramRouter = require('express').Router()
const request = require('request')
const UserInfo = require('../../model/userInfo/userInfo')

instagramRouter.get('/', async (req, res) => {
    if (req.query.code) {
        const accessToken = req.query.code
        console.log('accessToken:', accessToken)
        res.send('success')
    } else {
        console.log('fail')
        res.send('fail')
    }
})
module.exports = instagramRouter

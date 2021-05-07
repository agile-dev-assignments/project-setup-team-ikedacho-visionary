const auxiliaryRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

// return insensitive information about other users
auxiliaryRouter.get('/api_get_user_info_by_name', (req, res) => {
    const username = req.body.username
    UserInfo.findOne({ user_name: username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(result)
            const ret = {
                username: result.user_name,
                userimg: result.user_photo,
                bio: result.bio,
            }
            res.json(ret)
        }
    })
})

auxiliaryRouter.get('/user', (req, res) => {
    res.send(req.user) // The req.user stores the entire user that has been authenticated inside of it.
})

auxiliaryRouter.get('/my_info', (req, res) => {
    const my_username = req.user.username
    UserInfo.findOne({ user_name: my_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.json(result)
        }
    })
})

auxiliaryRouter.get('/user_ins', (req, res) => {
    if (req.user === undefined) {
        res.status(501).end()
    } else {
        res.send(req.user) // The req.user stores the entire user that has been authenticated inside of it.
    }
})
module.exports = auxiliaryRouter

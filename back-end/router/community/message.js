const messageRouter = require('express').Router()
const Chatroom = require('../../model/chatroom/chatroom')

messageRouter.get('/', async (req, res) => {
    let ret

    // fetch current user name from req.session.user
    const current_user = req.user.username
    // find all chatrooms that this current user is in
    Chatroom.find({
        participants: current_user,
    }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            ret = result
            res.json(ret)
        }
    })
})
module.exports = messageRouter

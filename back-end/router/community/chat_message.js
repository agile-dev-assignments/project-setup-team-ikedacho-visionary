const chatMessageRouter = require('express').Router()
const Chatroom = require('../../model/chatroom/chatroom')

chatMessageRouter.get('/', async (req, res) => {
    let ret = {}
    const roomID = req.query.roomID

    console.log('/api_chat_messages', roomID)

    Chatroom.find({ _id: roomID }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            ret = result[0]
            console.log(ret)
            res.json(ret)
        }
    })
})
module.exports = chatMessageRouter
const sendMessageRouter = require('express').Router()
const Chatroom = require('../../model/chatroom/chatroom')

sendMessageRouter.post('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        let current_date = new Date()
        const newMessage = req.body.text
        const roomID = req.body.roomID
        const self_userimg = req.body.userimg
        console.log(newMessage, roomID)

        // find the chat room, and then add the new message to message history
        Chatroom.findOne({ _id: roomID }, (err, result) => {
            result.message_history.push({
                userimg: self_userimg,
                username: req.user.username,
                time: current_date,
                content: newMessage,
            })
            console.log(result)
            // save the update
            result.save((err) => {
                if (err) {
                    console.log(err)
                }
            })
            res.send('Sent')
        })
    }
})
module.exports = sendMessageRouter

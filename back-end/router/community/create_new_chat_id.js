const createChatId = require('express').Router()
const Chatroom = require('../../model/chatroom/chatroom')
const UserInfo = require('../../model/userInfo/userInfo')

createChatId.get('/', async (req, res) => {
    let ret, self_userimg
    // note that this participantsList is in format of {user: [{}, {}, {}]}, where each user has username and userimg.
    const participantsList = JSON.parse(req.query.participantsList)
    // create an array storing all participants in this chat room
    let participantsName = [req.user.username]
    participantsList.user.forEach(function (item) {
        participantsName.unshift(item.username)
    })
    //console.log(participantsName)

    UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            self_userimg = result.user_photo
            // check if chatroom exists
            Chatroom.findOne({ participants: participantsName }, (err, result) => {
                if (!result) {
                    // check if the chatroom is personal or grouped
                    const single_user_flag = participantsList.user.length === 1
                    const name = single_user_flag ? [req.user.username, participantsList.user[0].username] : ['Group Chat']
                    const avatar = single_user_flag ? [self_userimg, participantsList.user[0].userimg] : ['https://img.icons8.com/plumpy/48/ffffff/people-skin-type-7.png']
                    // create new room
                    const newChatRoom = new Chatroom({
                        chatroom_name: name,
                        chatroom_avatar: avatar,
                        participants: participantsName,
                    })
                    // save to database
                    newChatRoom.save((err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    ret = newChatRoom._id
                    res.json(ret)
                } else {
                    ret = result._id
                    res.json(ret)
                }
            })
        }
    })
})
module.exports = createChatId

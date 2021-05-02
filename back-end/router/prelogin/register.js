const registerRouter = require('express').Router()
const User = require('../../model/loginAuth/user')
const UserInfo = require('../../model/userInfo/userInfo')
const Chatroom = require('../../model/chatroom/chatroom')
const bcrypt = require('bcryptjs')

registerRouter.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err
        if (doc) res.send('User Already Exists')
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            })

            const newUserInfo = new UserInfo({
                user_name: req.body.username,
                user_photo: `https://robohash.org/${req.body.username}.png?size=200x200`,
                background_picture: 'https://resilientblog.co/wp-content/uploads/2019/07/sky-quotes.jpg',
                post_number: 0,
                bio: '🥤',
                follower_number: 1,
                follower: ['Ozone_official'],
                following_number: 1,
                following: ['Ozone_official'],
                linked_social_media: ['O-Zone'],
                unconnected_social_media: ['Twitter', 'Instagram', 'Facebook'],
            })

            // naive way to store current user info in session
            req.user = req.body.username

            await newUser.save()
            await newUserInfo.save()

            // create a default chatroom for new registered users
            const current_date = new Date()
            const message_date = current_date.getFullYear() + '/' + (current_date.getMonth() + 1) + '/' + current_date.getDate() + ' ' + 
                                 current_date.getHours() + ':' + current_date.getMinutes() + ':' + current_date.getSeconds()
            const newChatRoom = new Chatroom({
                chatroom_name: [newUserInfo.user_name, 'Ozone_official'],
                chatroom_avatar: [newUserInfo.user_photo, 'https://robohash.org/Ozone_official.png?size=200x200'], 
                participants: [newUserInfo.user_name, 'Ozone_official'],
                // send a naive greeting message to the new user
                message_history: [
                    {
                        userimg: 'https://robohash.org/Ozone_official.png?size=200x200',
                        username: 'Ozone_official',
                        time: message_date,
                        content: "Welcome to Ozone! Ozone supports a fundamental chat system for direct message and group message! " + 
                                 "To create a new chatroom, you need to follow your friend and ask him/her to follow you as well, " + 
                                 "and then you can create chat room with your friends by clicking on the button at top-right corner of Community page. " +
                                 "You can also visit an user's profile page and click on the 'Chat' button to create a direct message with him/her. ",
                    }
                ]
            })
            // save the new Chatroom to database
            newChatRoom.save((err) => {
                if (err) {
                    console.log(err)
                }
            })

            await UserInfo.findOne({ user_name: 'Ozone_official' }, async (err, UserInfos) => {
                try {
                    user_info = UserInfos

                    follower_list = user_info.follower
                    if (!follower_list.includes(req.body.username)) {
                        follower_list.push(req.body.username)
                        user_info.follower_number++
                    }
                    following_list = user_info.following
                    if (!following_list.includes(req.body.username)) {
                        following_list.push(req.body.username)
                        user_info.following_number++
                    }
                    await UserInfos.save(function (saveErr, saveUserInfos) {
                        if (err) {
                            console.log('error')
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
            })

            res.send('User Created')
        }
    })
})
module.exports = registerRouter

const addFriendRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

addFriendRouter.get('/', async (req, res) => {
    const clicked_follow_username = req.query.clicked_follow_username
    console.log('clicked_follow_username', clicked_follow_username)
    //when user click a people to follow in front-end. the
    const my_username = req.user.username
    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        try {
            user_info = UserInfos
            following_list = user_info.following
            if (!following_list.includes(clicked_follow_username)) {
                following_list.push(clicked_follow_username)
                user_info.following_number++
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving following')
                    res.status(500).send()
                }
            })
        } catch (e) {
            res.status(500).send()
        }
    })

    await UserInfo.findOne({ user_name: clicked_follow_username }, async (err, UserInfos) => {
        try {
            user_info = UserInfos
            follower_list = user_info.follower
            if (!follower_list.includes(my_username)) {
                follower_list.push(my_username)
                user_info.follower_number++
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving adding a following')
                    res.status(500).send()
                }
            })
        } catch (e) {
            res.status(500).send()
        }
    })

    res.status(200).send()
})
module.exports = addFriendRouter

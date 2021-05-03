const removeFriendRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

removeFriendRouter.get('/', async (req, res) => {
    const clicked_unfollow_username = req.query.clicked_unfollow_username
    console.log('clicked_unfollow_username', clicked_unfollow_username)

    const my_username = req.user.username
    console.log(my_username)
    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        try {
            console.log('here')
            user_info = UserInfos
            following_list = user_info.following.slice()
            console.log('following_list', following_list)
            if (following_list.includes(clicked_unfollow_username)) {
                user_info.following = following_list.filter((item) => {
                    if (item !== clicked_unfollow_username) {
                        console.log('start', item)
                        return true
                    }
                    user_info.following = following_list.slice()
                    console.log(following_list)
                    console.log(user_info.following)
                })
                user_info.following_number--
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving deleteing a following')
                    res.status(500).send()
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).send()
        }
    })
    await UserInfo.findOne({ user_name: clicked_unfollow_username }, async (err, UserInfos) => {
        try {
            user_info = UserInfos
            follower_list = user_info.follower.slice()
            console.log(follower_list)
            if (follower_list.includes(my_username)) {
                user_info.follower = follower_list.filter((item) => {
                    if (item !== my_username) {
                        return true
                    }
                })
                user_info.follower_number--
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving deleting a following')
                    res.status(500).send()
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).send()
        }
    })

    res.status(200).send()
})
module.exports = removeFriendRouter

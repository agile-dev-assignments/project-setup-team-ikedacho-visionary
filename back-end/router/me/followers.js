const followersRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

followersRouter.get('/', async (req, res) => {
    let follower_list = [],
        following_list = [],
        ret = []
    const UserName = req.query.UserName

    // find user object in database and extract its follower array
    await UserInfo.findOne({ user_name: UserName }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower_list = result.follower
            following_list = result.following
        }
    })

    // retrieve extended user info from database
    for (let i = 0; i < follower_list.length; i++) {
        await UserInfo.findOne({ user_name: follower_list[i] }, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                ret.push({
                    user_name: result.user_name,
                    bio: result.bio,
                    user_photo: result.user_photo,
                    // dynamically decide the action based on the following status
                    action: following_list.includes(result.user_name) ? 'Unfollow' : 'Follow',
                })
            }
        })
    }

    console.log('Follower info\n: ', ret)
    res.json(ret)
})
module.exports = followersRouter
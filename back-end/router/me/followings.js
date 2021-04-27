const followingsRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

followingsRouter.get('/', async (req, res) => {
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
    for (let i = 0; i < following_list.length; i++) {
        await UserInfo.findOne({ user_name: following_list[i] }, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                ret.push({
                    user_name: result.user_name,
                    bio: result.bio,
                    user_photo: result.user_photo,
                    action: 'Unfollow',
                })
            }
        })
    }

    console.log('Following info\n: ', ret)
    res.json(ret)
})
module.exports = followingsRouter
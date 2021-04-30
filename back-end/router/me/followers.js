const followersRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

followersRouter.get('/', async (req, res) => {
    let follower_list = [],
        following_list = [],
        ret = []
    const UserName = req.query.UserName

    console.log(UserName)

    // find user object in database and extract its follower array
    const result = await UserInfo.findOne({ user_name: UserName })
    follower_list = result.follower
    following_list = result.following

    console.log(follower_list.length)

    // find user infos of the follower list
    const users = await UserInfo.find({ user_name: { $in: follower_list } })
    users.forEach((user) => {
        ret.push({
            user_name: user.user_name,
            bio: user.bio,
            user_photo: user.user_photo,
            // dynamically decide the action based on the following status
            action: following_list.includes(user.user_name) ? 'Unfollow' : 'Follow',
        })  
    })

    console.log('Follower info\n: ', ret.length)
    res.json(ret)
})
module.exports = followersRouter
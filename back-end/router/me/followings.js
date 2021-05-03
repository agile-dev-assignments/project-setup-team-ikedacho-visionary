const followingsRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

followingsRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        let follower_list = [],
            following_list = [],
            ret = []
        const UserName = req.query.UserName

        // find user object in database and extract its follower array
        const result = await UserInfo.findOne({ user_name: UserName })
        follower_list = result.follower
        following_list = result.following

        console.log(following_list.length)

        // find user infos of the following list
        const users = await UserInfo.find({ user_name: { $in: following_list } })
        users.forEach((user) => {
            ret.push({
                user_name: user.user_name,
                bio: user.bio,
                user_photo: user.user_photo,
                action: 'Unfollow',
            })
        })

        console.log('Following info\n: ', ret.length)
        res.json(ret)
    }
})
module.exports = followingsRouter

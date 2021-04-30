const createChatListRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

createChatListRouter.get('/', async (req, res) => {
    let ret = [],
        friend = [],
        follower = [],
        following = []

    // retrieve follower and following lists of current user
    // find user object in database and extract its follower array
    const result = await UserInfo.findOne({ user_name: req.user.username })
    follower = result.follower
    following = result.following

    console.log('follower: ', follower)
    console.log('following: ', following)

    console.log(!isEmpty(follower) && !isEmpty(following))
    if (!isEmpty(follower) && !isEmpty(following)) {
        // lazy finding intersection
        console.log('friend: ', friend)
        for (let i = 0; i < follower.length; i++) {
            if (following.includes(follower[i])) {
                friend.push(follower[i])
            }
        }
        console.log('friend after intersection: ', friend)

        const users = await UserInfo.find({ user_name: { $in: friend } })
        users.forEach((user) => {
            ret.push({ 
                user_name: user.user_name, 
                user_photo: user.user_photo
            })
        })
    }
    
    console.log(ret)
    res.json(ret)
})

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

module.exports = createChatListRouter

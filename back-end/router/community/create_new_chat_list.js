const createChatListRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

createChatListRouter.get('/', async (req, res) => {
    let ret = [],
        friend = [],
        follower = [],
        following = []

    // retrieve follower and following lists of current user
    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower.push(result.follower)
            following.push(result.following)
        }
    })

    console.log('follower: ', follower)
    console.log('following: ', following)
    console.log(!isEmpty(follower[0]) && !isEmpty(following[0]))
    if (!isEmpty(follower[0]) && !isEmpty(following[0])) {
        // lazy finding intersection
        console.log('friend: ', friend)
        for (let i = 0; i < follower[0].length; i++) {
            if (following[0].includes(follower[0][i])) {
                friend.push(follower[0][i])
            }
        }

        console.log('friend after intersection: ', friend)

        // retrieve extended user info from database
        for (let i = 0; i < friend.length; i++) {
            await UserInfo.findOne({ user_name: friend[i] }, (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    ret.push({
                        user_name: result.user_name,
                        user_photo: result.user_photo,
                    })
                }
            })
        }
    }

    console.log(ret)
    res.json(ret)
})

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

module.exports = createChatListRouter

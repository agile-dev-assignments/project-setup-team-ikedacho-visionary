const fetchCommentsRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

fetchCommentsRouter.get('/', async (req, res) => {
    let UserName = req.query.user_name
    let Content = req.query.content
    let comments = []
    let currentPost = []
    // console.log("content:"+ Content)
    await UserInfo.findOne({ user_name: UserName }, async (err, userInfos) => {
        if (err) {
            console.error(err)
        } else {
            // console.log(userInfos)
            if (userInfos !== null) {
                let postData = userInfos.post_data.slice()
                postData.forEach((post) => {
                    if (post.content == Content) {
                        comments = post.commented
                        currentPost = post
                    }
                })
                res.send(comments)
            }
        }
    })
})

module.exports = fetchCommentsRouter
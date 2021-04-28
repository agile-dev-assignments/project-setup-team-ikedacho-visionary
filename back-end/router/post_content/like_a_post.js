const likeAPostRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

likeAPostRouter.get('/', async (req, res) => {
    const self_username = req.user.username
    const post_detail = JSON.parse(req.query.post_detail)
    const current_date = new Date()
    let self_userimg

    console.log('post detail: ', post_detail)

    // find myself and update my liked history
    await UserInfo.findOne({ user_name: self_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.my_like_history === undefined) {
                result.my_like_history = []
            }
            result.my_like_history.push({
                source: post_detail.source,
                user_photo: post_detail.userimg,
                user_name: post_detail.UserName,
                text_content: post_detail.content,
                img_content: post_detail.contentimg,
                post_issued_time: post_detail.Senttime,
                like_issued_time: current_date,
            })
            // also fetch the user_photo for later usage
            self_userimg = result.user_photo

            // save the changes
            result.save((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    const other_username = post_detail.UserName
    // find the post author and update his being-liked history
    await UserInfo.findOne({ user_name: other_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.others_liked_history === undefined) {
                result.others_liked_history = []
            }
            result.others_liked_history.push({
                source: post_detail.source,
                user_photo: post_detail.userimg,
                user_name: post_detail.UserName,
                text_content: post_detail.content,
                img_content: post_detail.contentimg,
                post_issued_time: post_detail.Senttime,
                like_issued_time: current_date,
                liked_by_user_name: self_username,
                liked_by_user_photo: self_userimg,
            })

            // save the changes
            result.save((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    res.send(`Liked on post: ${post_detail} by time ${current_date}`)
})
module.exports = likeAPostRouter

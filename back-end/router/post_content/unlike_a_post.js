const unlikeAPostRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

unlikeAPostRouter.get('/', async (req, res) => {
    const self_username = req.user.username
    const post_detail = JSON.parse(req.query.post_detail)

    console.log('post detail: ', post_detail, typeof post_detail)
    console.log(post_detail.Senttime, post_detail.UserName)

    // find myself and update my liked history
    await UserInfo.findOne({ user_name: self_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            /* to dislike a post, the my_like_history must not be empty
            if (result.my_like_history === undefined){
                result.my_like_history = []
            } */
            // update by filtering out the new post info to the list
            result.my_like_history = result.my_like_history.filter((record) => {
                const date = new Date(Date.parse(record.post_issued_time)).toString()
                const date_post_detail = new Date(Date.parse(post_detail.Senttime)).toString()
                console.log(date, typeof date)
                console.log(date_post_detail, typeof date_post_detail)
                console.log('===================')

                return !(record.user_name === post_detail.UserName && record.source === post_detail.source && date === date_post_detail && record.text_content === post_detail.content)
            })

            console.log('\nresult.my_like_history:\n', result.my_like_history)
            // save the changes <--- without error handling lol
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
            /* to dislike a post, the others_liked_history must not be empty
            if (result.others_liked_history === undefined){
                result.others_liked_history = []
            } */
            // update by pushing the new post info to the list
            let filtered_list = result.others_liked_history.filter((record) => {
                const date = new Date(Date.parse(record.post_issued_time)).toString()
                const date_post_detail = new Date(Date.parse(post_detail.Senttime)).toString()
                console.log(date, typeof date)
                console.log(date_post_detail, typeof date_post_detail)
                console.log('===================')

                return !(
                    record.user_name === post_detail.UserName &&
                    record.source === post_detail.source &&
                    record.text_content === post_detail.content &&
                    date === date_post_detail &&
                    record.liked_by_user_name === self_username
                )
            })

            console.log('\nfiltered_list: ', filtered_list)
            // save the changes
            UserInfo.updateOne({ user_name: other_username }, { others_liked_history: filtered_list }, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    res.send(`Un-liked on post: ${post_detail} by time ${new Date()}`)
})
module.exports = unlikeAPostRouter

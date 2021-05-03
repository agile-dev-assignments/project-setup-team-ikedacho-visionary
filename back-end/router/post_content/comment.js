const commentRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

let post_detail_for_comment = undefined

commentRouter.use(async (req, res, next) => {
    if (req.query.post_detail_for_comment) {
        post_detail_for_comment = JSON.parse(req.query.post_detail_for_comment)
        // console.log('post detail: ', post_detail_for_comment)
    }
    next()
})

commentRouter.get('/get_send_comment', async (req, res) => {
    const comment_text = req.query.comment_text
    // console.log('comment_text: ', comment_text)
    const message = post_detail_for_comment
    // console.log('post detail2222: ', message)
    const self_username = req.user.username
    let self_userimg

    // setup for mentioning matching
    const regex = /@\S+\s/g
    const search_for_mention = comment_text.match(regex)
    const unique_search_names = [...new Set(search_for_mention)];
    const current_date = new Date()

    // find myself and update my commented history
    await UserInfo.findOne({ user_name: self_username }, async (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.my_comment_history === undefined) {
                result.my_comment_history = []
            }
            // also fetch the user_photo for later usage
            self_userimg = result.user_photo
            result.my_comment_history.unshift({
                source: message.source,
                post_created_by_photo: message.userimg,
                post_created_by: message.UserName,
                post_text: message.content,
                post_image: message.contentimg,
                post_created_time: message.Senttime,
                commented_by_username: self_username,
                commented_date: current_date,
                comment_text: comment_text,
                commented_by_photo: self_userimg,
            })

            // save the changes
            UserInfo.updateOne({ user_name: self_username }, { my_comment_history: result.my_comment_history }, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    const other_username = message.UserName
    // find the post author and update his being-comment history
    await UserInfo.findOne({ user_name: other_username }, async (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.others_commented_history === undefined) {
                result.others_commented_history = []
            }
            result.others_commented_history.unshift({
                source: message.source,
                post_created_by_photo: message.userimg,
                post_created_by: message.UserName,
                post_text: message.content,
                post_image: message.contentimg,
                post_date: message.Senttime,
                commented_date: current_date,
                commented_by_username: self_username,
                commented_by_profile_image: self_userimg,
                comment_text: comment_text,
            })

            // save the changes
            UserInfo.updateOne({ user_name: other_username }, { others_commented_history: result.others_commented_history }, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    await UserInfo.findOne({ user_name: other_username }, async (err, result) => {
        if (err) {
            console.error(err)
        } else {
            const a = {
                UserName: self_username,
                content: comment_text,
                userimg: self_userimg,
                Senttime: current_date,
            }
            let postData = result.post_data
            postData.forEach((post) => {
                if (post.content == message.content) {
                    console.log(post.content)
                    post.commented.push(a)
                }
            })
            // save the changes
            UserInfo.updateOne({ user_name: other_username }, { post_data: result.post_data }, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    // match for mentioning and update being-mentioned history
    unique_search_names.forEach(async (item) => {
        const search_name = item.replace(/@|\s/g, '')
        console.log(search_name)
        await UserInfo.findOne({ user_name: search_name }, async (err, result) => {
            if (err) {
                console.error(err)
            } else {
                if (result) {
                    // found!
                    result.others_mentioned_history = result.others_mentioned_history.length ? result.others_mentioned_history : []
                    result.others_mentioned_history.push({
                        mentioner_avatar: self_userimg,
                        mentioner_username: self_username,
                        mentioned_date: current_date,
                        post_image: ' ',
                        post_username: message.UserName,
                        post_avatar: message.userimg,
                        post_text: message.content,
                        comment_text: comment_text,
                    })

                    console.log(result.others_mentioned_history)

                // save the changes
                UserInfo.updateOne({ user_name: search_name }, { others_mentioned_history: result.others_mentioned_history }, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })

                } else {
                    // not found... -> do nothing! this is not a mention, or mentioning wrongly
                }
            }
        })
    })

    res.json(self_username)
    post_detail_for_comment = undefined
})
module.exports = commentRouter
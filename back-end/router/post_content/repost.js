const repostRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

let post_detail_for_repost = undefined

repostRouter.use(async (req, res, next) => {
    if (req.query.post_detail_for_repost) {
        post_detail_for_repost = JSON.parse(req.query.post_detail_for_repost)
        console.log('post detail: ', post_detail_for_repost)
    }
    next()
})

repostRouter.get('/get_repost', async (req, res) => {
    let linked_social_media = [],
        user_name = ''

    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).send()
        } else {
            linked_social_media = result.linked_social_media
            user_name = result.user_name
        }
    })

    const response_data = {
        linked_social_media: linked_social_media,
        user_name: user_name,
    }

    res.json(response_data)
})

repostRouter.get('/get_fast_repost', async (req, res) => {
    const my_username = req.user.username
    const post_text = `Repost from @${post_detail_for_repost.UserName}: ${post_detail_for_repost.content} `
    const current_date = new Date()
    let my_user_photo

    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        try {
            UserInfos.post_data.unshift({
                content: post_text,
                source: 'O-Zone',
                senttime: current_date,
                contentimg: ' ',
            })
            UserInfos.post_number++

            my_user_photo = UserInfos.user_photo

            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving post')
                    res.status(500).send()
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
})

repostRouter.get('/get_repost_inner', async (req, res) => {
    const my_username = req.user.username
    const old_post_text = post_detail_for_repost.content
    const old_post_by = post_detail_for_repost.UserName
    const old_post_img = post_detail_for_repost.contentimg
    const current_date = new Date()
    let my_user_photo
    const response_data = {
        old_post_by: old_post_by,
        old_post_text: old_post_text,
        old_post_img: old_post_img,
    }
    res.json(response_data)
})

module.exports = repostRouter
const preloginHomeRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

preloginHomeRouter.get('/api_getprelogin', async (req, res, next) => {
    const userInfos = await UserInfo.aggregate([{ $sample: { size: 10 } }])
    let postData = []
    userInfos.forEach((userInfo) => {
        console.log(userInfo.user_name)
        const data = userInfo.post_data.map((ele) => {
            ele.userimg = userInfo.user_photo
            ele.UserName = userInfo.user_name
            return ele
        })
        postData = postData.concat(data)
    })

    postData.sort((prev, cur) => {
        return cur.senttime - prev.senttime
    })

    let filtered_post_data = postData.slice()

    res.json(filtered_post_data)
})

preloginHomeRouter.get('/api_getprelogin_recommended', async (req, res, next) => {
    const userInfos = await UserInfo.aggregate([{ $sample: { size: 10 } }])
    let postData = []
    userInfos.forEach((userInfo) => {
        console.log(userInfo.user_name)
        const data = userInfo.post_data.map((ele) => {
            ele.userimg = userInfo.user_photo
            ele.UserName = userInfo.user_name
            return ele
        })
        postData = postData.concat(data)
    })

    postData.sort((prev, cur) => {
        return cur.senttime - prev.senttime
    })

    let filtered_post_data = postData.slice()

    res.json(filtered_post_data)
})

preloginHomeRouter.get('/api_getprelogin_recent', async (req, res, next) => {
    const userInfos = await UserInfo.aggregate([{ $sample: { size: 10 } }])
    let postData = []
    userInfos.forEach((userInfo) => {
        console.log(userInfo.user_name)
        const data = userInfo.post_data.map((ele) => {
            ele.userimg = userInfo.user_photo
            ele.UserName = userInfo.user_name
            return ele
        })
        postData = postData.concat(data)
    })

    postData.sort((prev, cur) => {
        return cur.senttime - prev.senttime
    })

    let filtered_post_data = postData.slice()

    res.json(filtered_post_data)
})

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

module.exports = preloginHomeRouter

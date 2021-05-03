const facebookRouter = require('express').Router()
const request = require('request')
const UserInfo = require('../../model/userInfo/userInfo')

facebookRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        const accessToken = req.query.accessToken
        console.log('accessToken:', accessToken)
        let userID = ''
        let long_lived_token = ''
        let post_data = ''
        const my_username = req.user.username

        const save_posts = async () => {
            console.log('start')
            await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
                try {
                    post_data.forEach((item) => {
                        if ('message' in item) {
                            console.log('post data for each', post_data)
                            UserInfos.post_data.unshift({
                                content: item.message,
                                source: 'Facebook',
                                senttime: item.created_time,
                                contentimg: ' ',
                            })
                            UserInfos.post_number++
                        }
                    })
                    await UserInfos.save(function (saveErr, saveUserInfos) {
                        if (err) {
                            console.log('error saving post')
                            res.status(500).send()
                        }
                    })
                } catch (e) {
                    console.log(e)
                    res.status(500).send()
                }
            })
        }

        await request(
            `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${accessToken}`,

            async function (error, response, body) {
                if (error) {
                    console.log('error')
                } else {
                    const res = JSON.parse(body)
                    console.log('get long-lived-token(body)', JSON.parse(body))
                    long_lived_token = res.access_token
                    //get userid
                    await request(`https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/me?access_token=${long_lived_token}`, async function (error, response, body) {
                        if (error) {
                            console.log('error')
                        } else {
                            console.log('get id:', body)
                            userID = JSON.parse(body).id

                            await request(`https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/${userID}/permissions?access_token=${long_lived_token}`, function (error, response, body) {
                                if (error) {
                                    console.log('error')
                                } else {
                                    console.log('get permissions lists allowed:', body)
                                }
                            })

                            await request(
                                `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/${userID}/feed?fields=id,created_time,message,object_id,permalink_url&access_token=${long_lived_token}`,
                                async function (error, response, body) {
                                    if (error) {
                                        console.log('error')
                                    } else {
                                        //console.log("get posts:",body)
                                        const res2 = await JSON.parse(body)
                                        post_data = res2.data
                                        console.log('posts:', post_data)
                                        if (res2.data) {
                                            save_posts()
                                        }
                                    }
                                }
                            )
                        }
                    })
                }
            }
        )
    }
})
module.exports = facebookRouter

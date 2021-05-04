const instagramRouter = require('express').Router()
const request = require('request')
const UserInfo = require('../../model/userInfo/userInfo')

instagramRouter.get('/', async (req, res) => {
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
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        let user_id = ''
        let long_lived_token = ''
        let post_data = ''
        let short_lived_accessToken = ''
        let client_id = '235520911696213'
        let client_secret = '85832b0f1c6eac1c7471a657f365b1e3'
        let redirect_uri = 'https://ozonewebapp.com/instagram_auth/'
        const my_username = req.user.username

        let url = req.query.url
        console.log(url)

       

        //Exchange the Code for a Token
        var options = {
            url: 'https://api.instagram.com/oauth/access_token',
            method: 'POST',
            form: {
                client_id: client_id,
                client_secret: client_secret,
                grant_type: 'authorization_code',
                redirect_uri: redirect_uri,
                code: req.query.code,
            },
        }

        request(options, function async(error, response, body) {
            if (error) {
                console.log('error')
            } else {
                const res = JSON.parse(body)
                console.log('get short-lived-token(body)', JSON.parse(body))
                //get short lived access token
                short_lived_accessToken = res.access_token
                //get userid
                user_id = res.user_id

                //get short lived access token
                request(
                    `https://graph.instagram.com/access_token=${short_lived_accessToken}`,

                    async function (error, response, body) {
                        if (error) {
                            console.log('error')
                        } else {
                            const res = JSON.parse(body)
                            console.log('get long-lived-token(body)', JSON.parse(body))
                            long_lived_token = res.access_token

                            //get userid
                            request(
                                `https://graph.instagram.com/me?fields=id,username&access_token=${short_lived_accessToken}`,

                                async function (error, response, body) {
                                    if (error) {
                                        console.log('error')
                                    } else {
                                        const res = JSON.parse(body)
                                        console.log('get username', JSON.parse(body))
                                        const username = res.username
                                        console.log(username)
                                    }
                                }
                            )
                        }
                    }
                )
            }
        })
    }
})
module.exports = instagramRouter

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
        const my_username = req.user.username
        const client_id = `${process.env.CLIENT_ID}`
        const client_secret = `${process.env.CLIENT_SERECT}`
        const redirect_uri = 'https://ozonewebapp.com/instagram_auth/'
        let long_lived_token = ''
        let post_data = ''
        let short_lived_accessToken = ''
        let user_id = ''
        if (req.query.url) {
            let url = req.query.url
            console.log('url', url)

            let code = url.split('=')[1]
            console.log('code', code)
            if (code.endsWith('_')) {
                code = code.slice(0, -1)
            }
            if (code.endsWith('#')) {
                code = code.slice(0, -1)
                console.log('code', code)
            }

            //Exchange the Code for a Token
            var options = {
                url: 'https://api.instagram.com/oauth/access_token',
                method: 'POST',
                form: {
                    client_id: client_id,
                    client_secret: client_secret,
                    grant_type: 'authorization_code',
                    redirect_uri: redirect_uri,
                    code: code,
                },
            }

            request(options, function (error, response, body) {
                if (error) {
                    console.log('error')
                } else {
                    const res = JSON.parse(body)
                    console.log('get short-lived-token(body)', JSON.parse(body))
                    //get short lived access token
                    short_lived_accessToken = res.access_token
                    //get userid
                    user_id = res.user_id
                    console.log('user_id', user_id)
                    //get userid
                    request(
                        `https://graph.instagram.com/me?fields=id,username&access_token=${short_lived_accessToken}`,

                        function (error, response, body) {
                            if (error) {
                                console.log('error')
                            } else {
                                console.log(body)
                                const res = JSON.parse(body)
                                console.log('get user node', JSON.parse(body))
                                const username = res.username
                                console.log(username)
                                user_id = res.id
                                console.log('user_id', user_id)
                                request(
                                    `https://graph.instagram.com/${user_id}/media?access_token=${short_lived_accessToken}`,

                                    function (error, response, body) {
                                        if (error) {
                                            console.log('error')
                                        } else {
                                            const res = JSON.parse(body)
                                            console.log('get media node', res)
                                            const post_data_id = res.data
                                            console.log('post_data_id', post_data_id)

                                            const post_id = post_data_id[0].id
                                            console.log('post_id', post_id)
                                            request(
                                                `https://graph.instagram.com/${post_id}&access_token=${short_lived_accessToken}`,

                                                function (error, response, body) {
                                                    if (error) {
                                                        console.log('error')
                                                    } else {
                                                        console.log(`https://graph.instagram.com/${post_id}&access_token=${short_lived_accessToken}`)
                                                        const res = JSON.parse(body)
                                                        console.log('a post data:', res)
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            })
        }
    }
})
module.exports = instagramRouter

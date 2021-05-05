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
        let post_data = []
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

                                    async function (error, response, body) {
                                        if (error) {
                                            console.log('error')
                                        } else {
                                            const res = JSON.parse(body)
                                            console.log('get media node', res)
                                            const post_data_id = res.data
                                            console.log('post_data_id', post_data_id)

                                            await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
                                                try {
                                                    linked_social_media = UserInfos.linked_social_media
                                                    unconnected_social_media = UserInfos.unconnected_social_media

                                                    post_data_id.forEach((e) => {
                                                        request(
                                                            `https://graph.instagram.com/${e.id}?fields=caption,timestamp&access_token=${short_lived_accessToken}`,

                                                            async function (error, response, body) {
                                                                if (error) {
                                                                    console.log('error')
                                                                } else {
                                                                    //console.log(`https://graph.instagram.com/${e.id}?fields=caption,timestamp&access_token=${short_lived_accessToken}`)
                                                                    const res = JSON.parse(body)

                                                                    if ('caption' in res) {
                                                                        console.log('post data ', res)
                                                                        UserInfos.post_data.unshift({
                                                                            content: res.caption,
                                                                            source: 'Instagram',
                                                                            senttime: res.timestamp,
                                                                            contentimg: ' ',
                                                                        })
                                                                        UserInfos.post_number++
                                                                    }

                                                                    await UserInfos.save(async function (saveErr, saveUserInfos) {
                                                                        if (err) {
                                                                            console.log('error saving post')
                                                                            res.status(500).send()
                                                                        } else {
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        )
                                                    })

                                                    //update unconnected_social_media(delete)
                                                    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
                                                        try {
                                                            console.log('before: unconnected_social_media', unconnected_social_media)
                                                            unconnected_social_media1 = unconnected_social_media.filter((element) => {
                                                                if (element !== 'Instagram') {
                                                                    console.log('not !== instagram', element)
                                                                    return true
                                                                }
                                                            })
                                                            console.log('after: unconnected_social_media1', unconnected_social_media1)
                                                            //update unconnected_social_media to database
                                                            const filter1 = { user_name: req.user.username }
                                                            const update1 = { unconnected_social_media: unconnected_social_media1 }
                                                            await UserInfo.findOneAndUpdate(filter1, update1, {
                                                                new: true,
                                                            })
                                                            console.log('c', unconnected_social_media1)
                                                            await UserInfos.save(function (saveErr, saveUserInfos) {
                                                                if (err) {
                                                                    console.log('error update unconnected_social_media1')
                                                                    res.status(500).send()
                                                                }
                                                            })

                                                            if (!linked_social_media.includes('Instagram')) {
                                                                //update linked_social_media(add)
                                                                linked_social_media.push('Instagram')
                                                                //update linked_social_media to database
                                                                const filter2 = { user_name: req.user.username }
                                                                const update2 = { linked_social_media: linked_social_media }
                                                                await UserInfo.findOneAndUpdate(filter2, update2, {
                                                                    new: true,
                                                                })
                                                                //console.log('d',linked_social_media )
                                                            }
                                                            await UserInfos.save(function (saveErr, saveUserInfos) {
                                                                if (err) {
                                                                    console.log('error update linked_social_media')
                                                                    res.status(500).send()
                                                                }
                                                            })
                                                        } catch (e) {
                                                            console.log(e)
                                                            res.status(500).send()
                                                        }
                                                    })
                                                } catch (e) {
                                                    console.log(e)
                                                    res.status(500).send()
                                                }
                                            })
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

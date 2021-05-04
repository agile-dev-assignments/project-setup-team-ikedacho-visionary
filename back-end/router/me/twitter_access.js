const twitterAccessRouter = require('express').Router()
const request = require('request')
const UserInfo = require('../../model/userInfo/userInfo')
const oauthSignature = require('oauth-signature')
const url_parser = require('url')
const query_string = require('querystring')

twitterAccessRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        let post_data = ''
        const my_username = req.user.username

        // only proceed when actual oauth_token/verifier is sent back
        if (req.query.url !== undefined) {
            let ret = {}

            // console.log("the url is: ", req.query.url)
            const query = url_parser.parse(req.query.url).query
            const parsed_query = query_string.parse(query)
            const oauth_token = parsed_query.oauth_token
            const oauth_verifier = parsed_query.oauth_verifier
            // console.log("oauth_token: ", oauth_token, "\noauth_verifier: ", oauth_verifier)

            // now that we have parsed the oauth_token, we can request the access token (the final step)
            const request_url = `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_consumer_key=${process.env.TWITTER_API_KEY}&oauth_verifier=${oauth_verifier}`
            const options = {
                method: 'POST',
                url: request_url,
            }

            await request(options, (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    // console.log(result.body)
                    // manually parse the returned string
                    let arr = result.body.split('&')
                    for (let i = 0; i < 4; i++) {
                        let temp = arr[i].split('=')
                        ret[temp[0]] = temp[1]
                    }

                    console.log('ret: ', ret)

                    /*
                    NOTICE: 
                        Please refer to: 
                        https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens
                        https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timeline
                        https://developer.twitter.com/en/docs/authentication/oauth-1-0a/authorizing-a-request
                    */
                    // try fetch tweets!
                    // get timestamp in seconds
                    const date = Math.floor(Date.now() / 1000)
                    const screen_name = ret.screen_name
                    const nonce = `${fast_hash(date + screen_name)}`
                    console.log('Calculated: ', date, nonce)
                    // Alright, let me just manually generate an encoded signature!!!!!!!
                    const parameters = {
                        oauth_consumer_key: process.env.TWITTER_API_KEY,
                        oauth_token: ret.oauth_token,
                        oauth_nonce: nonce,
                        oauth_timestamp: date,
                        oauth_signature_method: 'HMAC-SHA1',
                        oauth_version: '1.0',
                    }
                    const request_url2 = `https://api.twitter.com/1.1/statuses/user_timeline.json`
                    const consumerSecret = process.env.TWITTER_API_SECRET_KEY
                    const tokenSecret = ret.oauth_token_secret
                    const signature = oauthSignature.generate('GET', request_url2, parameters, consumerSecret, tokenSecret)

                    const AuthHeader = `OAuth oauth_consumer_key="${parameters.oauth_consumer_key}",oauth_token="${parameters.oauth_token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${date}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_signature="${signature}"`

                    const options2 = {
                        method: 'GET',
                        url: request_url2,
                        headers: {
                            Authorization: AuthHeader,
                        },
                    }

                    request(options2, async (err, result) => {
                        if (err) {
                            console.error(err)
                        } else {
                            //console.log(result.body)
                            const post_data = JSON.parse(result.body)
                            // console.log('twitter post_data------', post_data)
                            console.log('post_data------1', post_data)
                            if (post_data !== '') {
                                //save_posts
                                console.log('start')
                                await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
                                    try {
                                        linked_social_media = UserInfos.linked_social_media
                                        unconnected_social_media = UserInfos.unconnected_social_media
                                        await post_data.forEach(async (item) => {
                                            if ('text' in item) {
                                                console.log('post data for each', post_data)
                                                UserInfos.post_data.unshift({
                                                    content: item.text,
                                                    source: 'Twitter',
                                                    senttime: item.created_at,
                                                    contentimg: ' ',
                                                })
                                                UserInfos.post_number++
                                            }
                                        })
                                        await UserInfos.save(async function (saveErr, saveUserInfos) {
                                            if (err) {
                                                console.log('error saving post')
                                                res.status(500).send()
                                            } else {
                                                //update unconnected_social_media(delete)
                                                await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
                                                    try {
                                                        console.log('before: unconnected_social_media', unconnected_social_media)
                                                        unconnected_social_media1 = unconnected_social_media.filter((element) => {
                                                            if (element !== 'Twitter') {
                                                                console.log('not !== facebook', element)
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
                                                                console.log('error saving post')
                                                                res.status(500).send()
                                                            }
                                                        })

                                                        if (!linked_social_media.includes('Twitter')) {
                                                            //update linked_social_media(add)
                                                            linked_social_media.push('Twitter')
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
                                        })
                                    } catch (e) {
                                        console.log(e)
                                        res.status(500).send()
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    }
})

function fast_hash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash &= hash
    }
    return hash
}

module.exports = twitterAccessRouter

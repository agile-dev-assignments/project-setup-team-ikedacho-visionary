const twitterRouter = require('express').Router()
const request = require('request')
const UserInfo = require('../../model/userInfo/userInfo')
const oauthSignature = require('oauth-signature')

twitterRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        let ret = {}
        const my_username = req.user.username
        // get timestamp in seconds
        const date = Math.floor(Date.now() / 1000)
        const username = req.user.username
        const nonce = `${fast_hash(date + username)}`
        console.log('Calculated: ', date, nonce)

        // Alright, let me just manually generate an encoded signature!!!!!!!
        const parameters = {
            oauth_consumer_key: process.env.TWITTER_API_KEY,
            oauth_token: process.env.TWITTER_ACCESS_TOKEN,
            oauth_nonce: nonce,
            oauth_timestamp: date,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0',
            oauth_callback: 'http://localhost:4000/twitter_auth',
        }
        const request_url = 'https://api.twitter.com/oauth/request_token'
        const consumerSecret = process.env.TWITTER_API_SECRET_KEY
        const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET
        const signature = oauthSignature.generate('POST', request_url, parameters, consumerSecret, tokenSecret)

        const AuthHeader = `OAuth oauth_consumer_key="${process.env.TWITTER_API_KEY}",oauth_token="${process.env.TWITTER_ACCESS_TOKEN}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${date}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_callback="http%3A%2F%2Flocalhost%3A4000%2Ftwitter_auth",oauth_signature="${signature}"`

        // HTTPS request
        const options = {
            method: 'POST',
            url: request_url,
            headers: {
                Authorization: AuthHeader,
            },
        }

        /*
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
        */

        request(options, (error, result) => {
            if (error) {
                console.error(err)
                res.status(500).send()
            } else {
                console.log(result.body)
                // manually parse the returned string
                let arr = result.body.split('&')
                for (let i = 0; i < 3; i++) {
                    let temp = arr[i].split('=')
                    ret[temp[0]] = temp[1]
                }
                // console.log("ret: ", ret)
                res.json(ret)
            }
        })
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

module.exports = twitterRouter

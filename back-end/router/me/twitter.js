const twitterRouter = require('express').Router()
const request = require('request')

twitterRouter.get('/', async (req, res) => {
    let ret = {}

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
        oauth_callback: 'http://localhost:4000/me',
    }
    const request_url = 'https://api.twitter.com/oauth/request_token'
    const consumerSecret = process.env.TWITTER_API_SECRET_KEY
    const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET
    const signature = oauthSignature.generate('POST', request_url, parameters, consumerSecret, tokenSecret)

    const AuthHeader = `OAuth oauth_consumer_key="${process.env.TWITTER_API_KEY}",oauth_token="${process.env.TWITTER_ACCESS_TOKEN}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${date}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_callback="http%3A%2F%2Flocalhost%3A4000%2Fme",oauth_signature="${signature}"`

    // HTTPS request
    const options = {
        method: 'POST',
        url: request_url,
        headers: {
            Authorization: AuthHeader,
        },
    }

    request(options, (error, result) => {
        if (error) {
            console.error(err)
        } else {
            // manually parse the returned string
            let arr = result.body.split('&')
            for (let i = 0; i < 3; i++) {
                let temp = arr[i].split('=')
                ret[temp[0]] = temp[1]
            }
            console.log(ret)
            res.json(ret)
        }
    })
})
module.exports = twitterRouter

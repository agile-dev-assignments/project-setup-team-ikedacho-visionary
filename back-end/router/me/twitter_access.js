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
        // only proceed when actual oauth_token/verifier is sent back
        if (req.query.url !== undefined) {
            let ret = {}

            // console.log("the url is: ", req.query.url)
            const query = url_parser.parse(req.query.url).query
            const parsed_query =  query_string.parse(query)
            const oauth_token =  parsed_query.oauth_token
            const oauth_verifier = parsed_query.oauth_verifier
            // console.log("oauth_token: ", oauth_token, "\noauth_verifier: ", oauth_verifier)

            // now that we have parsed the oauth_token, we can request the access token (the final step)
            const request_url = `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_consumer_key=${process.env.TWITTER_API_KEY}&oauth_verifier=${oauth_verifier}`
            const options = {
                method: 'POST', 
                url: request_url
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

                    console.log("ret: ", ret)


                    /*
                    NOTICE: 
                        The following piece of code does not work, but does not crash the program either. 
                        It should be in a somewhat correct structure (?) based on the manual..
                        Please refer to: 
                        https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens
                        https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timeline
                    */
                    // try fetch tweets! 
                    console.log("ret.oauth_token: ", ret.oauth_token)
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
                    const request_url2 = `https://api.twitter.com/1.1/statuses/home_timeline.json`
                    const consumerSecret = process.env.TWITTER_API_SECRET_KEY
                    const tokenSecret = ret.oauth_token_secret
                    const signature = oauthSignature.generate('POST', request_url2, parameters, consumerSecret, tokenSecret)

                    const AuthHeader = `OAuth oauth_consumer_key="${parameters.oauth_consumer_key}",oauth_token="${parameters.oauth_token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${date}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_signature="${signature}"`

                    const options2 = {
                        method: 'GET', 
                        url: request_url2, 
                        headers: {
                            Authorization: AuthHeader
                        }
                    }

                    request(options2, (err, result) => {
                        if (err) {
                            console.error(err)
                        } else {
                            console.log(result.body)
        
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

// import and instantiate express
const express = require('express') // CommonJS import style!
const app = express() // instantiate an Express object
const multer = require('multer') // middleware to handle HTTP POST requests with file uploads
const axios = require('axios') // middleware for making requests to APIs
require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bodyParser = require('body-parser')
const User = require('./loginAuth/user')
const UserInfo = require('./userInfo/userInfo')
const Chatroom = require('./chatroom/chatroom')
const db = require('./db')
const request = require('request')
const oauthSignature = require('oauth-signature')
const authUser = require('./authIns')
const fs = require('fs')
//----------------------------------------- END OF IMPORTS---------------------------------------------------

app.use(morgan('dev')) // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
// make 'public' directory publicly readable with static content
app.use('/static', express.static('front-end/public'))
// const User = require("./user");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    cors({
        origin: 'http://localhost:3000', // <-- location of the react app were connecting to
        credentials: true,
    })
)
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())
require('./loginAuth/passPortConfig.js')(passport)
//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
let user_name_l = ''
let selected_social_media = ['O-Zone', 'Facebook', 'Twitter', 'Instagram']

//put routes here:
app.post('/api_register', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err
        if (doc) res.send('User Already Exists')
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            })

            const newUserInfo = new UserInfo({
                user_name: req.body.username,
                user_photo: `https://robohash.org/${req.body.username}.png?size=200x200`,
                background_picture: 'https://resilientblog.co/wp-content/uploads/2019/07/sky-quotes.jpg',
                post_number: 0,
                bio: 'This person is too lazy to change this default',
                follower_number: 0,
                follower: [],
                following_number: 0,
                following: [],
                linked_social_media: ['O-Zone'],
                unconnected_social_media: ['Twitter', 'Instagram', 'Facebook'],
            })

            // naive way to store current user info in session
            req.user = req.body.username

            await newUser.save()
            await newUserInfo.save()
            res.send('User Created')
        }
    })
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err
        if (!user) res.send('No User Exists')
        else {
            req.logIn(user, (err) => {
                if (err) throw err
                res.send('Successfully Authenticated')
                console.log(req.user)
            })
        }
    })(req, res, next)
})

// return insensitive information about other users
app.get('/api_get_user_info_by_name', (req, res) => {
    const username = req.body.username
    UserInfo.findOne({ user_name: username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(result)
            const ret = {
                username: result.user_name,
                userimg: result.user_photo,
                bio: result.bio,
            }
            res.json(ret)
        }
    })
})

app.post("/browsed", (req, res) => {
    console.log(req.body); 
    const browsed = req.body;
    const username = req.user.username;
    UserInfo.findOne({user_name: username}, (err, result) => {
        result.my_browse_history.push(browsed)
        // save the update
        result.save((err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send("Created")
    })
   
})


app.get('/api_browse', (req, res) => {
    let ret
    const username = req.user.username

    // retrieve data from database
    UserInfo.findOne({ user_name: username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract the brose history field
            ret = result.my_browse_history
            console.log(ret)
            res.json(ret)
        }
    })
})

app.get('/user', (req, res) => {
    res.send(req.user) // The req.user stores the entire user that has been authenticated inside of it.
})

app.get('/my_info', (req, res) => {
    const my_username = req.user.username
    UserInfo.findOne({ user_name: my_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.json(result)
        }
    })
})

app.use('/get_me', async (req, res, next) => {
    const my_username = req.user.username
    user_name_l = req.user.username
    await UserInfo.findOne({ user_name: my_username }, (err, UserInfos) => {
        try {
            user_info = UserInfos
            linked_social_media = UserInfos.linked_social_media
            unconnected_social_media = UserInfos.unconnected_social_media
            post_data = UserInfos.post_data

            filtered_post_data_overall = post_data.filter((element) => linked_social_media.includes(element.source))
            user_info.post_number = filtered_post_data_overall.length
            //console.log(user_info)
            //console.log("user_info.post_number",user_info.post_number)
            selected_social_media = ['O-Zone', 'Facebook', 'Twitter', 'Instagram']
        } catch (e) {
            console.log(e)
        }
    })
    next()
})

app.get('/get_me', async (req, res) => {
    const my_username = req.user.username
    let clicked_linked_social_media = req.query.clicked_linked_social_media
    let clicked_unconnected_social_media = req.query.clicked_unconnected_social_media

    if (clicked_linked_social_media !== undefined) {
        //update linked_social_media(delete)
        linked_social_media = linked_social_media.filter((element) => {
            if (!element.includes(clicked_linked_social_media)) {
                return true
            }
        })
        //update linked_social_media to database
        const filter1 = { user_name: my_username }
        const update1 = { linked_social_media: linked_social_media }
        await UserInfo.findOneAndUpdate(filter1, update1, {
            new: true,
        })
        //console.log('a',linked_social_media )

        if (!unconnected_social_media.includes(clicked_linked_social_media)) {
            //update unconnected_social_media(add)
            unconnected_social_media.push(clicked_linked_social_media)
            //update unconnected_social_media to database
            const filter2 = { user_name: my_username }
            const update2 = { unconnected_social_media: unconnected_social_media }
            await UserInfo.findOneAndUpdate(filter2, update2, {
                new: true,
            })
            //console.log('b',unconnected_social_media )
        }
    } //end of if

    if (clicked_unconnected_social_media !== undefined) {
        //update unconnected_social_media(delete)
        unconnected_social_media = unconnected_social_media.filter((element) => {
            if (!element.includes(clicked_unconnected_social_media)) {
                return true
            }
        })
        //update unconnected_social_media to database
        const filter1 = { user_name: my_username }
        const update1 = { unconnected_social_media: unconnected_social_media }
        await UserInfo.findOneAndUpdate(filter1, update1, {
            new: true,
        })
        //console.log('c',unconnected_social_media )

        if (!linked_social_media.includes(clicked_unconnected_social_media)) {
            //update linked_social_media(add)
            linked_social_media.push(clicked_unconnected_social_media)
            //update linked_social_media to database
            const filter2 = { user_name: my_username }
            const update2 = { linked_social_media: linked_social_media }
            await UserInfo.findOneAndUpdate(filter2, update2, {
                new: true,
            })
            //console.log('d',linked_social_media )
        }
    }
    const response_data = {
        user_info: user_info,
        linked_social_media: linked_social_media, //return linked_platform name
        unconnected_social_media: unconnected_social_media,
    }
    //console.log("in get_my_profile:", user_info)
    console.log('linked_social_media:', linked_social_media)
    console.log('unconnected_social_media:', unconnected_social_media)
    //console.log("in me's post_data:",post_data)
    res.json(response_data)
})

app.get('/get_facebook', async (req, res) => {
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
                    }
                })
            } catch (e) {
                console.log(e)
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
})

app.get('/get_twitter_request_token', async (req, res) => {
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

app.get('/get_my_profile', async (req, res) => {
    const my_username = req.user.username
    let my_like_history
    await UserInfo.findOne({ user_name: my_username }, (err, UserInfos) => {
        try {
            user_info = UserInfos
            linked_social_media = UserInfos.linked_social_media
            unconnected_social_media = UserInfos.unconnected_social_media
            post_data = UserInfos.post_data
            my_like_history = UserInfos.my_like_history
            //console.log("post_data",post_data)
        } catch (e) {
            console.log(e)
        }
    })

    // console.log(post_data)

    // console.log("my_like_history: ", my_like_history)
    let filtered_post_data = post_data.slice()
    //filter the post_data to only contain the linked_social_media
    filtered_post_data = post_data.filter((element) => {
        if (linked_social_media.includes(element.source)) {
            return true
        }
    })

    //filtered_post_data by selected platform_name by user
    if (req.query.platform_name_array !== undefined) {
        //console.log("111111")
        filtered_post_data = post_data.filter((element) => {
            if (req.query.platform_name_array.includes(element.source)) {
                return true
            }
        }) //end of filtered_post_data by selected platform_name by user
    }

    // lr = liked_record, fr = filtered_record
    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < filtered_post_data.length; i++) {
            fr = filtered_post_data[i]
            matched = false
            for (let j = 0; j < my_like_history.length; j++) {
                lr = my_like_history[j]
                // console.log("\nlr, fr: ", lr, "\n", fr, "\n")
                if (lr.text_content == fr.content && lr.source == fr.source && lr.post_issued_time.getTime() == fr.senttime.getTime()) {
                    // console.log("matched! ")
                    filtered_by_liked.push({
                        content: fr.content,
                        source: fr.source,
                        senttime: fr.senttime,
                        contentimg: fr.contentimg,
                        commented: fr.commented,
                        liked: fr.liked,
                        repoted: fr.repoted,
                        like_switch: true,
                    })
                    matched = true
                    break
                }
            }
            if (matched === false) {
                filtered_by_liked.push(fr)
            }
        }
    } else {
        filtered_by_liked = filtered_post_data
    }

    console.log('filtered_by_liked: ', filtered_by_liked)

    //send back response_data which consists of user_info and filtered_post_data as post_data
    const response_data = {
        user_info: user_info,
        post_data: filtered_by_liked, //return the filtered data based on platform selected
        linked_social_media: linked_social_media, //return linked_platform name
    }
    //console.log("in get_my_profile:", user_info)
    //console.log("linked_social_media:",linked_social_media)
    //console.log("in my_profile's filtered post_data:",filtered_post_data)
    //console.log("in my_profile's  post_data:",post_data)
    res.json(response_data)
})

// it tell multer to save uploaded files to disk into a directory named public/uploads, with a filename based on the current time.
// the file storage rule function referred by a variable called storage will be used later as parameter when we initiated a multer object.
const storage_backgruond = multer.diskStorage({
    // set file saved destination. Multer can save uploaded files to a number of different destinations.
    destination: function (req, file, cb) {
        if (!fs.existsSync(`../front-end/public/uploads`)) {
            fs.mkdirSync(`../front-end/public/uploads`)
        }
        if (!fs.existsSync(`../front-end/public/uploads/background`)) {
            fs.mkdirSync(`../front-end/public/uploads/background`)
        }
        let dir = `../front-end/public/uploads/background/${user_name_l}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, `../front-end/public/uploads/background/${user_name_l}`)
    },

    // set filename rules
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '_' + Date.now() + `.${ext}`)
    },
})

//Then instantiate a multer object "upload_background_picture" to be used in app.post("/my_profile", upload.array("background_picture", 1), (req, res)...
//and upload_background_picture multure object use the storage rule as defined in storage variable.
const upload_background_picture = multer({ storage: storage_backgruond })

app.post('/post_background_picture', upload_background_picture.array('background_picture', 1), async (req, res) => {
    // check whether anything was uploaded. If success, send a response back. I will re-render my_profile page with background picture added in this case.
    if (req.files) {
        // success! send data back to the client, e.g. some JSON data
        const data = {
            status: 'all good',
            message: 'success, the files were uploaded!',
            background_picture: req.files,
        }
        // then send a response to client with modification on data we receive from client. otherwise, it will occur 500 error.
        // add the background image src to user_info data
        const my_username = req.user.username
        await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
            try {
                UserInfos.background_picture = `/uploads/background/${user_name_l}/${data.background_picture[0].filename}`
                await UserInfos.save(function (saveErr, saveUserInfos) {
                    if (err) {
                        console.log('error saving post')
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
        res.redirect('/my_profile') //redirect to my_proile page
    } else {
        //if no file is uploaded, the submit button cannot send request.
        console.log('error! req.files')
        res.redirect('/my_profile')
    }
})
let post_detail_for_repost = undefined
app.use(async (req, res, next) => {
    if (req.query.post_detail_for_repost) {
        post_detail_for_repost = JSON.parse(req.query.post_detail_for_repost)
        console.log('post detail: ', post_detail_for_repost)
    }
    next()
})
app.get('/get_fast_repost', async (req, res) => {
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
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
})

app.get('/get_repost_inner', async (req, res) => {
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

app.get('/get_edit', async (req, res) => {
    const my_username = req.user.username
    const post_text = req.query.post_text
    const current_date = new Date()
    let post_img = ''
    if (req.query.old_post_img){
        post_img = req.query.old_post_img
    }
    let my_user_photo

    const regex = /@\S+\s/g
    const search_for_mention = post_text.match(regex)
    const unique_search_names = [...new Set(search_for_mention)];


    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        try {
            UserInfos.post_data.unshift({
                content: post_text,
                source: 'O-Zone',
                senttime: current_date,
                contentimg: post_img,
            })
            UserInfos.post_number++

            my_user_photo = UserInfos.user_photo

            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving post')
                }
            })
        } catch (e) {
            console.log(e)
        }
    })

    unique_search_names.forEach(async (item) => {
        const search_name = item.replace(/@|\s/g, '')
        console.log(search_name)
        await UserInfo.findOne({ user_name: search_name }, async (err, result) => {
            if (err) { 
                console.error(err)
            } else {
                if (result) {
                    // found! 
                    result.others_mentioned_history = (result.others_mentioned_history.length) ? result.others_mentioned_history : []
                    result.others_mentioned_history.push({
                        mentioner_avatar: my_user_photo,
                        mentioner_username: my_username,
                        mentioned_date: current_date,
                        post_image: ' ',
                        post_username: my_username,
                        post_avatar: my_user_photo, 
                        post_text: post_text,
                    })

                    console.log(result.others_mentioned_history)

                    // save changes
                    await result.save((err) => {
                        if (err) {
                            console.error(err)
                        }
                    })

                } else {
                    // not found... -> do nothing! this is not a mention, or mentioning wrongly
                }
            }
        })
    })
})

app.post('/post_home', (req, res) => {
    //console.log('ssssssss')
    //selected_social_media=req.query.selected_social_media
    //console.log("selected_social_media:" , req.body)

    if (req.body.selected_social_media != 'All') {
        selected_social_media = req.body.selected_social_media
    } else {
        selected_social_media = ['O-Zone', 'Facebook', 'Twitter', 'Instagram']
    }
    // console.log("selected_social_media:" ,selected_social_media)
    //redirect to same page
    res.redirect('back')
})

app.get('/get_comments_in_post_content', async (req, res) => {
    let UserName = req.query.user_name
    let Content = req.query.content
    let comments = []
    let currentPost = []
    // console.log("content:"+ Content)
    await UserInfo.findOne({ user_name: UserName }, async (err, userInfos) => {
        if (err) {
            console.error(err)
        } else {
            console.log(userInfos)
            if (userInfos !== null) {
                let postData = userInfos.post_data.slice()
                postData.forEach((post) => {
                    if (post.content == Content) {
                        comments = post.commented
                        currentPost = post
                    }
                })
            }
        }
    })
    res.send(comments)
})

let post_detail_for_comment = undefined
app.use(async (req, res, next) => {
    if (req.query.post_detail_for_comment) {
        post_detail_for_comment = JSON.parse(req.query.post_detail_for_comment)
        console.log('post detail: ', post_detail_for_comment)
    }
    next()
})

app.get('/get_send_comment', async (req, res) => {
    const comment_text = req.query.comment_text
    console.log('comment_text: ', comment_text)
    const message = post_detail_for_comment
    console.log('post detail2222: ', message)
    const self_username = req.user.username
    let self_userimg

    // setup for mentioning matching
    const regex = /@\S+\s/g
    const search_for_mention = comment_text.match(regex)
    const unique_search_names = [...new Set(search_for_mention)];
    const current_date = new Date()

    // find myself and update my commented history
    await UserInfo.findOne({ user_name: self_username }, async (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.my_comment_history === undefined) {
                result.my_comment_history = []
            }
            // also fetch the user_photo for later usage
            self_userimg = result.user_photo
            result.my_comment_history.push({
                source: message.source,
                post_created_by_photo: message.userimg,
                post_created_by: message.UserName,
                post_text: message.content,
                post_image: message.contentimg,
                post_created_time: message.Senttime,
                commented_by_username: self_username,
                commented_date: current_date,
                comment_text: comment_text,
                commented_by_photo: self_userimg,
            })

            // save the changes
            await result.save((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    const other_username = message.UserName
    // find the post author and update his being-comment history
    await UserInfo.findOne({ user_name: other_username }, async (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.others_commented_history === undefined) {
                result.others_commented_history = []
            }
            result.others_commented_history.push({
                source: message.source,
                post_created_by_photo: message.userimg,
                post_created_by: message.UserName,
                post_text: message.content,
                post_image: message.contentimg,
                post_date: message.Senttime,
                commented_date: current_date,
                commented_by_username: self_username,
                commented_by_profile_image: self_userimg,
                comment_text: comment_text,
            })

            // save the changes
            await result.save((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    await UserInfo.findOne({ user_name: other_username }, async (err, result) => {
        if (err) {
            console.error(err)
        } else {
            const a = {
                UserName: self_username,
                content: comment_text,
                userimg: self_userimg,
                Senttime: current_date,
            }
            let postData = result.post_data
            postData.forEach((post) => {
                if (post.content == message.content) {
                    console.log(post.content)
                    post.commented.push(a)
                }
            })
            // save the update
            await result.save((err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
    })

    // match for mentioning and update being-mentioned history
    unique_search_names.forEach(async (item) => {
        const search_name = item.replace(/@|\s/g, '')
        console.log(search_name)
        await UserInfo.findOne({ user_name: search_name }, async (err, result) => {
            if (err) {
                console.error(err)
            } else {
                if (result) {
                    // found!
                    result.others_mentioned_history = result.others_mentioned_history.length ? result.others_mentioned_history : []
                    result.others_mentioned_history.push({
                        mentioner_avatar: self_userimg,
                        mentioner_username: self_username,
                        mentioned_date: current_date,
                        post_image: ' ',
                        post_username: message.UserName,
                        post_avatar: message.userimg,
                        post_text: message.content,
                        comment_text: comment_text,
                    })

                    console.log(result.others_mentioned_history)

                    // save changes
                    await result.save((err) => {
                        if (err) {
                            console.error(err)
                        }
                    })

                } else {
                    // not found... -> do nothing! this is not a mention, or mentioning wrongly
                }
            }
        })
    })

    res.json(self_username)
    post_detail_for_comment = undefined
})

app.get('/get_repost', async (req, res) => {
    let ret = [],
        friend = [],
        follower = [],
        following = [],
        linked_social_media = [],
        user_name = ''
    // retrieve follower and following lists of current user
    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower.push(result.follower)
            following.push(result.following)
            linked_social_media = result.linked_social_media
            user_name = result.user_name
        }
    })

    console.log('follower: ', follower)
    console.log('following: ', following)
    console.log(!isEmpty(follower[0]) && !isEmpty(following[0]))
    if (!isEmpty(follower[0]) && !isEmpty(following[0])) {
        // lazy finding intersection
        console.log('friend: ', friend)
        for (let i = 0; i < follower[0].length; i++) {
            if (following[0].includes(follower[0][i])) {
                friend.push(follower[0][i])
            }
        }

        console.log('friend after intersection: ', friend)

        // retrieve extended user info from database
        for (let i = 0; i < friend.length; i++) {
            await UserInfo.findOne({ user_name: friend[i] }, (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    ret.push({
                        user_name: result.user_name,
                        user_photo: result.user_photo,
                    })
                }
            })
        }
    }

    const response_data = {
        friend_list: ret,
        linked_social_media: linked_social_media,
        user_name: user_name,
    }

    res.json(response_data)
})

app.get('/api_my_comment_history', async (req, res) => {
    let response_data = ''
    await UserInfo.findOne({ user_name: req.user.username }, (err, UserInfos) => {
        try {
            response_data = UserInfos.my_comment_history
            //console.log(response_data);
        } catch (e) {
            console.log(e)
        }
    })
    res.json(response_data)
})

app.get('/api_commented_history', async (req, res) => {
    let response_data = ''
    await UserInfo.findOne({ user_name: req.user.username }, (err, UserInfos) => {
        try {
            response_data = UserInfos.others_commented_history
        } catch (e) {
            console.log(e)
        }
    })
    res.json(response_data)
})

app.get('/api_friend_profile', async (req, res) => {
    const my_username = req.user.username
    let post_data = ''
    let friend_info = ''
    const UserName = req.query.UserName
    let friend = false
    let my_like_history

    await UserInfo.findOne({ user_name: UserName }, (err, UserInfos) => {
        try {
            friend_info = UserInfos
            linked_social_media = UserInfos.linked_social_media
            post_data = UserInfos.post_data
            //console.log("post_data",post_data)
        } catch (e) {
            console.log(e)
        }
    })

    await UserInfo.findOne({ user_name: my_username }, (err, UserInfos) => {
        try {
            if (UserInfos.following.includes(UserName)) {
                friend = true
            }
            my_like_history = UserInfos.my_like_history
        } catch (e) {
            console.log(e)
        }
    })

    //FILTER POST DATA to send back to client, based on platform user selected in frontend
    //console.log("req.query.platform_name_array:", req.query.platform_name_array)
    let filtered_post_data = post_data.slice()
    if (req.query.platform_name_array !== undefined) {
        filtered_post_data = post_data.filter((element) => {
            if (req.query.platform_name_array.includes(element.source)) {
                return true
            }
        })
    }

    // lr = liked_record, fr = filtered_record
    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < filtered_post_data.length; i++) {
            fr = filtered_post_data[i]
            matched = false
            for (let j = 0; j < my_like_history.length; j++) {
                lr = my_like_history[j]
                // console.log("\nlr, fr: ", lr, "\n", fr, "\n")
                if (lr.text_content == fr.content && lr.source == fr.source && lr.post_issued_time.getTime() == fr.senttime.getTime()) {
                    // console.log("matched! ")
                    filtered_by_liked.push({
                        content: fr.content,
                        source: fr.source,
                        senttime: fr.senttime,
                        contentimg: fr.contentimg,
                        commented: fr.commented,
                        liked: fr.liked,
                        repoted: fr.repoted,
                        like_switch: true,
                    })
                    matched = true
                    break
                }
            }
            if (matched === false) {
                filtered_by_liked.push(fr)
            }
        }
    } else {
        filtered_by_liked = filtered_post_data
    }

    //send back response_data which consists of user_info and filtered_post_data as post_data
    const response_data = {
        friend_info: friend_info,
        post_data: filtered_by_liked, //return the filtered data based on platform selected
        linked_social_media: linked_social_media, //return linked_platform name
        friend: friend,
    }
    //console.log("in get_my_profile:", user_info)
    //console.log("linked_social_media:",linked_social_media)
    res.json(response_data)
})

app.get('/api_followers', async (req, res) => {
    let follower_list = [],
        following_list = [],
        ret = []
    const UserName = req.query.UserName

    // find user object in database and extract its follower array
    await UserInfo.findOne({ user_name: UserName }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower_list = result.follower
            following_list = result.following
        }
    })

    // retrieve extended user info from database
    for (let i = 0; i < follower_list.length; i++) {
        await UserInfo.findOne({ user_name: follower_list[i] }, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                ret.push({
                    user_name: result.user_name,
                    bio: result.bio,
                    user_photo: result.user_photo,
                    // dynamically decide the action based on the following status
                    action: following_list.includes(result.user_name) ? 'Unfollow' : 'Follow',
                })
            }
        })
    }

    console.log('Follower info\n: ', ret)
    res.json(ret)
})

app.get('/api_followings', async (req, res) => {
    let follower_list = [],
        following_list = [],
        ret = []
    const UserName = req.query.UserName

    // find user object in database and extract its follower array
    await UserInfo.findOne({ user_name: UserName }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower_list = result.follower
            following_list = result.following
        }
    })

    // retrieve extended user info from database
    for (let i = 0; i < following_list.length; i++) {
        await UserInfo.findOne({ user_name: following_list[i] }, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                ret.push({
                    user_name: result.user_name,
                    bio: result.bio,
                    user_photo: result.user_photo,
                    action: 'Unfollow',
                })
            }
        })
    }

    console.log('Following info\n: ', ret)
    res.json(ret)
})

app.get('/api_friend_suggestion', async (req, res) => {
    let ret = {}
    let unfollowed_list = [] //list of user who is not followed by me
    let following_list
    const my_username = req.user.username
    const search_name = req.query.search_name
    console.log('search_name: ', search_name, ' <---')

    await UserInfo.find((err, UserInfos) => {
        try {
            user_info = UserInfos
            unfollowed_list = user_info.filter((item) => {
                if (!item.follower.includes(my_username)) {
                    return true
                }
            })
            unfollowed_list = unfollowed_list.filter((item) => {
                if (item.user_name !== my_username) {
                    return true
                }
            })

            // if searching by name, one more filtering
            if (search_name !== '' && search_name !== undefined) {
                unfollowed_list = unfollowed_list.filter((item) => {
                    return item.user_name === search_name
                })
            }

            following_list = user_info.filter((item) => {
                if (item.follower.includes(my_username)) {
                    return true
                }
            })
        } catch (e) {
            console.log(e)
        }
    })

    //console.log(unfollowed_list)
    ret.unfollowed_list = unfollowed_list !== undefined ? unfollowed_list : []
    ret.following_list = following_list !== undefined ? following_list : []

    res.json(ret)
})

app.get('/get_add_friend', async (req, res) => {
    const clicked_follow_username = req.query.clicked_follow_username
    console.log('clicked_follow_username', clicked_follow_username)
    //when user click a people to follow in front-end. the
    const my_username = req.user.username
    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        try {
            user_info = UserInfos
            following_list = user_info.following
            if (!following_list.includes(clicked_follow_username)) {
                following_list.push(clicked_follow_username)
                user_info.following_number++
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving following')
                }
            })
        } catch (e) {
            console.log(e)
        }
    })

    await UserInfo.findOne({ user_name: clicked_follow_username }, async (err, UserInfos) => {
        try {
            user_info = UserInfos
            follower_list = user_info.follower
            if (!follower_list.includes(my_username)) {
                follower_list.push(my_username)
                user_info.follower_number++
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving adding a following')
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
})

app.get('/get_remove_friend', async (req, res) => {
    const clicked_unfollow_username = req.query.clicked_unfollow_username
    console.log('clicked_unfollow_username', clicked_unfollow_username)

    const my_username = req.user.username
    console.log(my_username)
    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        try {
            console.log('here')
            user_info = UserInfos
            following_list = user_info.following.slice()
            console.log('following_list', following_list)
            if (following_list.includes(clicked_unfollow_username)) {
                user_info.following = following_list.filter((item) => {
                    if (item !== clicked_unfollow_username) {
                        console.log('start', item)
                        return true
                    }
                    user_info.following = following_list.slice()
                    console.log(following_list)
                    console.log(user_info.following)
                })
                user_info.following_number--
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving deleteing a following')
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
    await UserInfo.findOne({ user_name: clicked_unfollow_username }, async (err, UserInfos) => {
        try {
            user_info = UserInfos
            follower_list = user_info.follower.slice()
            console.log(follower_list)
            if (follower_list.includes(my_username)) {
                user_info.follower = follower_list.filter((item) => {
                    if (item !== my_username) {
                        return true
                    }
                })
                user_info.follower_number--
            }
            await UserInfos.save(function (saveErr, saveUserInfos) {
                if (err) {
                    console.log('error saving deleting a following')
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
})

app.get('/api_being_liked', async (req, res) => {
    let ret = {}

    // retrieve user info from database
    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract being liked history
            ret = result.others_liked_history
            res.json(ret)
            console.log(ret)
        }
    })
})

app.get('/api_being_mentioned', async (req, res) => {
    let ret = {}

    // retrieve data from database
    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract mentioned history
            ret = result.others_mentioned_history
            console.log(ret)
            res.json(ret)
        }
    })
})

app.get('/api_liked_history', async (req, res) => {
    let ret = {}
    const username = req.user.username

    // retrieve liked history from database and return to front-end
    UserInfo.findOne({ user_name: username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            ret = result.my_like_history
            console.log('Me/Liked-History: ', ret)
            res.json(ret)
        }
    })
})

app.get('/api_message', async (req, res) => {
    let ret

    // fetch current user name from req.session.user
    const current_user = req.user.username
    // find all chatrooms that this current user is in
    Chatroom.find({
        participants: current_user,
    }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            ret = result
            res.json(ret)
        }
    })
})

app.get('/api_chat_messages', async (req, res) => {
    let ret = {}
    const roomID = req.query.roomID

    console.log('/api_chat_messages', roomID)

    Chatroom.find({ _id: roomID }).exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            ret = result[0]
            console.log(ret)
            res.json(ret)
        }
    })
})

app.post('/api_send_new_message', async (req, res) => {
    let currentdate = new Date()
    const newMessage = req.body.text
    const roomID = req.body.roomID
    const self_userimg = req.body.userimg
    console.log(newMessage, roomID)

    // generate a date string in pretty format
    const message_date =
        currentdate.getFullYear() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + ' ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds()

    console.log(message_date)

    // find the chat room, and then add the new message to message history
    Chatroom.findOne({ _id: roomID }, (err, result) => {
        result.message_history.push({
            userimg: self_userimg,
            username: req.user.username,
            time: message_date,
            content: newMessage,
        })
        console.log(result)
        // save the update
        result.save((err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send('Sent')
    })
})

app.get('/api_create_new_chat_list', async (req, res) => {
    let ret = [],
        friend = [],
        follower = [],
        following = []

    // retrieve follower and following lists of current user
    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower.push(result.follower)
            following.push(result.following)
        }
    })

    console.log("follower: ", follower)
    console.log("following: ", following)
    console.log(!isEmpty(follower[0]) && !isEmpty(following[0]))
    if (!isEmpty(follower[0]) && !isEmpty(following[0])){    
        // lazy finding intersection
        console.log("friend: ", friend)
        for (let i = 0; i < follower[0].length; i++) {
            if (following[0].includes(follower[0][i])) {
                friend.push(follower[0][i])
            }
        }

        console.log("friend after intersection: ", friend)

        // retrieve extended user info from database
        for (let i = 0; i < friend.length; i++) {
            await UserInfo.findOne({ user_name: friend[i] }, (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    ret.push({
                        user_name: result.user_name,
                        user_photo: result.user_photo,
                    })
                }
            })
        }
    }

    console.log(ret)
    res.json(ret)
})

app.get('/api_create_new_chat_roomID', async (req, res) => {
    let ret, self_userimg
    // note that this participantsList is in format of {user: [{}, {}, {}]}, where each user has username and userimg.
    const participantsList = JSON.parse(req.query.participantsList)
    // create an array storing all participants in this chat room
    let participantsName = [req.user.username]
    participantsList.user.forEach(function (item) {
        participantsName.unshift(item.username)
    })
    console.log(participantsName)

    UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            self_userimg = result.user_photo
            // check if chatroom exists
            Chatroom.findOne({ participants: participantsName }, (err, result) => {
                if (!result) {
                    // check if the chatroom is personal or grouped
                    const single_user_flag = participantsList.user.length === 1
                    const name = single_user_flag ? [req.user.username, participantsList.user[0].username] : ['Group Chat']
                    const avatar = single_user_flag ? [self_userimg, participantsList.user[0].userimg] : ['https://img.icons8.com/plumpy/48/ffffff/people-skin-type-7.png']
                    // create new room
                    const newChatRoom = new Chatroom({
                        chatroom_name: name,
                        chatroom_avatar: avatar,
                        participants: participantsName,
                    })
                    // save to database
                    newChatRoom.save((err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    ret = newChatRoom._id
                    res.json(ret)
                } else {
                    ret = result._id
                    res.json(ret)
                }
            })
        }
    })
})

app.get('/api_like_a_post', async (req, res) => {
    const self_username = req.user.username
    const post_detail = JSON.parse(req.query.post_detail)
    const current_date = new Date()
    let self_userimg

    console.log('post detail: ', post_detail)

    // find myself and update my liked history
    await UserInfo.findOne({ user_name: self_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.my_like_history === undefined) {
                result.my_like_history = []
            }
            result.my_like_history.push({
                source: post_detail.source,
                user_photo: post_detail.userimg,
                user_name: post_detail.UserName,
                text_content: post_detail.content,
                img_content: post_detail.contentimg,
                post_issued_time: post_detail.Senttime,
                like_issued_time: current_date,
            })
            // also fetch the user_photo for later usage
            self_userimg = result.user_photo

            // save the changes
            result.save((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    const other_username = post_detail.UserName
    // find the post author and update his being-liked history
    await UserInfo.findOne({ user_name: other_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // update by pushing the new post info to the list
            if (result.others_liked_history === undefined) {
                result.others_liked_history = []
            }
            result.others_liked_history.push({
                source: post_detail.source,
                user_photo: post_detail.userimg,
                user_name: post_detail.UserName,
                text_content: post_detail.content,
                img_content: post_detail.contentimg,
                post_issued_time: post_detail.Senttime,
                like_issued_time: current_date,
                liked_by_user_name: self_username,
                liked_by_user_photo: self_userimg,
            })

            // save the changes
            result.save((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    res.send(`Liked on post: ${post_detail} by time ${current_date}`)
})

app.get('/api_unlike_a_post', async (req, res) => {
    const self_username = req.user.username
    const post_detail = JSON.parse(req.query.post_detail)

    console.log('post detail: ', post_detail, typeof post_detail)
    console.log(post_detail.Senttime, post_detail.UserName)

    // find myself and update my liked history
    await UserInfo.findOne({ user_name: self_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            /* to dislike a post, the my_like_history must not be empty
            if (result.my_like_history === undefined){
                result.my_like_history = []
            } */
            // update by filtering out the new post info to the list
            result.my_like_history = result.my_like_history.filter((record) => {
                const date = new Date(Date.parse(record.post_issued_time)).toString()
                const date_post_detail = new Date(Date.parse(post_detail.Senttime)).toString()
                console.log(date, typeof date)
                console.log(date_post_detail, typeof date_post_detail)
                console.log('===================')

                return !(record.user_name === post_detail.UserName && record.source === post_detail.source && date === date_post_detail && record.text_content === post_detail.content)
            })

            console.log('\nresult.my_like_history:\n', result.my_like_history)
            // save the changes <--- without error handling lol
            result.save((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    const other_username = post_detail.UserName
    // find the post author and update his being-liked history
    await UserInfo.findOne({ user_name: other_username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            /* to dislike a post, the others_liked_history must not be empty
            if (result.others_liked_history === undefined){
                result.others_liked_history = []
            } */
            // update by pushing the new post info to the list
            let filtered_list = result.others_liked_history.filter((record) => {
                const date = new Date(Date.parse(record.post_issued_time)).toString()
                const date_post_detail = new Date(Date.parse(post_detail.Senttime)).toString()
                console.log(date, typeof date)
                console.log(date_post_detail, typeof date_post_detail)
                console.log('===================')

                return !(
                    record.user_name === post_detail.UserName &&
                    record.source === post_detail.source &&
                    record.text_content === post_detail.content &&
                    date === date_post_detail &&
                    record.liked_by_user_name === self_username
                )
            })

            console.log('\nfiltered_list: ', filtered_list)
            // save the changes
            UserInfo.updateOne({ user_name: other_username }, { others_liked_history: filtered_list }, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })

    res.send(`Un-liked on post: ${post_detail} by time ${new Date()}`)
})

app.get('/api_getprelogin', async (req, res, next) => {
    const userInfos = await UserInfo.aggregate(
        [ { $sample: { size: 10 } } ]
     )
    let postData = []
    userInfos.forEach(userInfo => {
        console.log(userInfo.user_name)
        const data = userInfo.post_data.map(ele => {
            ele.userimg= userInfo.user_photo
            ele.UserName=userInfo.user_name 
            return ele
        })
       postData = postData.concat(data)
    })

    postData.sort((prev,cur)=>{
        return cur.senttime - prev.senttime
    })

    let filtered_post_data = postData.slice()

    res.json(filtered_post_data)

})

app.get('/api_getprelogin_recommended', async (req, res, next) => {
    const userInfos = await UserInfo.aggregate(
        [ { $sample: { size: 10 } } ]
     )
    let postData = []
    userInfos.forEach(userInfo => {
        console.log(userInfo.user_name)
        const data = userInfo.post_data.map(ele => {
            ele.userimg= userInfo.user_photo
            ele.UserName=userInfo.user_name 
            return ele
        })
       postData = postData.concat(data)
    })

    postData.sort((prev,cur)=>{
        return cur.senttime - prev.senttime
    })

    let filtered_post_data = postData.slice()

    res.json(filtered_post_data)

})

app.get('/api_getprelogin_recent', async (req, res, next) => {
    const userInfos = await UserInfo.aggregate(
        [ { $sample: { size: 10 } } ]
     )
    let postData = []
    userInfos.forEach(userInfo => {
        console.log(userInfo.user_name)
        const data = userInfo.post_data.map(ele => {
            ele.userimg= userInfo.user_photo
            ele.UserName=userInfo.user_name 
            return ele
        })
       postData = postData.concat(data)
    })

    postData.sort((prev,cur)=>{
        return cur.senttime - prev.senttime
    })

    let filtered_post_data = postData.slice()

    res.json(filtered_post_data)

})

/* 
Please notice that the following three Mockaroo APIs are intentionally disabled because they are missing important field
So, use backup data instead
*/
app.get('/api_whatsnew', async (req, res, next) => {
    const UserName = req.user.username
    const userInfos = await UserInfo.find()
    let followed_users = []
    let postData = []
    let my_like_history
    console.log('username', UserName)

    //const userInfos = await UserInfo.find()

    // find user object in database and extract its follower array
    await UserInfo.findOne({ user_name: UserName }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            if (result != null) {
                followed_users = result.following
                //console.log('followed_users', followed_users)   
                my_like_history = result.my_like_history 
            } else {
                followed_users = []
            }
        }
    })

    followed_users.push(UserName)

    userInfos.forEach(userInfo => {
        const info = userInfo.toObject()
        if (followed_users.includes(info.user_name)){
            const data = info.post_data.map(ele => {
                ele.userimg= userInfo.user_photo
                ele.UserName=userInfo.user_name 
                return ele
            })
            console.log(data)
            postData = postData.concat(data)
        }
    })

    postData.sort((prev,cur)=>{
        return cur.senttime - prev.senttime
    })

    let filtered_post_data = postData.slice()

    // console.log("selected_social_media", selected_social_media)

    filtered_post_data = postData.filter(element => {
        if (selected_social_media.includes(element.source)) {
            return true
        }//end of if
    })//end of filtered_post_data

    // console.log(filtered_post_data)

    /*
    filtering the post data by LIKE history
    */
    // lr = liked_record, fr = filtered_record
    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < filtered_post_data.length; i++) {
            fr = filtered_post_data[i]
            matched = false
            for (let j = 0; j < my_like_history.length; j++) {
                lr = my_like_history[j]
                // console.log("\nlr, fr: ", lr, "\n", fr, "\n")
                if (lr.text_content == fr.content && lr.source == fr.source && lr.post_issued_time.getTime() == fr.senttime.getTime()) {
                    // console.log("matched! ")
                    filtered_by_liked.push({
                        content: fr.content,
                        source: fr.source,
                        senttime: fr.senttime,
                        contentimg: fr.contentimg,
                        commented: fr.commented,
                        liked: fr.liked,
                        repoted: fr.repoted,
                        UserName: lr.user_name,
                        userimg: lr.user_photo,                     
                        like_switch: true,
                    })
                    matched = true
                    break
                }
            }
            if (matched === false) {
                filtered_by_liked.push(fr)
            }
        }
    } else {
        filtered_by_liked = filtered_post_data
    }

    // console.log('filtered_by_liked: ', filtered_by_liked)
    res.json(filtered_by_liked)
})

app.get('/api_recommended', async (req, res, next) => {
    user_name_l = req.user.username

    const userInfos = await UserInfo.find()
    let postData = [], 
        my_like_history

    userInfos.forEach(userInfo => {
        const info = userInfo.toObject()
        const data = info.post_data.map(ele => {
            ele.userimg= userInfo.user_photo
            ele.UserName=userInfo.user_name 
            return ele
        })

        if (userInfo.user_name === req.user.username) {
            my_like_history = userInfo.my_like_history
        }

       // console.log(data)
       postData = postData.concat(data)
    })

    postData.sort((prev,cur)=>{
        const prev_ct = prev.liked_count + prev.commented_count + prev.reposted_count
        const cur_ct = cur.liked_count + cur.commented_count + cur.reposted_count
        return cur_ct - prev_ct
    })

    let filtered_post_data = postData.slice()

    //console.log("selected_social_media", selected_social_media)

    filtered_post_data = postData.filter(element => {
        if (selected_social_media.includes(element.source)) {
            return true
        }//end of if
    })//end of filtered_post_data

    // console.log(filtered_post_data)

    /*
    filtering the post data by LIKE history
    */
    // lr = liked_record, fr = filtered_record
    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < filtered_post_data.length; i++) {
            fr = filtered_post_data[i]
            matched = false
            for (let j = 0; j < my_like_history.length; j++) {
                lr = my_like_history[j]
                // console.log("\nlr, fr: ", lr, "\n", fr, "\n")
                if (lr.text_content == fr.content && lr.source == fr.source && lr.post_issued_time.getTime() == fr.senttime.getTime()) {
                    // console.log("matched! ")
                    filtered_by_liked.push({
                        content: fr.content,
                        source: fr.source,
                        senttime: fr.senttime,
                        contentimg: fr.contentimg,
                        commented: fr.commented,
                        liked: fr.liked,
                        repoted: fr.repoted,
                        UserName: lr.user_name,
                        userimg: lr.user_photo,                     
                        like_switch: true,
                    })
                    matched = true
                    break
                }
            }
            if (matched === false) {
                filtered_by_liked.push(fr)
            }
        }
    } else {
        filtered_by_liked = filtered_post_data
    }

    // console.log('filtered_by_liked: ', filtered_by_liked)
    res.json(filtered_by_liked)
})

app.get('/api_recent', async (req, res, next) => {

    user_name_l = req.user.username

    //currently showing all posts, need to be modified 
    const userInfos = await UserInfo.find()
    let postData = [], 
        my_like_history
        
    userInfos.forEach(userInfo => {
        const info = userInfo.toObject()
        const data = info.post_data.map(ele => {
            ele.userimg= userInfo.user_photo
            ele.UserName=userInfo.user_name 
            return ele
        })

        if (userInfo.user_name === req.user.username) {
            my_like_history = userInfo.my_like_history
        }

       // console.log(data)
       postData = postData.concat(data)
    })

    let filtered_post_data = postData.slice()

    //console.log("selected_social_media", selected_social_media)

    filtered_post_data = postData.filter(element => {
        if (selected_social_media.includes(element.source)) {
            return true
        }//end of if
    })//end of filtered_post_data

    // console.log(filtered_post_data)

    /*
    filtering the post data by LIKE history
    */
    // lr = liked_record, fr = filtered_record
    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < filtered_post_data.length; i++) {
            fr = filtered_post_data[i]
            matched = false
            for (let j = 0; j < my_like_history.length; j++) {
                lr = my_like_history[j]
                // console.log("\nlr, fr: ", lr, "\n", fr, "\n")
                if (lr.text_content == fr.content && lr.source == fr.source && lr.post_issued_time.getTime() == fr.senttime.getTime()) {
                    // console.log("matched! ")
                    filtered_by_liked.push({
                        content: fr.content,
                        source: fr.source,
                        senttime: fr.senttime,
                        contentimg: fr.contentimg,
                        commented: fr.commented,
                        liked: fr.liked,
                        repoted: fr.repoted,
                        UserName: lr.user_name,
                        userimg: lr.user_photo,                     
                        like_switch: true,
                    })
                    matched = true
                    break
                }
            }
            if (matched === false) {
                filtered_by_liked.push(fr)
            }
        }
    } else {
        filtered_by_liked = filtered_post_data
    }

    // console.log('filtered_by_liked: ', filtered_by_liked)
    res.json(filtered_by_liked)
})

app.get('/api_search_recommended', async (req, res) => {
    let ret = []

    await axios
        .get(`${process.env.API_SEARCH_RECOMMENDED}?key=${process.env.API_SEARCH_RECOMMENDED_KEY}`)
        .then((apiResponse) => (ret = apiResponse.data))
        .catch((err) => {
            //console.log(err)
            const backupData = [
                { topic: 'Recommended topic #1' },
                { topic: 'Recommended topic #2' },
                { topic: 'Recommended topic #3' },
                { topic: 'Recommended topic #4' },
                { topic: 'Recommended topic #5' },
            ]
            ret = backupData
        })

    res.json(ret)
})

app.get('/api_trending', async (req, res) => {
    let ret = []
    let tag_list = []
    const regex = /#\S+\s/g
    const search_for_mention = comment_text.match(regex)

    const userInfos = await UserInfo.find()
    let postData = []

    userInfos.forEach(userInfo => {
        const info = userInfo.toObject()

        for (let i = 0; i < info.post_data.length; i++)
        {
            if (info.post_data[i].content.match(regex)){
                //console.log('info.post_data[i].content', info.post_data[i].content);
                postData = postData.concat(data[i])
            }
        }
    })

    await axios
        .get(`${process.env.API_TRENDING}?key=${process.env.API_TRENDING_KEY}`)
        .then((apiResponse) => (ret = apiResponse.data))
        .catch((err) => {
            //console.log(err)
            const backupData = [
                { topic: 'hot topic #699' },
                { topic: 'hot topic #0' },
                { topic: 'hot topic #3' },
                { topic: 'hot topic #422' },
                { topic: 'hot topic #78' },
                { topic: 'hot topic #34' },
                { topic: 'hot topic #2' },
                { topic: 'hot topic #435' },
                { topic: 'hot topic #3' },
                { topic: 'hot topic #94' },
            ]
            ret = backupData
        })

    res.json(ret)
})

app.get('/api_search_result', async (req, res) => {
    //const search_key = req.query.searchQuery
    const search_keyword = req.query.searchQuery
    //console.log('search_keyword', search_key);

    user_name_l = req.user.username

    const userInfos = await UserInfo.find()
    let postData = [], 
        my_like_history

    userInfos.forEach(userInfo => {
        const info = userInfo.toObject()
        //console.log(info.content);

        const data = info.post_data.map(ele => {
            ele.userimg= userInfo.user_photo
            ele.UserName=userInfo.user_name 
            return ele
        })

        for (let i = 0; i < info.post_data.length; i++)
        {
            if (info.post_data[i].content.indexOf(search_keyword) !== -1){
                //console.log('info.post_data[i].content', info.post_data[i].content);
                postData = postData.concat(data[i])
            }
        }

        if (userInfo.user_name === req.user.username) {
            my_like_history = userInfo.my_like_history
        }

       // console.log(data)
       //postData = postData.concat(data)
    })

    postData.sort((prev,cur)=>{
        return cur.senttime - prev.senttime
    })

    // lr = liked_record, fr = filtered_record
    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < postData.length; i++) {
            fr = postData[i]
            matched = false
            for (let j = 0; j < my_like_history.length; j++) {
                lr = my_like_history[j]
                // console.log("\nlr, fr: ", lr, "\n", fr, "\n")
                if (lr.text_content == fr.content && lr.source == fr.source && lr.post_issued_time.getTime() == fr.senttime.getTime()) {
                    // console.log("matched! ")
                    filtered_by_liked.push({
                        content: fr.content,
                        source: fr.source,
                        senttime: fr.senttime,
                        contentimg: fr.contentimg,
                        commented: fr.commented,
                        liked: fr.liked,
                        repoted: fr.repoted,
                        UserName: lr.user_name,
                        userimg: lr.user_photo,                     
                        like_switch: true,
                    })
                    matched = true
                    break
                }
            }
            if (matched === false) {
                filtered_by_liked.push(fr)
            }
        }
    } else {
        filtered_by_liked = postData
    }

    // console.log('filtered_by_liked: ', filtered_by_liked)
    res.json(filtered_by_liked)
})
//test
//Then instantiate a multer object "upload_post_picture" to be used in app.post("/post_Post_picture", upload.array("background_picture", 1), (req, res)...
//and upload_post_picture multure object use the storage rule as defined in storage variable.
/*const upload_post_picture = multer({ storage: storage })

const post_picture = multer({ storage: storage })
app.post("/post_picture", upload_post_picture.array("post_picture", 1), (req, res) => {
    const my_username = req.user.username
    // check whether anything was uploaded. If success, send a response back. I will re-render my_profile page with background picture added in this case.
    if (req.files) {
       // success! send data back to the client, e.g. some JSON data
       console.log("success! req.files")
       const data = {
           status: "all good",
           message: "success, the files were uploaded!",
           post_picture: req.files,
       }
       new_post.contentimg=`/uploads/${data.post_picture[0].filename}`
   }
})*/
//----------------------------------------- END OF ROUTES---------------------------------------------------

// helper function, can remove anytime
function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

// helper function, can remove anytime
// fast hash <-- but not secure at all
function fast_hash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash &= hash
    }
    return hash
}

module.exports = app

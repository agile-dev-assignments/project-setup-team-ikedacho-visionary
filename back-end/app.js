// import and instantiate express
const express = require('express') // CommonJS import style!
const app = express() // instantiate an Express object
require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const db = require('./db')
const authUser = require('./authIns')
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

//-----------------------------------------------prelogin page-----------------------------------------------
const preloginHomeRouter = require('./router/prelogin/prelogin_home')
app.use('/', preloginHomeRouter)

const registerRouter = require('./router/prelogin/register')
app.use('/api_register', registerRouter)

const loginRouter = require('./router/prelogin/login')
app.use('/login', loginRouter)

//-----------------------------------------------auxiliary-----------------------------------------------
const auxiliaryRouter = require('./router/auxiliary/user')
app.use('/', auxiliaryRouter)

app.use(function (req, res, next) {
    if (req.user === undefined) {
        console.log(req.user)
        res.status(500).send()
    } else {
        next()
    }
})
//-----------------------------------------------home page-----------------------------------------------
const homeRouter = require('./router/home/home')
app.use('/', homeRouter)

const editRouter = require('./router/home/edit')
app.use('/get_edit', editRouter)

//-----------------------------------------------me page-----------------------------------------------
const meRouter = require('./router/me/me')
app.use('/get_me', meRouter)

const facebookRouter = require('./router/me/facebook')
app.use('/get_facebook', facebookRouter)

const twitterRouter = require('./router/me/twitter')
app.use('/get_twitter_request_token', twitterRouter)

const myProfileRouter = require('./router/me/my_profile')
app.use('/get_my_profile', myProfileRouter)

const backgroundPictureRouter = require('./router/me/background_picture')
app.use('/post_background_picture', backgroundPictureRouter)

const friendProfileRouter = require('./router/me/friend_profile')
app.use('/api_friend_profile', friendProfileRouter)

const friendSuggestionRouter = require('./router/me/friend_suggestion')
app.use('/api_friend_suggestion', friendSuggestionRouter)

const myLikeHistoryRouter = require('./router/me/my_like_history')
app.use('/api_liked_history', myLikeHistoryRouter)

const myCommentHistoryRouter = require('./router/me/my_comment_history')
app.use('/api_my_comment_history', myCommentHistoryRouter)

const myBrowseHistoryRouter = require('./router/me/my_browse_history')
app.use('/api_browse', myBrowseHistoryRouter)

const followersRouter = require('./router/me/followers')
app.use('/api_followers', followersRouter)

const followingsRouter = require('./router/me/followings')
app.use('/api_followings', followingsRouter)

const addFriendRouter = require('./router/me/add_friend')
app.use('/get_add_friend', addFriendRouter)

const removeFriendRouter = require('./router/me/remove_friend')
app.use('/get_remove_friend', removeFriendRouter)

//-----------------------------------------------community page-----------------------------------------------
const commentedHistoryRouter = require('./router/community/commented_history')
app.use('/api_commented_history', commentedHistoryRouter)

const likedHistoryRouter = require('./router/community/liked_history')
app.use('/api_being_liked', likedHistoryRouter)

const mentionedHistoryRouter = require('./router/community/mentioned_history')
app.use('/api_being_mentioned', mentionedHistoryRouter)

const messageRouter = require('./router/community/message')
app.use('/api_message', messageRouter)

const chatMessageRouter = require('./router/community/chat_message')
app.use('/api_chat_messages', chatMessageRouter)

const sendMessageRouter = require('./router/community/send_message')
app.use('/api_send_new_message', sendMessageRouter)

const createChatListRouter = require('./router/community/create_new_chat_list')
app.use('/api_create_new_chat_list', createChatListRouter)

const createChatId = require('./router/community/create_new_chat_id')
app.use('/api_create_new_chat_roomID', createChatId)

//-----------------------------------------------search page-----------------------------------------------
const searchRecommendRouter = require('./router/search/search_recommend')
app.use('/api_search_recommended', searchRecommendRouter)

const searchResultRouter = require('./router/search/search_result')
app.use('/api_search_result', searchResultRouter)

const trendingRouter = require('./router/search/trending')
app.use('/api_trending', trendingRouter)

//post content
const likeAPostRouter = require('./router/post_content/like_a_post')
app.use('/api_like_a_post', likeAPostRouter)

const commentRouter = require('./router/post_content/comment')
app.use('/', commentRouter)

const unlikeAPostRouter = require('./router/post_content/unlike_a_post')
app.use('/api_unlike_a_post', unlikeAPostRouter)

const repostRouter = require('./router/post_content/repost')
app.use('/', repostRouter)

const browsedRouter = require('./router/post_content/browse')
app.use('/browsed', browsedRouter)

const fetchCommentsRouter = require('./router/post_content/fetch_comments')
app.use('/get_comments_in_post_content', fetchCommentsRouter)

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

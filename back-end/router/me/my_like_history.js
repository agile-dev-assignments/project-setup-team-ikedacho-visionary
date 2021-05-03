const myLikeHistoryRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

myLikeHistoryRouter.get('/', async (req, res) => {
    let ret = {}
    const username = req.user.username

    // retrieve liked history from database and return to front-end
    UserInfo.findOne({ user_name: username }, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).send()
        } else {
            ret = result.my_like_history
            console.log('Me/Liked-History: ', ret)
            res.json(ret)
        }
    })
})
module.exports = myLikeHistoryRouter

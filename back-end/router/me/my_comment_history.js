const myCommentHistoryRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

myCommentHistoryRouter.get('/', async (req, res) => {
    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract being liked history
            ret = result.my_comment_history
            res.json(ret)
            console.log(ret)
        }
    })
})
module.exports = myCommentHistoryRouter
const myCommentHistoryRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

myCommentHistoryRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).send()
            } else {
                // extract being liked history
                ret = result.my_comment_history
                res.json(ret)
                console.log(ret)
            }
        })
    }
})
module.exports = myCommentHistoryRouter

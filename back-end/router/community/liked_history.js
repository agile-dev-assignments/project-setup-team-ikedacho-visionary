const likedHistoryRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

likedHistoryRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
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
    }
})
module.exports = likedHistoryRouter

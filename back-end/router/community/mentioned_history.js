const mentionedHistoryRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

mentionedHistoryRouter.get('/', async (req, res) => {
    let ret = {}

    // retrieve data from database
    await UserInfo.findOne({ user_name: req.user.username }, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract mentioned history
            ret = result.others_mentioned_history
            //console.log(ret)
            res.json(ret)
        }
    })
})
module.exports = mentionedHistoryRouter
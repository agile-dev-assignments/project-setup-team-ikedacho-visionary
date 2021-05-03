const browseHistoryRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

browseHistoryRouter.get('/', (req, res) => {
    let ret
    const username = req.user.username

    // retrieve data from database
    UserInfo.findOne({ user_name: username }, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).send()
        } else {
            // extract the brose history field
            ret = result.my_browse_history
            console.log(ret)
            res.json(ret)
        }
    })
})
module.exports = browseHistoryRouter

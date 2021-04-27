const browsedRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

browsedRouter.post("/", (req, res) => {
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
    })
})
module.exports = browsedRouter

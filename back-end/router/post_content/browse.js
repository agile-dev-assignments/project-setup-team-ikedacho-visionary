const browsedRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

browsedRouter.post("/", (req, res) => {
    const browsed = req.body;
    const username = req.user.username;
    UserInfo.findOne({user_name: username}, (err, result) => {

        // check if same post exists in browsed history
        let browse_history = result.my_browse_history, 
            flag = false
        browse_history.forEach((bh) => {
            if (bh.senttime === browsed.senttime && bh.source === browsed.source && 
                bh.UserName === browsed.username && bh.userimg === browsed.userimg && 
                bh.content === browsed.content) {
                // simply update the view date
                bh.viewdate = browsed.viewdate
                flag = true
            } 
        })

        if (!flag) {
            result.my_browse_history.push(browsed)
        }

        // save the update   
        result.save((err) => {
            if (err) {
                console.log(err)
            }
        })            
    })
})
module.exports = browsedRouter

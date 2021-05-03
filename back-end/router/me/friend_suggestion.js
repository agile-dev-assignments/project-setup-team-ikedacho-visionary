const friendSuggestionRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

friendSuggestionRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        let ret = {}
        let unfollowed_list = [] //list of user who is not followed by me
        let following_list
        const my_username = req.user.username
        const search_name = req.query.search_name
        console.log('search_name: ', search_name, ' <---')

        await UserInfo.find((err, UserInfos) => {
            if (err) {
                console.log('error', err)
            } else {
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
                //console.log(unfollowed_list)
                ret.unfollowed_list = unfollowed_list !== undefined ? unfollowed_list : []
                ret.following_list = following_list !== undefined ? following_list : []

                res.json(ret)
            }
        })
    }
})
module.exports = friendSuggestionRouter

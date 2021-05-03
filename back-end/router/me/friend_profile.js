const friendProfileRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

friendProfileRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        const my_username = req.user.username
        let post_data = ''
        let friend_info = ''
        const UserName = req.query.UserName
        let friend
        let my_like_history

        const friend_user = await UserInfo.findOne({ user_name: UserName })
        friend_info = friend_user
        linked_social_media = friend_user.linked_social_media
        post_data = friend_user.post_data

        const myself_user = await UserInfo.findOne({ user_name: my_username })
        friend = myself_user.following.includes(UserName)
        my_like_history = myself_user.my_like_history

        await UserInfo.findOne({ user_name: my_username }, (err, UserInfos) => {
            if (err) {
                console.error(err)
                res.status(500).send()
            } else {
                friend = UserInfos.following.includes(UserName)
                my_like_history = UserInfos.my_like_history
            }
        })

        //FILTER POST DATA to send back to client, based on platform user selected in frontend
        //console.log("req.query.platform_name_array:", req.query.platform_name_array)
        let filtered_post_data = post_data.slice()
        if (req.query.platform_name_array !== undefined) {
            filtered_post_data = post_data.filter((element) => {
                if (req.query.platform_name_array.includes(element.source)) {
                    return true
                }
            })
        }

        // lr = liked_record, fr = filtered_record
        let lr,
            fr,
            matched,
            filtered_by_liked = []
        // if my_like_history is not empty, we need to know if post has been liked by the current user
        // forEach might be better
        if (my_like_history !== undefined && !isEmpty(my_like_history)) {
            for (let i = 0; i < filtered_post_data.length; i++) {
                fr = filtered_post_data[i]
                matched = false
                for (let j = 0; j < my_like_history.length; j++) {
                    lr = my_like_history[j]
                    // console.log("\nlr, fr: ", lr, "\n", fr, "\n")
                    if (lr.text_content == fr.content && lr.source == fr.source && lr.post_issued_time.getTime() == fr.senttime.getTime()) {
                        // console.log("matched! ")
                        filtered_by_liked.push({
                            content: fr.content,
                            source: fr.source,
                            senttime: fr.senttime,
                            contentimg: fr.contentimg,
                            commented: fr.commented,
                            liked: fr.liked,
                            repoted: fr.repoted,
                            like_switch: true,
                        })
                        matched = true
                        break
                    }
                }
                if (matched === false) {
                    filtered_by_liked.push(fr)
                }
            }
        } else {
            filtered_by_liked = filtered_post_data
        }

        //send back response_data which consists of user_info and filtered_post_data as post_data
        const response_data = {
            friend_info: friend_info,
            post_data: filtered_by_liked, //return the filtered data based on platform selected
            linked_social_media: linked_social_media, //return linked_platform name
            friend: friend,
        }

        console.log('friend: ', response_data.friend)
        res.json(response_data)
    }
})

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

module.exports = friendProfileRouter

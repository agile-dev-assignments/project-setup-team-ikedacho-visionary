const myProfileRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

myProfileRouter.get('/', async (req, res) => {
    const my_username = req.user.username
    let my_like_history
    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        if (err) {
            console.log('error', err)
            res.status(500).send()
        } else {
            user_info = UserInfos
            linked_social_media = UserInfos.linked_social_media
            unconnected_social_media = UserInfos.unconnected_social_media
            post_data = UserInfos.post_data
            my_like_history = UserInfos.my_like_history

            let filtered_post_data = post_data.slice()
            //filter the post_data to only contain the linked_social_media
            filtered_post_data = post_data.filter((element) => {
                if (linked_social_media.includes(element.source)) {
                    return true
                }
            })

            //filtered_post_data by selected platform_name by user
            if (req.query.platform_name_array !== undefined) {
                //console.log("111111")
                filtered_post_data = post_data.filter((element) => {
                    if (req.query.platform_name_array.includes(element.source)) {
                        return true
                    }
                }) //end of filtered_post_data by selected platform_name by user
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

            console.log('filtered_by_liked: ', filtered_by_liked)

            //send back response_data which consists of user_info and filtered_post_data as post_data
            const response_data = {
                user_info: user_info,
                post_data: filtered_by_liked, //return the filtered data based on platform selected
                linked_social_media: linked_social_media, //return linked_platform name
            }
            //console.log("in get_my_profile:", user_info)
            //console.log("linked_social_media:",linked_social_media)
            //console.log("in my_profile's filtered post_data:",filtered_post_data)
            //console.log("in my_profile's  post_data:",post_data)
            res.json(response_data)
        }
    })
})

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

module.exports = myProfileRouter

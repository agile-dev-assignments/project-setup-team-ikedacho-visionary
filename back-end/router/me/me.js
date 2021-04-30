const meRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

meRouter.get('/', async (req, res) => {
    const my_username = req.user.username
    user_name_l = req.user.username
    let user_info = []
    let linked_social_media = []
    let unconnected_social_media = []
    await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
        if (err) {
            console.log('error', err)
        } else {
            user_info = UserInfos
            linked_social_media = UserInfos.linked_social_media
            unconnected_social_media = UserInfos.unconnected_social_media
            post_data = UserInfos.post_data

            filtered_post_data_overall = post_data.filter((element) => linked_social_media.includes(element.source))
            user_info.post_number = filtered_post_data_overall.length
            //console.log(user_info)
            //console.log("user_info.post_number",user_info.post_number)
            selected_social_media = ['O-Zone', 'Facebook', 'Twitter', 'Instagram']

            let clicked_linked_social_media = req.query.clicked_linked_social_media
            let clicked_unconnected_social_media = req.query.clicked_unconnected_social_media

            if (clicked_linked_social_media !== undefined) {
                //update linked_social_media(delete)
                linked_social_media = linked_social_media.filter((element) => {
                    if (!element.includes(clicked_linked_social_media)) {
                        return true
                    }
                })
                //update linked_social_media to database
                const filter1 = { user_name: my_username }
                const update1 = { linked_social_media: linked_social_media }
                await UserInfo.findOneAndUpdate(filter1, update1, {
                    new: true,
                })
                //console.log('a',linked_social_media )

                if (!unconnected_social_media.includes(clicked_linked_social_media)) {
                    //update unconnected_social_media(add)
                    unconnected_social_media.push(clicked_linked_social_media)
                    //update unconnected_social_media to database
                    const filter2 = { user_name: my_username }
                    const update2 = { unconnected_social_media: unconnected_social_media }
                    await UserInfo.findOneAndUpdate(filter2, update2, {
                        new: true,
                    })
                    //console.log('b',unconnected_social_media )
                }
            } //end of if

            if (clicked_unconnected_social_media !== undefined) {
                //update unconnected_social_media(delete)
                unconnected_social_media = unconnected_social_media.filter((element) => {
                    if (!element.includes(clicked_unconnected_social_media)) {
                        return true
                    }
                })
                //update unconnected_social_media to database
                const filter1 = { user_name: my_username }
                const update1 = { unconnected_social_media: unconnected_social_media }
                await UserInfo.findOneAndUpdate(filter1, update1, {
                    new: true,
                })
                //console.log('c',unconnected_social_media )

                if (!linked_social_media.includes(clicked_unconnected_social_media)) {
                    //update linked_social_media(add)
                    linked_social_media.push(clicked_unconnected_social_media)
                    //update linked_social_media to database
                    const filter2 = { user_name: my_username }
                    const update2 = { linked_social_media: linked_social_media }
                    await UserInfo.findOneAndUpdate(filter2, update2, {
                        new: true,
                    })
                    //console.log('d',linked_social_media )
                }
            }
            const response_data = {
                user_info: user_info,
                linked_social_media: linked_social_media, //return linked_platform name
                unconnected_social_media: unconnected_social_media,
            }
            //console.log("in get_my_profile:", user_info)
            //console.log('linked_social_media:', linked_social_media)
            //console.log('unconnected_social_media:', unconnected_social_media)
            //console.log("in me's post_data:",post_data)
            res.json(response_data)
        }
    })
})
module.exports = meRouter

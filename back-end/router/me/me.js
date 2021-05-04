const meRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

meRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        const my_username = req.user.username
        user_name_l = req.user.username
        let user_info = []
        let linked_social_media = []
        let unconnected_social_media = []
        await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
            if (err) {
                console.log('error', err)
                res.status(500).send()
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

                const response_data = {
                    user_info: user_info,
                    linked_social_media: linked_social_media, //return linked_platform name
                    unconnected_social_media: unconnected_social_media,
                }
                //console.log("in get_my_profile:", user_info)
                console.log('linked_social_media:', linked_social_media)
                console.log('unconnected_social_media:', unconnected_social_media)
                //console.log("in me's post_data:",post_data)
                res.json(response_data)
            }
        })
    }
})
module.exports = meRouter

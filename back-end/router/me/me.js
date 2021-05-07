const meRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

meRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        const response_data = {
            user_info: {
                _id: 'guest',
                follower: ['Ozone_official'],
                following: ['Ozone_official'],
                unconnected_social_media: ['Twitter', 'Instagram', 'Facebook'],
                linked_social_media: ['O-Zone'],
                user_name: 'guest',
                user_photo: 'https://robohash.org/guest.png?size=200x200',
                background_picture: 'https://resilientblog.co/wp-content/uploads/2019/07/sky-quotes.jpg',
                post_number: 0,
                bio: '🥤',
                follower_number: 0,
                following_number: 0,
                post_data: [],
                my_comment_history: [],
                my_browse_history: [],
                my_like_history: [],
                others_mentioned_history: [],
                others_liked_history: [],
                others_commented_history: [],
            },
            linked_social_media: ['O-Zone'], //return linked_platform name
            unconnected_social_media: ['Facebook', 'Instagram', 'Twitter'],
        }
        res.json(response_data)
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

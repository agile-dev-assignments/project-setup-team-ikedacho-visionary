const homeRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')
let selected_social_media = ['O-Zone', 'Facebook', 'Twitter', 'Instagram']

homeRouter.post('/post_home', (req, res) => {
    //console.log('ssssssss')
    //selected_social_media=req.query.selected_social_media
    //console.log("selected_social_media:" , req.body)

    if (req.body.selected_social_media != 'All') {
        selected_social_media = req.body.selected_social_media
    } else {
        selected_social_media = ['O-Zone', 'Facebook', 'Twitter', 'Instagram']
    }
    // console.log("selected_social_media:" ,selected_social_media)
    //redirect to same page
    res.redirect('back')
})

homeRouter.get('/api_whatsnew', async (req, res) => {
    if (req.user === undefined) {
        console.log(req.user)
        res.status(500).send()
    } else {
        const UserName = req.user.username
        const userInfos = await UserInfo.find()
        let followed_users = []
        let postData = []
        let my_like_history
        console.log('username', UserName)

        //const userInfos = await UserInfo.find()
        console.log("userInfos", userInfos.length)

        // find user object in database and extract its follower array
        let result = await UserInfo.findOne({ user_name: UserName })
        followed_users = result.following
        my_like_history = result.my_like_history

        followed_users.push(UserName)
        console.log("followed_users", followed_users.length)

        userInfos.forEach((userInfo) => {
            const info = userInfo.toObject()
            if (followed_users.includes(info.user_name)) {
                const data = info.post_data.map((ele) => {
                    ele.userimg = userInfo.user_photo
                    ele.UserName = userInfo.user_name
                    return ele
                })
                // console.log(data)
                postData = postData.concat(data)
            }
        })

        postData.sort((prev, cur) => {
            return cur.senttime - prev.senttime
        })

        let filtered_post_data = postData.slice()

        // console.log("selected_social_media", selected_social_media)

        filtered_post_data = postData.filter((element) => {
            if (selected_social_media.includes(element.source)) {
                return true
            } //end of if
        }) //end of filtered_post_data

        // console.log(filtered_post_data)

        /*
        filtering the post data by LIKE history
        */
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
                            UserName: lr.user_name,
                            userimg: lr.user_photo,
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

        // console.log('filtered_by_liked: ', filtered_by_liked)
        res.json(filtered_by_liked)
    }
})

homeRouter.get('/api_recommended', async (req, res, next) => {
    user_name_l = req.user.username

    const userInfos = await UserInfo.find()
    let postData = [],
        my_like_history

    userInfos.forEach((userInfo) => {
        const info = userInfo.toObject()
        const data = info.post_data.map((ele) => {
            ele.userimg = userInfo.user_photo
            ele.UserName = userInfo.user_name
            return ele
        })

        if (userInfo.user_name === req.user.username) {
            my_like_history = userInfo.my_like_history
        }

        // console.log(data)
        postData = postData.concat(data)
    })

    postData.sort((prev, cur) => {
        const prev_ct = prev.liked_count + prev.commented_count + prev.reposted_count
        const cur_ct = cur.liked_count + cur.commented_count + cur.reposted_count
        return cur_ct - prev_ct
    })

    let filtered_post_data = postData.slice()

    //console.log("selected_social_media", selected_social_media)

    filtered_post_data = postData.filter((element) => {
        if (selected_social_media.includes(element.source)) {
            return true
        } //end of if
    }) //end of filtered_post_data

    // console.log(filtered_post_data)

    /*
    filtering the post data by LIKE history
    */
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
                        UserName: lr.user_name,
                        userimg: lr.user_photo,
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

    // console.log('filtered_by_liked: ', filtered_by_liked)
    res.json(filtered_by_liked)
})

homeRouter.get('/api_recent', async (req, res, next) => {
    let postData = [],
        my_like_history,
        username = req.user.username

    // fetch like history and browse history from self user
    let self = await UserInfo.findOne({ user_name: username })
    my_like_history = self.my_like_history
    postData = self.my_browse_history

    let filtered_post_data = postData.slice()

    filtered_post_data = postData.filter((element) => {
        if (selected_social_media.includes(element.source)) {
            return true
        } //end of if
    }) //end of filtered_post_data

    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < filtered_post_data.length; i++) {
            // console.log('filtered_post_data[i]' + fr)
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
                        UserName: lr.user_name,
                        userimg: lr.user_photo,
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

    console.log("filtered_by_liked", filtered_by_liked.length)
    res.json(filtered_by_liked)
})

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

module.exports = homeRouter

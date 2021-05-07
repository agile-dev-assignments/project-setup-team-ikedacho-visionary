const searchResultRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

searchResultRouter.get('/', async (req, res) => {
    //const search_key = req.query.searchQuery
    const search_keyword = req.query.searchQuery
    //console.log('search_keyword', search_key);
    let my_name = ''
    if (req.user === undefined) {
        my_name = 'test25'
    } else {
        my_name = req.user.user_name
    }
    const userInfos = await UserInfo.find()
    let postData = [],
        my_like_history

    userInfos.forEach((userInfo) => {
        const info = userInfo.toObject()
        //console.log(info.content);

        const data = info.post_data.map((ele) => {
            ele.userimg = userInfo.user_photo
            ele.UserName = userInfo.user_name
            return ele
        })

        for (let i = 0; i < info.post_data.length; i++) {
            if (info.post_data[i].content.indexOf(search_keyword) !== -1) {
                //console.log('info.post_data[i].content', info.post_data[i].content);
                postData = postData.concat(data[i])
            }
        }

        if (userInfo.user_name === my_name) {
            my_like_history = userInfo.my_like_history
        }

        // console.log(data)
        //postData = postData.concat(data)
    })

    postData.sort((prev, cur) => {
        return cur.senttime - prev.senttime
    })

    // lr = liked_record, fr = filtered_record
    let lr,
        fr,
        matched,
        filtered_by_liked = []
    // if my_like_history is not empty, we need to know if post has been liked by the current user
    // forEach might be better
    if (my_like_history !== undefined && !isEmpty(my_like_history)) {
        for (let i = 0; i < postData.length; i++) {
            fr = postData[i]
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
        filtered_by_liked = postData
    }

    // console.log('filtered_by_liked: ', filtered_by_liked)
    res.json(filtered_by_liked)
})

function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

module.exports = searchResultRouter

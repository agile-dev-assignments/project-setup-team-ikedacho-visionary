const EditRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')

EditRouter.get('/', async (req, res) => {
    if (req.user === undefined) {
        res.status(501).send()
    } else {
        const my_username = req.user.username
        const post_text = req.query.post_text
        const current_date = new Date()
        let post_img = ''
        if (req.query.old_post_img) {
            post_img = req.query.old_post_img
        }
        let my_user_photo

        const regex = /@\S+\s/g
        const search_for_mention = post_text.match(regex)
        const unique_search_names = [...new Set(search_for_mention)]

        await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
            try {
                UserInfos.post_data.unshift({
                    content: post_text,
                    source: 'O-Zone',
                    senttime: current_date,
                    contentimg: post_img,
                })
                UserInfos.post_number++

                my_user_photo = UserInfos.user_photo

                await UserInfos.save(function (saveErr, saveUserInfos) {
                    if (err) {
                        console.log('error saving post')
                        res.status(500).send()
                    }
                })
            } catch (e) {
                console.error(e)
                res.status(500).send()
            }
        })

        unique_search_names.forEach(async (item) => {
            const search_name = item.replace(/@|\s/g, '')
            console.log(search_name)
            await UserInfo.findOne({ user_name: search_name }, async (err, result) => {
                if (err) {
                    console.error(err)
                    res.status(500).send()
                } else {
                    if (result) {
                        // found!
                        result.others_mentioned_history = result.others_mentioned_history.length ? result.others_mentioned_history : []
                        result.others_mentioned_history.push({
                            mentioner_avatar: my_user_photo,
                            mentioner_username: my_username,
                            mentioned_date: current_date,
                            post_image: ' ',
                            post_username: my_username,
                            post_avatar: my_user_photo,
                            post_text: post_text,
                        })

                        console.log(result.others_mentioned_history)

                        // save changes
                        await result.save((err) => {
                            if (err) {
                                console.error(err)
                                res.status(500).send()
                            }
                        })
                    } else {
                        // not found... -> do nothing! this is not a mention, or mentioning wrongly
                    }
                }
            })
        })
        res.status(200).send()
    }
})

//Then instantiate a multer object "upload_post_picture" to be used in app.post("/post_Post_picture", upload.array("background_picture", 1), (req, res)...
//and upload_post_picture multure object use the storage rule as defined in storage variable.
/*const upload_post_picture = multer({ storage: storage })

const post_picture = multer({ storage: storage })
app.post("/post_picture", upload_post_picture.array("post_picture", 1), (req, res) => {
    const my_username = req.user.username
    // check whether anything was uploaded. If success, send a response back. I will re-render my_profile page with background picture added in this case.
    if (req.files) {
       // success! send data back to the client, e.g. some JSON data
       console.log("success! req.files")
       const data = {
           status: "all good",
           message: "success, the files were uploaded!",
           post_picture: req.files,
       }
       new_post.contentimg=`/uploads/${data.post_picture[0].filename}`
   }
})*/
module.exports = EditRouter

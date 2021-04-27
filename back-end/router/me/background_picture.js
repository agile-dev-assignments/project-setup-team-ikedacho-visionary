const express = require('express')
const backgroundPictureRouter = require('express').Router()
const UserInfo = require('../../model/userInfo/userInfo')
const multer = require('multer') // middleware to handle HTTP POST requests with file uploads
const fs = require('fs')
backgroundPictureRouter.use('/static', express.static('front-end/public'))

// it tell multer to save uploaded files to disk into a directory named public/uploads, with a filename based on the current time.
// the file storage rule function referred by a variable called storage will be used later as parameter when we initiated a multer object.
const storage_backgruond = multer.diskStorage({
    // set file saved destination. Multer can save uploaded files to a number of different destinations.
    destination: function (req, file, cb) {
        if (!fs.existsSync(`../front-end/public/uploads`)) {
            fs.mkdirSync(`../front-end/public/uploads`)
        }
        if (!fs.existsSync(`../front-end/public/uploads/background`)) {
            fs.mkdirSync(`../front-end/public/uploads/background`)
        }
        let dir = `../front-end/public/uploads/background/${req.user.username}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, `../front-end/public/uploads/background/${req.user.username}`)
    },

    // set filename rules
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '_' + Date.now() + `.${ext}`)
    },
})

//Then instantiate a multer object "upload_background_picture" to be used in app.post("/my_profile", upload.array("background_picture", 1), (req, res)...
//and upload_background_picture multure object use the storage rule as defined in storage variable.
const upload_background_picture = multer({ storage: storage_backgruond })

backgroundPictureRouter.post('/', upload_background_picture.array('background_picture', 1), async (req, res) => {
    // check whether anything was uploaded. If success, send a response back. I will re-render my_profile page with background picture added in this case.
    if (req.files) {
        // success! send data back to the client, e.g. some JSON data
        const data = {
            status: 'all good',
            message: 'success, the files were uploaded!',
            background_picture: req.files,
        }
        // then send a response to client with modification on data we receive from client. otherwise, it will occur 500 error.
        // add the background image src to user_info data
        const my_username = req.user.username
        await UserInfo.findOne({ user_name: my_username }, async (err, UserInfos) => {
            try {
                UserInfos.background_picture = `/uploads/background/${user_name_l}/${data.background_picture[0].filename}`
                await UserInfos.save(function (saveErr, saveUserInfos) {
                    if (err) {
                        console.log('error saving post')
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
        res.redirect('/my_profile') //redirect to my_proile page
    } else {
        //if no file is uploaded, the submit button cannot send request.
        console.log('error! req.files')
        res.redirect('/my_profile')
    }
})
module.exports = backgroundPictureRouter

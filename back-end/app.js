// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({silent:true}) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./loginAuth/user");
const UserInfo = require("./userInfo/userInfo");
const Chatroom = require("./chatroom/chatroom")
const db = require("./db");
const request=require('request')
const oauthSignature = require('oauth-signature')
const authUser = require('./authIns')

//----------------------------------------- END OF IMPORTS---------------------------------------------------

app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
// make 'public' directory publicly readable with static content
app.use("/static", express.static("front-end/public"))
// const User = require("./user");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
 require("./loginAuth/passPortConfig.js")(passport);
//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

let selected_social_media= ["O-Zone","Facebook", "Twitter","Instagram"]

//put routes here:
app.post("/api_register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        });

        const newUserInfo = new UserInfo({
            user_name: req.body.username,
            user_photo: `https://robohash.org/${req.body.username}.png?size=200x200`,
            background_picture: 'https://resilientblog.co/wp-content/uploads/2019/07/sky-quotes.jpg',
            post_number: 0,
            bio: 'This person is too lazy to change this default',
            follower_number: 0,
            follower: [], 
            following_number: 0,
            following: [],
            linked_social_media: ['O-Zone'],
            unconnected_social_media: ['Twitter','Instagram','Facebook'],
        });

        // naive way to store current user info in session
        req.user = req.body.username
        
        await newUser.save();
        await newUserInfo.save();
        res.send("User Created");
    }
  });
});

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
            });
        }
    })(req, res, next);
});

// return insensitive information about other users
app.get("/api_get_user_info_by_name", (req, res) => {
    const username = req.body.username
    UserInfo.findOne({user_name: username}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(result)
            const ret = {
                username: result.user_name, 
                userimg: result.user_photo, 
                bio: result.bio
            }
            res.json(ret)
        }
    })
})


app.post("/browsed", (req, res, next) => {
    console.log(req.body); 
    var my_query = { user_name: req.body.user_name };
    var new_values =  {$set: {my_history : {view_history: req.body.postId }}};
    UserInfo.updateOne(my_query, new_values, function(err, res) {
        if (err) throw err; 
        console.log("UserInfo successfully updated");
    });
    
    res.send({
        status: "created"
    })
});


app.get("/api_browse", (req, res) => {
    let ret
    const username = req.user.username

    // retrieve data from database
    UserInfo.findOne({user_name: username}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract the brose history field
            ret = result.my_browse_history
            console.log(ret)
            res.json(ret)
        }
    })
});


app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.get("/my_info", (req, res) => {
    const my_username = req.user.username
    UserInfo.findOne({user_name: my_username}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.json(result)
        }
    })    
});

app.use('/get_me',async (req,res,next)=>{
    const my_username = req.user.username
    await UserInfo.findOne({user_name: my_username},(err, UserInfos)=>{
        try {
            user_info=UserInfos
            linked_social_media=UserInfos.linked_social_media
            unconnected_social_media=UserInfos.unconnected_social_media
            post_data=UserInfos.post_data
            
            filtered_post_data_overall=post_data.filter(element=>linked_social_media.includes(element.source))
            user_info.post_number=filtered_post_data_overall.length
            //console.log(user_info)
            //console.log("user_info.post_number",user_info.post_number)
            selected_social_media= ["O-Zone","Facebook", "Twitter","Instagram"]
        } catch(e){
            console.log(e)
        }
    })
    next()
})

app.get("/get_me", async (req, res) => {
    const my_username = req.user.username
    let clicked_linked_social_media = req.query.clicked_linked_social_media
    let clicked_unconnected_social_media=req.query.clicked_unconnected_social_media
    
    if (clicked_linked_social_media!==undefined) {
        //update linked_social_media(delete)
        linked_social_media=linked_social_media.filter(element=>{
            if (!element.includes(clicked_linked_social_media)){
                return true
            }
        })
        //update linked_social_media to database
        const filter1 = { user_name: my_username };
        const update1 = { linked_social_media: linked_social_media };
        await UserInfo.findOneAndUpdate(filter1, update1, {
            new: true   
        })
        //console.log('a',linked_social_media )

        if(!unconnected_social_media.includes(clicked_linked_social_media)){
            //update unconnected_social_media(add)
            unconnected_social_media.push(clicked_linked_social_media)
            //update unconnected_social_media to database
            const filter2 = { user_name: my_username };
            const update2 = { unconnected_social_media: unconnected_social_media };
            await UserInfo.findOneAndUpdate(filter2, update2, {
                new: true
            });
            //console.log('b',unconnected_social_media )
        }
    }//end of if

    if (clicked_unconnected_social_media!==undefined) {
        //update unconnected_social_media(delete)
        unconnected_social_media=unconnected_social_media.filter(element=>{
            if (!element.includes(clicked_unconnected_social_media)){
                return true
            }
        })
        //update unconnected_social_media to database
        const filter1 = { user_name: my_username };
        const update1 = { unconnected_social_media: unconnected_social_media };
        await UserInfo.findOneAndUpdate(filter1, update1, {
            new: true
        });
        //console.log('c',unconnected_social_media )

        if (!linked_social_media.includes(clicked_unconnected_social_media)){
              //update linked_social_media(add)
        linked_social_media.push(clicked_unconnected_social_media)
        //update linked_social_media to database
        const filter2 = { user_name: my_username };
        const update2 = { linked_social_media: linked_social_media };
        await UserInfo.findOneAndUpdate(filter2, update2, {
            new: true
        })
        //console.log('d',linked_social_media )
        }
    }
    const response_data={
        "user_info" : user_info,
        "linked_social_media": linked_social_media,//return linked_platform name
        "unconnected_social_media": unconnected_social_media
    }
    //console.log("in get_my_profile:", user_info)
    console.log("linked_social_media:",linked_social_media)
    console.log("unconnected_social_media:",unconnected_social_media)
    //console.log("in me's post_data:",post_data)
    res.json(response_data)
})


app.get('/get_facebook', async (req, res) => {
    const accessToken = req.query.accessToken
    console.log("accessToken:",accessToken)
    let userID=''
    let long_lived_token=''
    let post_data=''
    const my_username = req.user.username

    const save_posts = async () => {
        console.log("start")
        await UserInfo.findOne({user_name: my_username}, async(err, UserInfos)=>{
            try {
                post_data.forEach((item)=>{
                    if('message' in item){
                        console.log("post data for each", post_data)
                        UserInfos.post_data.unshift({
                            content:item.message,
                            source:"Facebook",
                            senttime:item.created_time,
                            contentimg:" ",
                        })
                        UserInfos.post_number++
                    }
                })
                await UserInfos.save(function(saveErr, saveUserInfos) {
                    if(err){
                        console.log('error saving post')
                    }
                });   
            } catch(e){
                console.log(e)
            }
        })
    }
    
    await request(
        `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${accessToken}`,

        async function (error, response, body) {
            if(error){
                console.log("error")
            }
            else{
                const res=JSON.parse(body)
                console.log("get long-lived-token(body)",JSON.parse(body))
                long_lived_token=res.access_token
                //get userid
                await request(
                    `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/me?access_token=${long_lived_token}`,
                    async function (error, response, body) {
                        if(error){
                            console.log("error")
                        }
                        else{
                            console.log("get id:",body)
                            userID=JSON.parse(body).id

                            await request(
                                `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/${userID}/permissions?access_token=${long_lived_token}`,
                                function (error, response, body) {
                                    if(error){
                                        console.log("error")
                                    }
                                    else{
                                        console.log("get permissions lists allowed:",body)
                                    }
                                }
                            )

                            await request(
                                `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/${userID}/feed?fields=id,created_time,message,object_id,permalink_url&access_token=${long_lived_token}`,
                                async function (error, response, body) {
                                    if(error){
                                        console.log("error")
                                    }
                                    else{
                                        //console.log("get posts:",body)
                                        const res2=await JSON.parse(body)
                                        post_data=res2.data
                                        console.log("posts:",post_data)
                                        if (res2.data){
                                            save_posts()
                                        }
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
})

app.get("/get_twitter_request_token", async (req, res) => {
    let ret = {}

    // get timestamp in seconds
    const date = Math.floor(Date.now() / 1000)
    const username = req.user.username 
    const nonce = `${fast_hash(date + username)}`
    console.log("Calculated: ", date, nonce)
    
    // Alright, let me just manually generate an encoded signature!!!!!!!
    const parameters = {
        oauth_consumer_key: process.env.TWITTER_API_KEY,
        oauth_token: process.env.TWITTER_ACCESS_TOKEN,
        oauth_nonce :nonce,
        oauth_timestamp : date,
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0',
        oauth_callback: "http://localhost:4000/me"
    }
    const request_url = 'https://api.twitter.com/oauth/request_token'
    const consumerSecret = process.env.TWITTER_API_SECRET_KEY
    const tokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET
	const signature = oauthSignature.generate('POST', request_url, parameters, consumerSecret, tokenSecret)

    const AuthHeader = `OAuth oauth_consumer_key="${process.env.TWITTER_API_KEY}",oauth_token="${process.env.TWITTER_ACCESS_TOKEN}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${date}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_callback="http%3A%2F%2Flocalhost%3A4000%2Fme",oauth_signature="${signature}"`

    // HTTPS request 
    const options = {
        'method': 'POST',
        'url': request_url,
        'headers': {
            'Authorization': AuthHeader
        }
    }

    request(options, (error, result) => {
        if (error) {
            console.error(err)
        } else {
            // manually parse the returned string
            let arr = result.body.split('&')
            for (let i = 0; i < 3; i ++) {
                let temp = arr[i].split('=')
                ret[temp[0]] = temp[1]
            }
            console.log(ret)
            res.json(ret)
        }
    })
})

app.get("/get_my_profile", async (req, res) => {
    const my_username = req.user.username
    await UserInfo.findOne({user_name: my_username},(err, UserInfos)=>{
        try {
            user_info=UserInfos
            linked_social_media=UserInfos.linked_social_media
            unconnected_social_media=UserInfos.unconnected_social_media
            post_data=UserInfos.post_data   
            //console.log("post_data",post_data)
        } catch(e){
            console.log(e)
        }
    })

    let filtered_post_data=post_data.slice()
    //filter the post_data to only contain the linked_social_media 
    filtered_post_data=post_data.filter(element=>{
        if (linked_social_media.includes(element.source)){
            return true
        }
     })

    //filtered_post_data by selected platform_name by user 
    if (req.query.platform_name_array!==undefined) {
        //console.log("111111")
        filtered_post_data=post_data.filter(element=>{
           if (req.query.platform_name_array.includes(element.source)){
               return true
           }
        })//end of filtered_post_data by selected platform_name by user 
    }

    //send back response_data which consists of user_info and filtered_post_data as post_data
    const response_data={
        "user_info" : user_info,
        "post_data" : filtered_post_data, //return the filtered data based on platform selected
        "linked_social_media": linked_social_media,//return linked_platform name
    }
    //console.log("in get_my_profile:", user_info)
    //console.log("linked_social_media:",linked_social_media)
    //console.log("in my_profile's filtered post_data:",filtered_post_data)
    //console.log("in my_profile's  post_data:",post_data)
    res.json(response_data)

})



// it tell multer to save uploaded files to disk into a directory named public/uploads, with a filename based on the current time.
// the file storage rule function referred by a variable called storage will be used later as parameter when we initiated a multer object.
const storage = multer.diskStorage({
    // set file saved destination. Multer can save uploaded files to a number of different destinations.
    destination: function (req, file, cb) {
        cb(null, "../front-end/public/uploads")
    },

    // set filename rules
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null, file.fieldname + "_" + Date.now()+ `.${ext}`)
    },

})

 
//Then instantiate a multer object "upload_background_picture" to be used in app.post("/my_profile", upload.array("background_picture", 1), (req, res)...
//and upload_background_picture multure object use the storage rule as defined in storage variable.
const upload_background_picture = multer({ storage: storage })

//Multer middleware will automatically save any uploaded files in the request into the specified directory, rename them as instructed,
//and make a field named req.files containing the paths to the files on the server.
//the following code, upload.array('my_files', 1), instructs multer to store no more than 1 files, coming from an HTML element named background_picture.
app.post("/post_background_picture", upload_background_picture.array("background_picture", 1), async (req, res) => {

    // check whether anything was uploaded. If success, send a response back. I will re-render my_profile page with background picture added in this case.
    if (req.files) {
        // success! send data back to the client, e.g. some JSON data
        // do something with the data we received from the client
        //console.log("success! req.files")
        const data = {
            status: "all good",
            message: "success, the files were uploaded!",
            background_picture: req.files,

        }//end of data
        //console.log(data.background_picture);
        /* [ { fieldname: 'background_picture', originalname: 'sky.jpg', encoding: '7bit', mimetype: 'image/jpeg', destination: 'public/uploads', filename: 'background_picture-1616974883630', path: 'public/uploads/background_picture-1616974883630',
            size: 78269 } ] */

        // then send a response to client with modification on data we receive from client. otherwise, it will occur 500 error.
        // add the background image src to user_info data
        const my_username = req.user.username
        await UserInfo.findOne({user_name: my_username}, async(err, UserInfos)=>{
            try {
                UserInfos.background_picture=`/uploads/${data.background_picture[0].filename}`
                await UserInfos.save(function(saveErr, saveUserInfos) {
                    if(err){
                        console.log('error saving post')
                    }
                });   
            } catch(e){
                console.log(e)
            }
        })
        res.redirect('/my_profile') //redirect to my_proile page
    }//end of if

    else{//if no file is uploaded, the submit button cannot send request.
        console.log("error! req.files")
        res.redirect('/my_profile')
    }   
})
//Then instantiate a multer object "upload_post_picture" to be used in app.post("/post_Post_picture", upload.array("background_picture", 1), (req, res)...
//and upload_post_picture multure object use the storage rule as defined in storage variable.
const upload_post_picture = multer({ storage: storage })

app.get("/follow", (req, res) => {

})

app.get("/get_edit", async (req, res) => {
    const my_username = req.user.username
    const post_text=req.query.post_text
    await UserInfo.findOne({user_name: my_username}, async(err, UserInfos)=>{
        try {
            UserInfos.post_data.unshift({
                content:post_text,
                source:"O-Zone",
                senttime:new Date(),
                contentimg:" ",
            })
            UserInfos.post_number++
            await UserInfos.save(function(saveErr, saveUserInfos) {
                if(err){
                    console.log('error saving post')
                }
            });   
        } catch(e){
            console.log(e)
        }
    })
})



/*
const post_picture = multer({ storage: storage })
app.post("/post_picture", upload_post_picture.array("post_picture", 1), (req, res) => {
    // check whether anything was uploaded. If success, send a response back. I will re-render my_profile page with background picture added in this case.
    if (req.files) {
       // success! send data back to the client, e.g. some JSON data
       // do something with the data we received from the client
       console.log("success! req.files")
       const data = {
           status: "all good",
           message: "success, the files were uploaded!",
           post_picture: req.files,

       }//end of data
       //console.log(data.post_picture);
       
       // then send a response to client with modification on data we receive from client. otherwise, it will occur 500 error.
       // add the background image src to user_info data

       new_post.contentimg=`/uploads/${data.post_picture[0].filename}`
       
      
   }//end of if
   ...... to be continue
})
*/

app.post('/post_home', (req, res) => {
    //console.log('ssssssss')
    //selected_social_media=req.query.selected_social_media
    //console.log("selected_social_media:" , req.body)
    
    if(req.body.selected_social_media!="All"){
        selected_social_media=req.body.selected_social_media
    }
    else{
        selected_social_media=["O-Zone","Facebook", "Twitter","Instagram"]

    }
   // console.log("selected_social_media:" ,selected_social_media)
   //redirect to same page
   res.redirect('back');

})

app.get("/get_comments_in_post_content", async (req, res)  => {
    const comment_text=req.query.comment_text
    //console.log("comment_text:",comment_text)

})


app.get("/api_my_comment_history", async (req, res)  => {
    let response_data=''
    
    //without async and await, axios block will execute after res.json(response_data) which will send incorrect data back to front-end. It is because I already declared and assigned value to the variable response_data above.
    await axios 
        .get(`${process.env.API_MY_COMMENT_HISTOR}?key=${process.env.API_MY_COMMENT_HISTORY_KEY}`)//`Here, I intentionally misspell the variable to use backup data. Correct: ${process.env.API_MY_COMMENT_HISTORY}?key=${process.env.API_MY_COMMENT_HISTORY_KEY}`
        .then(apiResponse => {response_data = apiResponse.data})//apiResponse.data 
        .catch((err) => {
            //console.log("Error: cannot fetch data from mockaroo api. Use backup data")
            //console.log(err)
            //backup data
            response_data = [{"id":1,"post_created_by":"sgosart0","post_text":"Nunc purus. Phasellus in felis. Donec semper sapien a libero.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","commented_date":"12/23/2020","commented_content":"In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."},{"id":2,"post_created_by":"dvellacott1","post_text":"Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","commented_date":"2/14/2021","commented_content":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."},{"id":3,"post_created_by":"alowndsbrough2","post_text":"Nam dui.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","commented_date":"8/15/2020","commented_content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue."},{"id":4,"post_created_by":"swoodstock3","post_text":"Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","commented_date":"6/30/2020","commented_content":"Phasellus in felis. Donec semper sapien a libero. Nam dui."},{"id":5,"post_created_by":"riacopini4","post_text":"In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","commented_date":"5/29/2020","commented_content":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum."},{"id":6,"post_created_by":"kfraniak5","post_text":"Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","commented_date":"9/19/2020","commented_content":"Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."},{"id":7,"post_created_by":"egyrgorcewicx6","post_text":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","commented_date":"9/24/2020","commented_content":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."},{"id":8,"post_created_by":"pvinick7","post_text":"In hac habitasse platea dictumst.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","commented_date":"9/22/2020","commented_content":"Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus."},{"id":9,"post_created_by":"abillion8","post_text":"Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","commented_date":"5/6/2020","commented_content":"Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio."},{"id":10,"post_created_by":"lmackellar9","post_text":"Quisque ut erat.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","commented_date":"1/12/2021","commented_content":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla."}]
            //console.log('backup data:',response_data)
        
        })//end of catch,axios

    //without async and await, the following code be executed before the axios block. So the response_data will be '' as I assign to it at the beginning. So the client will not receive the correct data, but only "". 
    //to avoid this problem, use async and await so that the following code will wait until axios block finish its work in which we get correct data and assign to response_data.
    //console.log('response_data_end:',response_data )
    res.json(response_data)
})


app.get("/api_commented_history", async (req, res)  => {
    let response_data=''
    
    //without async and await, axios block will execute after res.json(response_data) which will send incorrect data back to front-end. It is because I already declared and assigned value to the variable response_data above.
    await axios 
        .get(`${process.env.API_COMMENTS}?key=${process.env.API_COMMENTS_KEY}`)//` Correct: `${process.env.API_COMMENTS}?key=${process.env.API_COMMENTS_KEY}`
        .then(apiResponse => {response_data = apiResponse.data})//apiResponse.data 
        .catch((err) => {
            //console.log("Error: cannot fetch data from mockaroo api. Use backup data")
            //console.log(err)
            //backup data
            response_data = [{"id":1,"post_text":"Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"1/27/2020","commented_by_username":"ningrem0","commented_by_profile_image":"https://robohash.org/nisivitaefuga.png?size=50x50\u0026set=set1","commented_date":"6/13/2020","commented_content":"Sed ante. Vivamus tortor."},{"id":2,"post_text":"Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"3/25/2020","commented_by_username":"ekernan1","commented_by_profile_image":"https://robohash.org/providentanimiquibusdam.jpg?size=50x50\u0026set=set1","commented_date":"4/27/2020","commented_content":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim."},{"id":3,"post_text":"Morbi non quam nec dui luctus rutrum. Nulla tellus.","post_image":"http://dummyimage.com/80x80.jpg/cc0000/ffffff","post_date":"1/21/2020","commented_by_username":"blindegard2","commented_by_profile_image":"https://robohash.org/quoautemneque.png?size=50x50\u0026set=set1","commented_date":"1/20/2021","commented_content":"In quis justo. Maecenas rhoncus aliquam lacus."},{"id":4,"post_text":"Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"10/23/2020","commented_by_username":"ayuryatin3","commented_by_profile_image":"https://robohash.org/quibusdamnonqui.bmp?size=50x50\u0026set=set1","commented_date":"3/1/2021","commented_content":"Nullam varius."},{"id":5,"post_text":"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"1/2/2021","commented_by_username":"slarmet4","commented_by_profile_image":"https://robohash.org/dolorculpaad.png?size=50x50\u0026set=set1","commented_date":"8/24/2020","commented_content":"Maecenas pulvinar lobortis est. Phasellus sit amet erat."},{"id":6,"post_text":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"3/31/2020","commented_by_username":"bmatyatin5","commented_by_profile_image":"https://robohash.org/maximenequesimilique.jpg?size=50x50\u0026set=set1","commented_date":"6/10/2020","commented_content":"Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."},{"id":7,"post_text":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"1/14/2020","commented_by_username":"gheath6","commented_by_profile_image":"https://robohash.org/eaquiadolorem.bmp?size=50x50\u0026set=set1","commented_date":"7/2/2020","commented_content":"Pellentesque eget nunc."},{"id":8,"post_text":"Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"12/22/2020","commented_by_username":"dorae7","commented_by_profile_image":"https://robohash.org/ducimusnatusdolor.jpg?size=50x50\u0026set=set1","commented_date":"10/3/2020","commented_content":"Cras non velit nec nisi vulputate nonummy."},{"id":9,"post_text":"Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"10/22/2020","commented_by_username":"sshill8","commented_by_profile_image":"https://robohash.org/vitaeautitaque.png?size=50x50\u0026set=set1","commented_date":"5/18/2020","commented_content":"Nunc purus."},{"id":10,"post_text":"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","post_date":"8/2/2020","commented_by_username":"awooffitt9","commented_by_profile_image":"https://robohash.org/undeutdelectus.bmp?size=50x50\u0026set=set1","commented_date":"9/16/2020","commented_content":"Praesent blandit."}]
            //console.log('backup data:',response_data)
        
        })//end of catch,axios

    //without async and await, the following code be executed before the axios block. So the response_data will be '' as I assign to it at the beginning. So the client will not receive the correct data, but only "". 
    //to avoid this problem, use async and await so that the following code will wait until axios block finish its work in which we get correct data and assign to response_data.
    //console.log('response_data_end:',response_data )
    res.json(response_data)
})

app.get("/api_friend_profile", async (req, res) => {

    const my_username = req.user.username
    let post_data=''
    let friend_info=''
    const UserName = req.query.UserName
    let friend = false
  
    await UserInfo.findOne({user_name: UserName},(err, UserInfos)=>{
        try {
            friend_info=UserInfos
            linked_social_media=UserInfos.linked_social_media
            post_data=UserInfos.post_data   
            //console.log("post_data",post_data)
        } catch(e){
            console.log(e)
        }
    })

    await UserInfo.findOne({user_name: my_username},(err, UserInfos)=>{
        try {
            if (UserInfos.following.includes(UserName)){
                friend=true
            }
        } catch(e){
            console.log(e)
        }
    })

    //FILTER POST DATA to send back to client, based on platform user selected in frontend
    //console.log("req.query.platform_name_array:", req.query.platform_name_array)
    let filtered_post_data=post_data.slice()
    if (req.query.platform_name_array!==undefined) {
        filtered_post_data=post_data.filter(element=>{
           if (req.query.platform_name_array.includes(element.source)){
               return true
           }
        })
    }

    //send back response_data which consists of user_info and filtered_post_data as post_data
    const response_data={
        "friend_info" : friend_info,
        "post_data" : filtered_post_data, //return the filtered data based on platform selected
        "linked_social_media": linked_social_media, //return linked_platform name
        friend: friend
    }
    //console.log("in get_my_profile:", user_info)
    //console.log("linked_social_media:",linked_social_media)
    res.json(response_data)
})

app.get("/api_followers", async (req, res) => {
    let follower_list = [], following_list = [], ret = []
    const UserName = req.query.UserName

    // find user object in database and extract its follower array
    await UserInfo.findOne({user_name: UserName}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower_list = result.follower 
            following_list = result.following           
        }
    })

    // retrieve extended user info from database
    for (let i = 0; i < follower_list.length; i ++) {
        await UserInfo.findOne({user_name: follower_list[i]}, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                ret.push({
                    user_name: result.user_name, 
                    bio: result.bio,
                    user_photo: result.user_photo, 
                    // dynamically decide the action based on the following status
                    action: following_list.includes(result.user_name) ? "Unfollow" : "Follow"
                })
            }
        })
    }

    console.log("Follower info\n: ", ret)
    res.json(ret)
})

app.get("/api_followings", async (req, res) => {
    let follower_list = [], following_list = [], ret = []
    const UserName = req.query.UserName

    // find user object in database and extract its follower array
    await UserInfo.findOne({user_name: UserName}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            follower_list = result.follower 
            following_list = result.following           
        }
    })

    // retrieve extended user info from database
    for (let i = 0; i < following_list.length; i ++) {
        await UserInfo.findOne({user_name: following_list[i]}, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                ret.push({
                    user_name: result.user_name, 
                    bio: result.bio,
                    user_photo: result.user_photo, 
                    action: "Unfollow"
                })
            }
        })
    }

    console.log("Following info\n: ", ret)
    res.json(ret)
})

app.get("/api_friend_suggestion", async (req, res) => {
    let ret = {}
    let unfollowed_list=[]//list of user who is not followed by me
    let following_list
    const my_username = req.user.username
    const search_name = req.query.search_name
    console.log("search_name: ", search_name, " <---")

    await UserInfo.find((err, UserInfos)=>{
        try {
            user_info=UserInfos
            unfollowed_list=user_info.filter((item)=>{
                if (!item.follower.includes(my_username)){
                    return true
                }
            })
            unfollowed_list=unfollowed_list.filter((item)=>{
                if (item.user_name!==my_username){
                    return true
                }
            })

            // if searching by name, one more filtering
            if (search_name !== '' && search_name !== undefined) {
                unfollowed_list=unfollowed_list.filter((item)=>{
                        return item.user_name === search_name
                    }
                )
            }

            following_list=user_info.filter((item)=>{
                if (item.follower.includes(my_username)){
                    return true
                }
            })
        } catch(e){
            console.log(e)
        }
    })

    //console.log(unfollowed_list)
    ret.unfollowed_list=(unfollowed_list !== undefined) ? unfollowed_list : []
    ret.following_list=(following_list !== undefined) ? following_list : []

    res.json(ret)
})

app.get("/get_add_friend", async (req, res) => {
    const clicked_follow_username=req.query.clicked_follow_username
    console.log("clicked_follow_username",clicked_follow_username)
    //when user click a people to follow in front-end. the
    const my_username = req.user.username
    await UserInfo.findOne({user_name: my_username},async (err, UserInfos)=>{
        try {
            user_info=UserInfos
            following_list=user_info.following
            if(!following_list.includes(clicked_follow_username)){
                following_list.push(clicked_follow_username)
                user_info.following_number++
            }
            await UserInfos.save(function(saveErr, saveUserInfos) {
                if(err){
                    console.log('error saving following')
                }
            });   
        } catch(e){
            console.log(e)
        }
    })

    await UserInfo.findOne({user_name: clicked_follow_username},async (err, UserInfos)=>{
        try {
            user_info=UserInfos
            follower_list=user_info.follower
            if(!follower_list.includes(my_username)){
                follower_list.push(my_username)
                user_info.follower_number++
            }
            await UserInfos.save(function(saveErr, saveUserInfos) {
                if(err){
                    console.log('error saving adding a following')
                }
            });   
        } catch(e){
            console.log(e)
        }
    })
})

app.get("/get_remove_friend", async (req, res) => {
    const clicked_unfollow_username=req.query.clicked_unfollow_username
    console.log("clicked_unfollow_username",clicked_unfollow_username)

    const my_username = req.user.username
    console.log(my_username)
    await UserInfo.findOne({user_name: my_username},async (err, UserInfos)=>{
        try {
            console.log("here")
            user_info=UserInfos
            following_list=user_info.following.slice()
            console.log("following_list",following_list)
            if(following_list.includes(clicked_unfollow_username)){
                user_info.following=following_list.filter(item=>{
                    if(item!==clicked_unfollow_username){
                        console.log("start",item)
                        return true
                    }
                    user_info.following=following_list.slice()
                    console.log(following_list)
                    console.log(user_info.following)
                })
                user_info.following_number--
            }
            await UserInfos.save(function(saveErr, saveUserInfos) {
                if(err){
                    console.log('error saving deleteing a following')
                }
            });   
        } catch(e){
            console.log(e)
        }
    })
    await UserInfo.findOne({user_name: clicked_unfollow_username},async (err, UserInfos)=>{
        try {
            user_info=UserInfos
            follower_list=user_info.follower.slice()
            console.log(follower_list)
            if(follower_list.includes(my_username)){
                user_info.follower=follower_list.filter(item=>{
                    if(item!==my_username){
                        return true
                    }
                })
                user_info.follower_number--
            }
            await UserInfos.save(function(saveErr, saveUserInfos) {
                if(err){
                    console.log('error saving deleting a following')
                }
            });   
        } catch(e){
            console.log(e)
        }
    })
})

app.get("/api_being_liked", async (req, res) => {
    let ret = {}

    // retrieve user info from database
    UserInfo.findOne({user_name: req.user.username}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract being liked history
            ret = result.others_liked_history
            console.log(ret)
            res.json(ret)
        }
    })
})

app.get("/api_being_mentioned", async (req, res) => {
    let ret = {}

    // retrieve data from database
    UserInfo.findOne({user_name: req.user.username}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            // extract mentioned history
            ret = result.others_mentioned_history
            console.log(ret)
            res.json(ret)
        }
    })
})

app.get("/api_liked_history", async (req, res) => {
    let ret = {}
    const username = req.user.username

    // retrieve liked history from database and return to front-end
    UserInfo.findOne({user_name: username}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            ret = result.my_like_history
            console.log("Me/Liked-History: ", ret)
            res.json(ret)
        }
    })
})

app.get("/api_message", async (req, res) => {
    let ret

    // fetch current user name from req.session.user
    const current_user = req.user.username
    // find all chatrooms that this current user is in
    Chatroom.find({
        participants: current_user
    })
    .exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            ret = result
            res.json(ret)
        }     
    }) 
})

app.get("/api_chat_messages", async (req, res) => {
    let ret = {}
    const roomID = req.query.roomID

    console.log("/api_chat_messages", roomID)

    Chatroom.find({_id: roomID})
    .exec((err, result) => {
        if (err) {
            console.log(err)
        } else {
            ret = result[0]
            console.log(ret)
            res.json(ret)
        }
    })
})

app.post("/api_send_new_message", async (req, res) => {
    let currentdate = new Date()
    const newMessage = req.body.text
    const roomID = req.body.roomID
    const self_userimg = req.body.userimg
    console.log(newMessage, roomID)

    // generate a date string in pretty format
    const message_date = currentdate.getFullYear() + "/"
                         + (currentdate.getMonth() + 1)  + "/" 
                         + currentdate.getDate() + " "  
                         + currentdate.getHours() + ":"  
                         + currentdate.getMinutes() + ":" 
                         + currentdate.getSeconds();

    console.log(message_date)

    // find the chat room, and then add the new message to message history
    Chatroom.findOne({_id: roomID}, (err, result) => {
        result.message_history.push({
            userimg: self_userimg, 
            username: req.user.username, 
            time: message_date, 
            content: newMessage
        })
        console.log(result)
        // save the update
        result.save((err) => {
            if (err) {
                console.log(err)
            }
        })
        res.send("Sent")
    })
})

app.get("/api_create_new_chat_list", async (req, res) => {
    let ret = {}

    await axios
        .get(`${process.env.API_CREATE_NEW_CHAT_LIST}?key=${process.env.API_CREATE_NEW_CHAT_LIST_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData = [{"username":"ccamus0","userimg":"https://robohash.org/quiaperferendisquis.jpg?size=50x50\u0026set=set1"},{"username":"krantoul1","userimg":"https://robohash.org/etquisit.jpg?size=50x50\u0026set=set1"},{"username":"omccourt2","userimg":"https://robohash.org/velitinvel.png?size=50x50\u0026set=set1"},{"username":"tbagnold3","userimg":"https://robohash.org/isteineligendi.png?size=50x50\u0026set=set1"},{"username":"tlievesley4","userimg":"https://robohash.org/quasiautenim.bmp?size=50x50\u0026set=set1"},{"username":"rstockton5","userimg":"https://robohash.org/teneturprovidentpraesentium.jpg?size=50x50\u0026set=set1"},{"username":"apetren6","userimg":"https://robohash.org/impeditporrout.png?size=50x50\u0026set=set1"},{"username":"dmcmains7","userimg":"https://robohash.org/dictapossimusquis.bmp?size=50x50\u0026set=set1"},{"username":"neuler8","userimg":"https://robohash.org/suscipitquiillum.bmp?size=50x50\u0026set=set1"},{"username":"eclemenza9","userimg":"https://robohash.org/abvoluptatemsit.jpg?size=50x50\u0026set=set1"}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_create_new_chat_roomID", async (req, res) => {
    let ret, self_userimg
    // note that this participantsList is in format of {user: [{}, {}, {}]}, where each user has username and userimg. 
    const participantsList = JSON.parse(req.query.participantsList)
    // create an array storing all participants in this chat room
    let participantsName = [req.user.username]
    participantsList.user.forEach(function (item) {
        participantsName.unshift(item.username)
    })
    console.log(participantsName)

    UserInfo.findOne({user_name: req.user.username}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            self_userimg = result.user_photo
            // check if chatroom exists
            Chatroom.findOne({participants: participantsName}, (err, result) => {
                if (!result) {
                    // check if the chatroom is personal or grouped
                    const single_user_flag = (participantsList.user.length === 1)
                    const name = single_user_flag ? [req.user.username, participantsList.user[0].username] : ["Group Chat"]
                    const avatar = single_user_flag ? [self_userimg, participantsList.user[0].userimg] : ["https://www.flaticon.com/svg/vstatic/svg/681/681494.svg?token=exp=1617521792~hmac=4643d292f0f6a8813a84b31301b89834"]
                    // create new room
                    const newChatRoom = new Chatroom({
                        chatroom_name: name,
                        chatroom_avatar: avatar,
                        participants: participantsName
                    })
                    // save to database
                    newChatRoom.save((err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    ret = newChatRoom._id
                    res.json(ret)
                } else {
                    ret = result._id
                    res.json(ret)
                }
            })  
        }
    })
})

app.get("/api_getprelogin", async (req, res, next) => {
    let ret = {}

    await axios
        .get(`${process.env.API_PRELOGIN}?key=${process.env.API_PRELOGIN_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData =  [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"Claire","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}]
            ret = backupData
        })
    res.json(ret)
})
   
app.get("/api_getprelogin_recommended", async (req, res, next) => {
    let ret = {}

    await axios
        .get(`${process.env.API_PRELOGIN_RECOMMEND}?key=${process.env.API_PRELOGIN_RECOMMEND_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
           const backupData =  [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"Claire","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}]
            ret = backupData
        })
    res.json(ret)
})

app.get("/api_getprelogin_recent", async (req, res, next) => {
    let ret = {}

    await axios
        .get(`${process.env.API_PRELOGIN_RECENT}?key=${process.env.API_PRELOGIN_RECENT_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData =  [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"Claire","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}]
            ret = backupData
        })

    res.json(ret)
})

/* 
Please notice that the following three Mockaroo APIs are intentionally disabled because they are missing important field
So, use backup data instead
*/
app.get("/api_whatsnew", async (req, res, next) => {
    let post_data = []
    
    await axios
        .get(`${process.env.API_LOGIN_WHATSNEW}?key=${process.env.API_LOGIN_WHATSNEW_KEY}_`)
        .then(apiResponse => post_data = apiResponse.data)
        .catch((err) => {
            //console.log(err)
            const backupData =  [{"source":"O-Zone","userimg":"https://robohash.org/etconsequaturenim.png?size=50x50\u0026set=set1","UserName":"mslee0","content":"In congue. Etiam justo. Etiam pretium iaculis justo.","Senttime":"10/23/2020","contentimg":"http://dummyimage.com/164x193.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/exercitationemculpalibero.png?size=50x50\u0026set=set1","UserName":"ejacks1","content":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.","Senttime":"8/27/2020","contentimg":"http://dummyimage.com/223x286.png/cc0000/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/rerumeumharum.png?size=50x50\u0026set=set1","UserName":"cpeery2","content":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.","Senttime":"7/2/2020","contentimg":"http://dummyimage.com/206x170.png/cc0000/ffffff"},{"source":"O-Zone","userimg":"https://robohash.org/estmollitiaeum.png?size=50x50\u0026set=set1","UserName":"klomax3","content":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.","Senttime":"2/8/2021","contentimg":"http://dummyimage.com/237x203.png/dddddd/000000"},{"source":"O-Zone","userimg":"https://robohash.org/estquoquis.png?size=50x50\u0026set=set1","UserName":"hbrazelton4","content":"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.","Senttime":"11/28/2020","contentimg":"http://dummyimage.com/145x171.png/ff4444/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/officiisaccusamusnulla.png?size=50x50\u0026set=set1","UserName":"tsimak5","content":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.","Senttime":"2/2/2021","contentimg":"http://dummyimage.com/229x279.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/etautaliquid.png?size=50x50\u0026set=set1","UserName":"bbarff6","content":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.","Senttime":"3/9/2021","contentimg":"http://dummyimage.com/144x292.png/dddddd/000000"},{"source":"Instagram","userimg":"https://robohash.org/etomnisreiciendis.png?size=50x50\u0026set=set1","UserName":"gsmees7","content":"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.","Senttime":"12/30/2020","contentimg":"http://dummyimage.com/239x274.png/ff4444/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/nesciuntquiaut.png?size=50x50\u0026set=set1","UserName":"mdodds8","content":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","Senttime":"10/27/2020","contentimg":"http://dummyimage.com/197x285.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/sitaccusantiummagnam.png?size=50x50\u0026set=set1","UserName":"nmacadam9","content":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.","Senttime":"10/21/2020","contentimg":"http://dummyimage.com/122x127.png/ff4444/ffffff"}]
            post_data = backupData
            
        })
    let filtered_post_data=post_data.slice()
   
    //console.log("selected_social_media",selected_social_media)
    filtered_post_data=post_data.filter(element=>{
        if (selected_social_media.includes(element.source)){
            return true
        }//end of if
    })//end of filtered_post_data

     // console.log("filtered_post_data", filtered_post_data)

    res.json(filtered_post_data)
})

app.get("/api_recommended", async (req, res, next) => {
    let post_data = []
    
    await axios
        .get(`${process.env.API_LOGIN_RECOMMENT}?key=${process.env.API_LOGIN_RECOMMEND_KEY}_`)
        .then(apiResponse => post_data = apiResponse.data)
        .catch((err) => {
            //console.log(err)
            const backupData = [{"source":"Facebook","userimg":"https://robohash.org/enimreprehenderitmagnam.png?size=50x50\u0026set=set1","UserName":"sguisot0","content":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.","Senttime":"1/18/2021","contentimg":"http://dummyimage.com/236x100.png/5fa2dd/ffffff"},{"source":"O-Zone","userimg":"https://robohash.org/estilloin.png?size=50x50\u0026set=set1","UserName":"naiken1","content":"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.","Senttime":"1/14/2021","contentimg":"http://dummyimage.com/159x187.png/dddddd/000000"},{"source":"Twitter","userimg":"https://robohash.org/voluptatemitaquequaerat.png?size=50x50\u0026set=set1","UserName":"cjones2","content":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.","Senttime":"1/9/2021","contentimg":"http://dummyimage.com/172x241.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/rerumpariaturvel.png?size=50x50\u0026set=set1","UserName":"cderl3","content":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.","Senttime":"7/18/2020","contentimg":"http://dummyimage.com/112x127.png/dddddd/000000"},{"source":"Twitter","userimg":"https://robohash.org/ipsaoditodio.png?size=50x50\u0026set=set1","UserName":"zlinny4","content":"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.","Senttime":"4/16/2020","contentimg":"http://dummyimage.com/214x300.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/quosquidemcorporis.png?size=50x50\u0026set=set1","UserName":"nquilty5","content":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.","Senttime":"2/24/2021","contentimg":"http://dummyimage.com/184x278.png/ff4444/ffffff"},{"source":"O-Zone","userimg":"https://robohash.org/autnisisit.png?size=50x50\u0026set=set1","UserName":"cyewdale6","content":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.","Senttime":"7/11/2020","contentimg":"http://dummyimage.com/248x209.png/dddddd/000000"},{"source":"Twitter","userimg":"https://robohash.org/quaeutsint.png?size=50x50\u0026set=set1","UserName":"sissacoff7","content":"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.","Senttime":"8/8/2020","contentimg":"http://dummyimage.com/214x127.png/5fa2dd/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/eossimiliquenihil.png?size=50x50\u0026set=set1","UserName":"fdrysdall8","content":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.","Senttime":"3/14/2021","contentimg":"http://dummyimage.com/231x100.png/ff4444/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/exdistinctiovoluptatibus.png?size=50x50\u0026set=set1","UserName":"rgillino9","content":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.","Senttime":"6/20/2020","contentimg":"http://dummyimage.com/120x188.png/ff4444/ffffff"}]
            ret = backupData
            post_data = backupData
            
        })
    let filtered_post_data=post_data.slice()
   
    //console.log("selected_social_media",selected_social_media)
    filtered_post_data=post_data.filter(element=>{
        if (selected_social_media.includes(element.source)){
            return true
        }//end of if
    })//end of filtered_post_data

    //console.log("filtered_post_data", filtered_post_data)

    res.json(filtered_post_data)
})

app.get("/api_recent", async (req, res, next) => {
    let post_data = []
    
    await axios
        .get(`${process.env.API_LOGIN_RECNET}?key=${process.env.API_LOGIN_RECENT_KEY}_`)
        .then(apiResponse => post_data = apiResponse.data)
        .catch((err) => {
            //console.log(err)
            const backupData =  [{"source":"Facebook","userimg":"https://robohash.org/placeatetsapiente.png?size=50x50\u0026set=set1","UserName":"gwaye0","content":"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.","Senttime":"11/25/2020","contentimg":"http://dummyimage.com/148x234.png/ff4444/ffffff"},{"source":"O-Zone","userimg":"https://robohash.org/quasireiciendisquia.png?size=50x50\u0026set=set1","UserName":"ashefton1","content":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.","Senttime":"9/11/2020","contentimg":"http://dummyimage.com/126x258.png/cc0000/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/tenetureaquein.png?size=50x50\u0026set=set1","UserName":"mpetters2","content":"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.","Senttime":"1/7/2021","contentimg":"http://dummyimage.com/139x218.png/cc0000/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/nonvelitaccusamus.png?size=50x50\u0026set=set1","UserName":"gdobbson3","content":"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.","Senttime":"12/19/2020","contentimg":"http://dummyimage.com/238x109.png/dddddd/000000"},{"source":"Facebook","userimg":"https://robohash.org/exdistinctioaccusantium.png?size=50x50\u0026set=set1","UserName":"mlomath4","content":"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.","Senttime":"5/26/2020","contentimg":"http://dummyimage.com/203x133.png/cc0000/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/accusantiumautquod.png?size=50x50\u0026set=set1","UserName":"emolson5","content":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.","Senttime":"9/16/2020","contentimg":"http://dummyimage.com/143x200.png/dddddd/000000"},{"source":"Instagram","userimg":"https://robohash.org/deseruntconsequunturest.png?size=50x50\u0026set=set1","UserName":"ehaville6","content":"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.","Senttime":"1/27/2021","contentimg":"http://dummyimage.com/138x210.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/sedeavoluptatum.png?size=50x50\u0026set=set1","UserName":"elarkin7","content":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.","Senttime":"10/21/2020","contentimg":"http://dummyimage.com/169x206.png/dddddd/000000"},{"source":"Facebook","userimg":"https://robohash.org/fugautut.png?size=50x50\u0026set=set1","UserName":"rmilhench8","content":"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.","Senttime":"6/18/2020","contentimg":"http://dummyimage.com/111x162.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/numquamquaein.png?size=50x50\u0026set=set1","UserName":"hizkoveski9","content":"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","Senttime":"3/25/2021","contentimg":"http://dummyimage.com/177x232.png/5fa2dd/ffffff"}]
            post_data = backupData
            
        })
    let filtered_post_data=post_data.slice()
   
    //console.log("selected_social_media",selected_social_media)
    filtered_post_data=post_data.filter(element=>{
        if (selected_social_media.includes(element.source)){
            return true
        }//end of if
    })//end of filtered_post_data

    //console.log("filtered_post_data", filtered_post_data)

    res.json(filtered_post_data)
})

app.get("/api_search_recommended", async(req, res) => {
    let ret = []

    await axios
        .get(`${process.env.API_SEARCH_RECOMMENDED}?key=${process.env.API_SEARCH_RECOMMENDED_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            //console.log(err)
            const backupData = [{"topic":"hot topic #6"},{"topic":"hot topic #35"},{"topic":"hot topic #33"},{"topic":"hot topic #25"},{"topic":"hot topic #876"},{"topic":"hot topic #4"},{"topic":"hot topic #72"},{"topic":"hot topic #535"},{"topic":"hot topic #153"},{"topic":"hot topic #336"}
            ]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_trending", async(req, res) => {
    let ret = []

    await axios
        .get(`${process.env.API_TRENDING}?key=${process.env.API_TRENDING_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            //console.log(err)
            const backupData = [{"topic":"hot topic #699"},{"topic":"hot topic #0"},{"topic":"hot topic #3"},{"topic":"hot topic #422"},{"topic":"hot topic #78"},{"topic":"hot topic #34"},{"topic":"hot topic #2"},{"topic":"hot topic #435"},{"topic":"hot topic #3"},{"topic":"hot topic #94"}
            ]
            ret = backupData
        })
        
    res.json(ret)
})

app.get("/api_search_result", async(req, res) => {
    let ret = {}
    const tag_searched = req.query.tag_searched
    
    await axios
    .get(`${process.env.API_SEARCH_RESULT}?key=${process.env.API_SEARCH_RESULT_KEY}`)
    .then(apiResponse => ret = apiResponse.data)
    .catch((err) => {
        //console.log(err)
        var backupData = [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"mgalliard0","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}
        ]
        var i;
        for(i = 0; i < backupData.length; i++){
            backupData[i].content = backupData[i].content.concat(" #HotTopic")
        }        
        ret = backupData
    })

    res.json(ret)
})

//----------------------------------------- END OF ROUTES---------------------------------------------------

// helper function, can remove anytime
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// helper function, can remove anytime
// fast hash <-- but not secure at all
function fast_hash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash &= hash
    }
    return hash
}

module.exports = app
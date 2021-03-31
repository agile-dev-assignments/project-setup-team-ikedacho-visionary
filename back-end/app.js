// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({silent:true}) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use the bodyparser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("front-end/public"))


//user_info data
const user_info={
    "id": 1,
    "user_name": "Joe",
    "user_photo": "https://robohash.org/doloremqueofficiaet.jpg?size=50x50",
    "background_picture":"https://resilientblog.co/wp-content/uploads/2019/07/sky-quotes.jpg",
    "post_number": "116",
    "bio":"I love cat",
    "follower_number": "500",
    "following_number": "200",
    "linked_social_media": ["Facebook","Twitter","Instagram"]
}//end of user_info

const linked_social_media= ["Facebook","Twitter","Instagram"]

//put routes here:

// route for HTTP GET requests to the home document
//I will use backup data in this version to avoid randomness of my post content caused by mockaroo and to save mockaroo day limit.

app.post('/newuser', function(req, res) {
    const newuser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation
    };

  
    // users.push(newusers);
    if(newuser.password == newuser.password_confirmation){
        res.send({
            status: "created"
        })
         // users.push(newusers);
         //res.send("created") 
    }
    else{
    res.send({
        status: "password does not match"
    })
   }
    console.log(newuser);

  });

app.get("/get_my_profile", async (req, res) => {

    //post data
    let post_data=''
    await axios
    .get(`${process.env.API_MY_PROFILE}?key=${process.env.API_MY_PROFILE_KEY}`)//'correct: `${process.env.API_MY_PROFILE}?key=${process.env.API_MY_PROFILE_KEY}`
    .then(apiResponse => {post_data = apiResponse.data}) //apiResponse.data
    //I will use backup data in this version to avoid randomness of my post content caused by mockaroo and to save mockaroo day limit.
    .catch((err) => {
        console.log("Error: cannot fetch data from mockaroo api. Use backup data")
        console.log(err)
        //backup data
        post_data =[{"id":1,"source":"Twitter","content":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.","senttime":"2/18/2021","contentimg":"http://dummyimage.com/238x249.png/cc0000/ffffff"},{"id":2,"source":"Facebook","content":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.","senttime":"2/17/2021","contentimg":"http://dummyimage.com/190x250.png/5fa2dd/ffffff"},{"id":3,"source":"Facebook","content":"Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.","senttime":"8/1/2020","contentimg":"http://dummyimage.com/187x154.png/ff4444/ffffff"},{"id":4,"source":"Instagram","content":"Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.","senttime":"12/1/2020","contentimg":"http://dummyimage.com/117x277.png/dddddd/000000"},{"id":5,"source":"Twitter","content":"Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.","senttime":"11/8/2020","contentimg":"http://dummyimage.com/200x111.png/dddddd/000000"},{"id":6,"source":"Facebook","content":"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.","senttime":"4/8/2020","contentimg":"http://dummyimage.com/204x133.png/dddddd/000000"},{"id":7,"source":"Twitter","content":"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.","senttime":"2/13/2021","contentimg":"http://dummyimage.com/184x147.png/ff4444/ffffff"},{"id":8,"source":"Twitter","content":"Nullam porttitor lacus at turpis.","senttime":"8/6/2020","contentimg":"http://dummyimage.com/163x149.png/5fa2dd/ffffff"},{"id":9,"source":"Facebook","content":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.","senttime":"12/29/2020","contentimg":"http://dummyimage.com/182x256.png/ff4444/ffffff"},{"id":10,"source":"Instagram","content":"Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.","senttime":"4/27/2020","contentimg":"http://dummyimage.com/182x193.png/dddddd/000000"}]//end of backup data
        //console.log("backup data:", post_data)
    })//end of catch,axios,post_data

    //FILTER POST DATA to send back to client, based on platform user selected in frontend
    //console.log("req.query.platform_name_array:", req.query.platform_name_array)
    let filtered_post_data=post_data.slice()
    if (req.query.platform_name_array!==undefined) {
        //console.log("111111")
        filtered_post_data=post_data.filter(element=>{
           if (req.query.platform_name_array.includes(element.source)){
               return true
           }//end of if
        })//end of filtered_post_data

    }//end of if

    //send back response_data which consists of user_info and filtered_post_data as post_data
    const response_data={
        "user_info" : user_info,
        "post_data" : filtered_post_data, //return the filtered data based on platform selected
        "linked_social_media": user_info.linked_social_media,//return linked_platform name
    }
    //console.log("in get_my_profile:", user_info)
    console.log("linked_social_media:",linked_social_media)
    res.json(response_data)

})

// it tell multer to save uploaded files to disk into a directory named public/uploads, with a filename based on the current time.
// the file storage rule function referred by a varibale called storage will be used later as parameter when we initiated a multer object.
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
app.post("/post_background_picture", upload_background_picture.array("background_picture", 1), (req, res) => {

    // check whether anything was uploaded. If success, send a response back. I will re-render my_profile page with background picture added in this case.
    if (req.files) {
        // success! send data back to the client, e.g. some JSON data
        // do something with the data we received from the client
        console.log("success! req.files")
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

        user_info.background_picture=`/uploads/${data.background_picture[0].filename}`
        console.log(`path:${data.background_picture[0].path}`) //'public/uploads/background_picture-1616975456180'
        console.log("user_info after req.files:",user_info)
        res.redirect('/my_profile') //redirect to my_proile page

    }//end of if

    else{//if no file is uploaded, the submit button cannot send request.
        console.log("error! req.files")
        res.redirect('/my_profile')
    }   
})

app.get("/api_my_comment_history", async (req, res)  => {
    let response_data=''
    
    //without async and await, axios block will execute after res.json(response_data) which will send incorrect data back to front-end. It is because I already declared and assigned value to the variable response_data above.
    await axios 
        .get(`${process.env.API_MY_COMMENT_HISTOR}?key=${process.env.API_MY_COMMENT_HISTORY_KEY}`)//`Here, I intentionally misspell the variable to use backup data. Correct: ${process.env.API_MY_COMMENT_HISTORY}?key=${process.env.API_MY_COMMENT_HISTORY_KEY}`
        .then(apiResponse => {response_data = apiResponse.data})//apiResponse.data 
        .catch((err) => {
            console.log("Error: cannot fetch data from mockaroo api. Use backup data")
            console.log(err)
            //backup data
            response_data = [{"id":1,"post_created_by":"sgosart0","post_text":"Nunc purus. Phasellus in felis. Donec semper sapien a libero.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","commented_date":"12/23/2020","commented_content":"In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."},{"id":2,"post_created_by":"dvellacott1","post_text":"Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","commented_date":"2/14/2021","commented_content":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."},{"id":3,"post_created_by":"alowndsbrough2","post_text":"Nam dui.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","commented_date":"8/15/2020","commented_content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue."},{"id":4,"post_created_by":"swoodstock3","post_text":"Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","commented_date":"6/30/2020","commented_content":"Phasellus in felis. Donec semper sapien a libero. Nam dui."},{"id":5,"post_created_by":"riacopini4","post_text":"In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","commented_date":"5/29/2020","commented_content":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum."},{"id":6,"post_created_by":"kfraniak5","post_text":"Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","commented_date":"9/19/2020","commented_content":"Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."},{"id":7,"post_created_by":"egyrgorcewicx6","post_text":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","commented_date":"9/24/2020","commented_content":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."},{"id":8,"post_created_by":"pvinick7","post_text":"In hac habitasse platea dictumst.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","commented_date":"9/22/2020","commented_content":"Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus."},{"id":9,"post_created_by":"abillion8","post_text":"Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","commented_date":"5/6/2020","commented_content":"Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio."},{"id":10,"post_created_by":"lmackellar9","post_text":"Quisque ut erat.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","commented_date":"1/12/2021","commented_content":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla."}]
            //console.log('backup data:',response_data)
        
        })//end of catch,axios

    //without async and await, the following code be executed before the axios block. So the response_data will be '' as I assign to it at the beginning. So the client will not receive the correct data, but only "". 
    //to avoid this problem, use async and await so that the following code will wait until axios block finish its work in which we get correct data and assign to response_data.
    //console.log('response_data_end:',response_data )
    res.json(response_data)
})

app.get("/api_friend_profile", async (req, res) => {
    let ret = {}
    // extract the UserName and userimg passed in along with the request
    const UserName = req.query.UserName
    const userimg = req.query.userimg

    /*
    The following two API requests are intentionally set to be empty because we need our Database here
    */
    // JIT retrieval of friend's info
    await axios
        .get(``)
        .then(apiResponse => ret.friend_info = apiResponse.data)
        .catch((err) => {
            const backupData = {"id": 1, "user_name": `${UserName}`, "user_photo": `${userimg}`, "post_number": "300", "bio":"studying", "follower_number": "400", "following_number": "298","linked_social_media": ["Facebook","Twitter","Instagram","Youtube","Linkedin"]}
            ret.friend_info = backupData
        })

    // JIT retrieval of friend's posts
    await axios
        .get(``)
        .then(apiResponse => ret.data = apiResponse.data)
        .catch((err) => {
            const backupData = [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"mgalliard0","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}]
            ret.posts = backupData
        })

    res.json(ret)
})

app.get("/api_followers", async (req, res) => {
    let ret = {}

    await axios
        .get(`${process.env.API_FOLLOWER_LIST}?key=${process.env.API_FOLLOWER_LIST_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"express.js follower","bio":"p v g t d W U J W w ","action":"unfollow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"unfollow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"unfollow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"unfollow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"unfollow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"unfollow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"unfollow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"unfollow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"unfollow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"unfollow"}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_followings", async (req, res) => {
    let ret = {}
    const UserName = req.query.UserName

    await axios
        .get(`${process.env.API_FOLLOWING_LIST}?key=${process.env.API_FOLLOWING_LIST_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"express.js following","bio":"p v g t d W U J W w ","action":"unfollow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"unfollow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"unfollow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"unfollow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"unfollow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"unfollow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"unfollow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"unfollow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"unfollow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"unfollow"}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_friend_suggestion", async (req, res) => {
    let ret = {}
    
    /* 
    Note that for this specific back-end API, the mockaroo API was intentionally disabled 
    Because we need Database to actually retrieve the searched result
    Therefore hardcoded mock data are used
    */
    await axios
        .get(`${process.env.API_FRIEND_SUGGESTION}?key=${process.env.API_FRIEND_SUGGESTION_KEY}_NOT-USING`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData_suggestion = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"express.js friend_suggestion","bio":"p v g t d W U J W w ","action":"follow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"follow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"follow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"follow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"follow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"follow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"follow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"follow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"follow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"follow"}]
            const backupData_searched = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName": `${req.query.search_name}`,"bio":"p v g t d W U J W w ","action":"follow"}]
            ret = (req.query.search_name == "" || req.query.search_name == undefined) ? backupData_suggestion : backupData_searched
        })

    res.json(ret)
})

app.get("/api_being_liked", async (req, res) => {
    let ret = {}

    await axios
        .get(`${process.env.API_BEING_LIKED}?key=${process.env.API_BEING_LIKED_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData = [{"id":1,"post_text":"Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"10/31/2020","liked_by_username":"Express.js like_history","liked_by_profile_image":"https://robohash.org/sedillumquis.jpg?size=50x50\u0026set=set1","liked_date":"5/2/2020"},{"id":2,"post_text":"Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"12/21/2020","liked_by_username":"fbaterip1","liked_by_profile_image":"https://robohash.org/estdoloreest.jpg?size=50x50\u0026set=set1","liked_date":"3/16/2020"},{"id":3,"post_text":"Morbi non quam nec dui luctus rutrum.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"11/13/2020","liked_by_username":"fcopello2","liked_by_profile_image":"https://robohash.org/molestiaemaximenumquam.png?size=50x50\u0026set=set1","liked_date":"8/13/2020"},{"id":4,"post_text":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"6/8/2020","liked_by_username":"pgreenalf3","liked_by_profile_image":"https://robohash.org/corporisillumrerum.jpg?size=50x50\u0026set=set1","liked_date":"9/14/2020"},{"id":5,"post_text":"Phasellus in felis.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"12/5/2020","liked_by_username":"iseebright4","liked_by_profile_image":"https://robohash.org/inciduntuttenetur.png?size=50x50\u0026set=set1","liked_date":"11/21/2020"},{"id":6,"post_text":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"5/2/2020","liked_by_username":"gbourley5","liked_by_profile_image":"https://robohash.org/evenietconsequunturlabore.png?size=50x50\u0026set=set1","liked_date":"9/26/2020"},{"id":7,"post_text":"Nulla ut erat id mauris vulputate elementum. Nullam varius.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"4/25/2020","liked_by_username":"mutteridge6","liked_by_profile_image":"https://robohash.org/quoindignissimos.jpg?size=50x50\u0026set=set1","liked_date":"4/10/2020"},{"id":8,"post_text":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"11/23/2020","liked_by_username":"mpreece7","liked_by_profile_image":"https://robohash.org/accusantiumminimaquo.bmp?size=50x50\u0026set=set1","liked_date":"9/3/2020"},{"id":9,"post_text":"Mauris sit amet eros.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"5/14/2020","liked_by_username":"elowres8","liked_by_profile_image":"https://robohash.org/cumquenecessitatibustempore.bmp?size=50x50\u0026set=set1","liked_date":"4/29/2020"},{"id":10,"post_text":"Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","post_date":"11/11/2020","liked_by_username":"aclarridge9","liked_by_profile_image":"https://robohash.org/quiasequirepellat.png?size=50x50\u0026set=set1","liked_date":"1/22/2021"}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_being_mentioned", async (req, res) => {
    let ret = {}

    await axios
        .get(`${process.env.API_BEING_MENTIONED}?key=${process.env.API_BEING_MENTIONED_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData = [{"mentioner_avatar":"https://robohash.org/veniamrepellatsimilique.png?size=50x50\u0026set=set1","mentioner_username":"rleadley0","mentioned_date":"09/11/2020","post_image":"http://dummyimage.com/100x100.png/cc0000/ffffff","post_username":"oheigl0","post_text":"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."},{"mentioner_avatar":"https://robohash.org/excepturinullaqui.png?size=50x50\u0026set=set1","mentioner_username":"fpikhno1","mentioned_date":"11/01/2020","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"hbarrable1","post_text":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."},{"mentioner_avatar":"https://robohash.org/praesentiumquasut.png?size=50x50\u0026set=set1","mentioner_username":"amccolley2","mentioned_date":"01/26/2021","post_image":"http://dummyimage.com/100x100.png/dddddd/000000","post_username":"sdahlbom2","post_text":"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."},{"mentioner_avatar":"https://robohash.org/odioquiavero.png?size=50x50\u0026set=set1","mentioner_username":"bschnitter3","mentioned_date":"11/29/2020","post_image":"http://dummyimage.com/100x100.png/5fa2dd/ffffff","post_username":"rrymour3","post_text":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."},{"mentioner_avatar":"https://robohash.org/magniquasisapiente.png?size=50x50\u0026set=set1","mentioner_username":"ccopello4","mentioned_date":"09/14/2020","post_image":"http://dummyimage.com/100x100.png/dddddd/000000","post_username":"pmains4","post_text":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."},{"mentioner_avatar":"https://robohash.org/deseruntperspiciatisoccaecati.png?size=50x50\u0026set=set1","mentioner_username":"bvergo5","mentioned_date":"05/29/2020","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"flaraway5","post_text":"Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."},{"mentioner_avatar":"https://robohash.org/maioreseumquibusdam.png?size=50x50\u0026set=set1","mentioner_username":"ewillerson6","mentioned_date":"06/28/2020","post_image":"http://dummyimage.com/100x100.png/cc0000/ffffff","post_username":"mwhylie6","post_text":"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."},{"mentioner_avatar":"https://robohash.org/nonadipiscivel.png?size=50x50\u0026set=set1","mentioner_username":"wplayfair7","mentioned_date":"02/25/2021","post_image":"http://dummyimage.com/100x100.png/5fa2dd/ffffff","post_username":"rarnaldo7","post_text":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."},{"mentioner_avatar":"https://robohash.org/utconsequaturnam.png?size=50x50\u0026set=set1","mentioner_username":"hmckibbin8","mentioned_date":"01/28/2021","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"cloudian8","post_text":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."},{"mentioner_avatar":"https://robohash.org/similiquevoluptasassumenda.png?size=50x50\u0026set=set1","mentioner_username":"lmandrake9","mentioned_date":"06/27/2020","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"lhakeworth9","post_text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_liked_history", async (req, res) => {
    let ret = {}

    await axios
        .get(`${process.env.API_LIKE_HISTORY}?key=${process.env.API_LIKE_HISTORY_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData = [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"Express.js Liked History","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_chat_messages", async (req, res) => {
    let ret = {}
    const user_name = req.query.user_name
    const user_photo = req.query.user_photo

    /* 
    For this API, as for March 30, we still not have database yet, so I use hard coded backup data directly
    with API_CHAT_MESSAGES and API_CHAT_MESSAGES_KEY actually being empty string
    */
    await axios
        .get(`${process.env.API_CHAT_MESSAGES}?key=${process.env.API_CHAT_MESSAGES_KEY}`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData = [{"userimg": `${user_photo}`,"username": `${user_name}`,"time": "03/22/2021 11:00 AM","fromSender": true,"content": "Hi. "},{"userimg": "https://gravatar.com/avatar/412dd18bd4b3e7b5ff96752e42a767c9?s=200&d=robohash&r=x","username": "Tom","time": "03/22/2021 11:01 AM","fromSender": false,"content": "Hi there. "},{"userimg": `${user_photo}`,"username": `${user_name}`,"time": "03/22/2021 11:02 AM","fromSender": `${true}`,"content": "How are you? "},{"userimg": "https://gravatar.com/avatar/412dd18bd4b3e7b5ff96752e42a767c9?s=200&d=robohash&r=x","username": "Tom","time": "03/22/2021 2:00 PM","fromSender": false,"content": "Bye... "},{"userimg": `${user_photo}`,"username": `${user_name}`,"time": "03/22/2021 2:05 PM","fromSender": true,"content": "Ok... "}]
            ret = backupData
        })

    res.json(ret)
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
    let ret = {}

    await axios
        .get(`${process.env.API_LOGIN_WHATSNEW}?key=${process.env.API_LOGIN_WHATSNEW_KEY}_`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData =  [{"source":"Twitter","userimg":"https://robohash.org/officiisnonenim.png?size=50x50\u0026set=set1","UserName":"mgye0","content":"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.","Senttime":"4/13/2020","contentimg":"http://dummyimage.com/202x260.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/sitquiaaperiam.png?size=50x50\u0026set=set1","UserName":"cbaudy1","content":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","Senttime":"3/26/2021","contentimg":"http://dummyimage.com/180x120.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/numquamvoluptatibusvoluptatem.png?size=50x50\u0026set=set1","UserName":"dkillough2","content":"Phasellus in felis. Donec semper sapien a libero. Nam dui.","Senttime":"3/16/2021","contentimg":"http://dummyimage.com/241x123.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/suntuteaque.png?size=50x50\u0026set=set1","UserName":"emander3","content":"Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.","Senttime":"12/15/2020","contentimg":"http://dummyimage.com/243x260.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/quasquisapiente.png?size=50x50\u0026set=set1","UserName":"ktrevarthen4","content":"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.","Senttime":"8/16/2020","contentimg":"http://dummyimage.com/106x231.png/5fa2dd/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/essevoluptatemvoluptates.png?size=50x50\u0026set=set1","UserName":"scregeen5","content":"In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.","Senttime":"6/30/2020","contentimg":"http://dummyimage.com/118x202.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/voluptasporroducimus.png?size=50x50\u0026set=set1","UserName":"ncanario6","content":"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.","Senttime":"4/21/2020","contentimg":"http://dummyimage.com/154x100.png/5fa2dd/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/necessitatibusutsimilique.png?size=50x50\u0026set=set1","UserName":"tkuller7","content":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","Senttime":"2/20/2021","contentimg":"http://dummyimage.com/248x196.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/inciduntnihilharum.png?size=50x50\u0026set=set1","UserName":"xmcinility8","content":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.","Senttime":"4/6/2020","contentimg":"http://dummyimage.com/149x289.png/5fa2dd/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/assumendamolestiasculpa.png?size=50x50\u0026set=set1","UserName":"cbuse9","content":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.","Senttime":"12/5/2020","contentimg":"http://dummyimage.com/125x263.png/5fa2dd/ffffff"}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_recommended", async (req, res, next) => {
    let ret = {}

    await axios
        .get(`${process.env.API_LOGIN_RECOMMEND}?key=${process.env.API_LOGIN_RECOMMEND_KEY}_`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData =  [{"source":"Twitter","userimg":"https://robohash.org/aperiamnesciuntquasi.png?size=50x50\u0026set=set1","UserName":"hfitzsymons0","content":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","Senttime":"7/2/2020","contentimg":"http://dummyimage.com/106x298.png/ff4444/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/doloresuterror.png?size=50x50\u0026set=set1","UserName":"lgieraths1","content":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.","Senttime":"2/6/2021","contentimg":"http://dummyimage.com/161x232.png/ff4444/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/quiquiest.png?size=50x50\u0026set=set1","UserName":"mheselwood2","content":"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.","Senttime":"6/22/2020","contentimg":"http://dummyimage.com/238x289.png/5fa2dd/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/eaqueiureut.png?size=50x50\u0026set=set1","UserName":"cfearby3","content":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.","Senttime":"6/28/2020","contentimg":"http://dummyimage.com/133x134.png/ff4444/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/sintcorporisquod.png?size=50x50\u0026set=set1","UserName":"ghavock4","content":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","Senttime":"11/4/2020","contentimg":"http://dummyimage.com/164x127.png/ff4444/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/autsapienteeos.png?size=50x50\u0026set=set1","UserName":"pashbe5","content":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.","Senttime":"6/19/2020","contentimg":"http://dummyimage.com/146x150.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/temporibusquicorporis.png?size=50x50\u0026set=set1","UserName":"npinkney6","content":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.","Senttime":"3/14/2021","contentimg":"http://dummyimage.com/133x137.png/ff4444/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/odioteneturquod.png?size=50x50\u0026set=set1","UserName":"bpetrello7","content":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.","Senttime":"5/22/2020","contentimg":"http://dummyimage.com/103x168.png/5fa2dd/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/odiomodierror.png?size=50x50\u0026set=set1","UserName":"mkehoe8","content":"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.","Senttime":"2/24/2021","contentimg":"http://dummyimage.com/145x197.png/dddddd/000000"},{"source":"Instagram","userimg":"https://robohash.org/utmaximein.png?size=50x50\u0026set=set1","UserName":"rghione9","content":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.","Senttime":"5/25/2020","contentimg":"http://dummyimage.com/178x254.png/dddddd/000000"}]
            ret = backupData
        })

    res.json(ret)
})

app.get("/api_recent", async (req, res, next) => {
    let ret = {}

    await axios
        .get(`${process.env.API_LOGIN_RECENT}?key=${process.env.API_LOGIN_RECENT_KEY}_`)
        .then(apiResponse => ret = apiResponse.data)
        .catch((err) => {
            const backupData =  [{"source":"Instagram","userimg":"https://robohash.org/etetdolore.png?size=50x50\u0026set=set1","UserName":"fpetchey0","content":"In congue. Etiam justo. Etiam pretium iaculis justo.","Senttime":"4/22/2020","contentimg":"http://dummyimage.com/146x132.png/dddddd/000000"},{"source":"Instagram","userimg":"https://robohash.org/utmolestiaequi.png?size=50x50\u0026set=set1","UserName":"awhitsun1","content":"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.","Senttime":"7/23/2020","contentimg":"http://dummyimage.com/112x207.png/cc0000/ffffff"},{"source":"Twitter","userimg":"https://robohash.org/voluptasillumtenetur.png?size=50x50\u0026set=set1","UserName":"epetcher2","content":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.","Senttime":"11/21/2020","contentimg":"http://dummyimage.com/180x198.png/cc0000/ffffff"},{"source":"Instagram","userimg":"https://robohash.org/voluptasaliasnesciunt.png?size=50x50\u0026set=set1","UserName":"blipson3","content":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","Senttime":"9/19/2020","contentimg":"http://dummyimage.com/216x286.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/inarchitectotempore.png?size=50x50\u0026set=set1","UserName":"iannesley4","content":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.","Senttime":"5/9/2020","contentimg":"http://dummyimage.com/112x135.png/dddddd/000000"},{"source":"Twitter","userimg":"https://robohash.org/cupiditatequiadeserunt.png?size=50x50\u0026set=set1","UserName":"rbilovus5","content":"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.","Senttime":"10/25/2020","contentimg":"http://dummyimage.com/121x127.png/dddddd/000000"},{"source":"Instagram","userimg":"https://robohash.org/molestiaeeosquis.png?size=50x50\u0026set=set1","UserName":"kswain6","content":"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.","Senttime":"11/18/2020","contentimg":"http://dummyimage.com/134x115.png/dddddd/000000"},{"source":"Instagram","userimg":"https://robohash.org/laborumetadipisci.png?size=50x50\u0026set=set1","UserName":"mdecruze7","content":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","Senttime":"8/6/2020","contentimg":"http://dummyimage.com/207x138.png/cc0000/ffffff"},{"source":"Facebook","userimg":"https://robohash.org/estillocum.png?size=50x50\u0026set=set1","UserName":"pflann8","content":"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.","Senttime":"6/8/2020","contentimg":"http://dummyimage.com/156x233.png/dddddd/000000"},{"source":"Facebook","userimg":"https://robohash.org/magninonvoluptate.png?size=50x50\u0026set=set1","UserName":"kokell9","content":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.","Senttime":"2/3/2021","contentimg":"http://dummyimage.com/208x273.png/dddddd/000000"}]
            ret = backupData
        })

    res.json(ret)
})

// helper function, can remove anytime
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = app
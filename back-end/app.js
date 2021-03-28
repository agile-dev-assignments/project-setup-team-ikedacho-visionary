// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules


// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config() // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
var request = require('request');
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use the bodyparser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("front-end/public"))

console.log(process.env);
//put routes here:

// route for HTTP GET requests to the home document
app.get("/", (req, res) => {
    res.send("Hello!")
})

app.get("/comments", (req, res) => {
    res.send("Hello!")
});

//I will use backup data in this version to save mockaroo day limit.
app.get("/my_profile", async (req, res) => {
    //post data
    let post_data=''
    await axios
    .get(' ')//'correct api address: https://my.api.mockaroo.com/sr.json?key=2d6d6d60'.
    .then(apiResponse => {post_data = apiResponse.data}) //apiResponse.data 
    //I will use backup data in this version for save mockaroo day limit
    
    .catch((err) => {
        console.log("Error from mockaroo api. Use backup data")
        console.log
        post_data =[{"source":"Konklux",
                  "userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1",
                  "UserName":"mgalliard0",
                  "content":"Aaaahhhhhh! I do not know what to say. ",
                  "Senttime":"10/18/2020",
                  "contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"
                },{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"
                }
                ]//end of backup data
        //console.log("backup:", backup)
    }
    )//end of catch,axios,post_data

    //user_info data
    const user_info={
        "id": 1,
        "user_name": "Joe",
        "user_photo": "https://robohash.org/doloremqueofficiaet.jpg?size=50x50",
        "background_picture":"",
        "post_number": "116",
        "bio":"I love cat",
        "follower_number": "500",
        "following_number": "200",
        "linked_social_media": ["Facebook","Twitter","Instagram","TikTok"]
    }//end of user_info

    const response_data={
        "user_info" : user_info,
        "post_data" : post_data,
    }
    res.json(response_data)
        
})


app.get("/my_comment_history", (req, res,next) => {
    axios
        .get(`https://my.api.mockaroo.com/my_comment_history.json?key=a2ecc780`)
        .then(response=> res.json(response.data))
        .catch((err) => next(err))
            // temporary workaround because mockaro daily usage limit is exhausted at the moment...
})

app.get("/followers", (req, res) => {
    /* 
    NOTE THAT THIS AXIOS CODE IS TESTED TO BE WORKING
    FOR THE PURPOSE OF SAVING THE DAILY 200 LIMITS, 
    XINYU-BOT DECIDED TO USE BACKUPDATA HERE INTENTIONALLY 
    */
    const response = axios
        .get(`${process.env.API_FOLLOWER_LIST}?key=${process.env.API_FOLLOWER_LIST_KEY}`)
        //.then(response=> res.json(response.data))
        .catch((err) => {console.log(err)})

    // temporary workaround because mockaro daily usage limit is exhausted at the moment...
    const backupData = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"express.js follower","bio":"p v g t d W U J W w ","action":"unfollow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"unfollow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"unfollow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"unfollow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"unfollow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"unfollow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"unfollow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"unfollow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"unfollow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"unfollow"}
                ]

    res.json(backupData)
})

app.get("/followings", (req, res) => {
    /* 
    NOTE THAT THIS AXIOS CODE IS TESTED TO BE WORKING
    FOR THE PURPOSE OF SAVING THE DAILY 200 LIMITS, 
    XINYU-BOT DECIDED TO USE BACKUPDATA HERE INTENTIONALLY 
    */
    const response = axios
        .get(`${process.env.API_FOLLOWING_LIST}?key=${process.env.API_FOLLOWING_LIST_KEY}`)
        //.then(response => res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    // temporary workaround because mockaroo daily usage limit is exhausted at the moment...
    const backupData = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"express.js following","bio":"p v g t d W U J W w ","action":"unfollow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"unfollow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"unfollow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"unfollow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"unfollow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"unfollow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"unfollow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"unfollow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"unfollow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"unfollow"}
                ]

    res.json(backupData)
})

app.get("/friend_suggestion", (req, res) => {
    /* 
    NOTE THAT THIS AXIOS CODE IS TESTED TO BE WORKING
    FOR THE PURPOSE OF SAVING THE DAILY 200 LIMITS, 
    XINYU-BOT DECIDED TO USE BACKUPDATA HERE INTENTIONALLY 
    */
    const response = axios
        .get(`${process.env.API_FRIEND_SUGGESTION}?key=${process.env.API_FRIEND_SUGGESTION_KEY}`)
        //.then(response => res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    // temporary workaround because mockaro daily usage limit is exhausted at the moment...
    // NOTE THAT THIS IS JUST A TEMPORARY SOLUTION FOR THE MOCKAROO LIMIT
    const backupData_suggestion = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"express.js friend_suggestion","bio":"p v g t d W U J W w ","action":"follow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"follow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"follow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"follow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"follow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"follow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"follow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"follow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"follow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"follow"}
                ]
    const backupData_searched = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName": `${req.query.search_name}`,"bio":"p v g t d W U J W w ","action":"follow"}
                ]

    const ret = {
        result: (req.query.search_name == "" || req.query.search_name == undefined) ? backupData_suggestion : backupData_searched,
    }

    res.json(ret)
})

// feel free to change API name, since this is an arbitrary choose of name by Xinyu-bot
app.get("/being_liked", (req, res) => {
    /* 
    NOTE THAT THIS AXIOS CODE IS TESTED TO BE WORKING
    FOR THE PURPOSE OF SAVING THE DAILY 200 LIMITS, 
    XINYU-BOT DECIDED TO USE BACKUPDATA HERE INTENTIONALLY 
    */
    const response = axios
        .get(`${process.env.API_BEING_LIKED}?key=${process.env.API_BEING_LIKED_KEY}`)
        //.then(response => res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    // temporary workaround because mockaro daily usage limit is exhausted at the moment...
    // NOTE THAT THIS IS JUST A TEMPORARY SOLUTION FOR THE MOCKAROO LIMIT
    const backupData = [{"id":1,"post_text":"Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"10/31/2020","liked_by_username":"Express.js like_history","liked_by_profile_image":"https://robohash.org/sedillumquis.jpg?size=50x50\u0026set=set1","liked_date":"5/2/2020"},{"id":2,"post_text":"Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"12/21/2020","liked_by_username":"fbaterip1","liked_by_profile_image":"https://robohash.org/estdoloreest.jpg?size=50x50\u0026set=set1","liked_date":"3/16/2020"},{"id":3,"post_text":"Morbi non quam nec dui luctus rutrum.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"11/13/2020","liked_by_username":"fcopello2","liked_by_profile_image":"https://robohash.org/molestiaemaximenumquam.png?size=50x50\u0026set=set1","liked_date":"8/13/2020"},{"id":4,"post_text":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"6/8/2020","liked_by_username":"pgreenalf3","liked_by_profile_image":"https://robohash.org/corporisillumrerum.jpg?size=50x50\u0026set=set1","liked_date":"9/14/2020"},{"id":5,"post_text":"Phasellus in felis.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"12/5/2020","liked_by_username":"iseebright4","liked_by_profile_image":"https://robohash.org/inciduntuttenetur.png?size=50x50\u0026set=set1","liked_date":"11/21/2020"},{"id":6,"post_text":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"5/2/2020","liked_by_username":"gbourley5","liked_by_profile_image":"https://robohash.org/evenietconsequunturlabore.png?size=50x50\u0026set=set1","liked_date":"9/26/2020"},{"id":7,"post_text":"Nulla ut erat id mauris vulputate elementum. Nullam varius.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"4/25/2020","liked_by_username":"mutteridge6","liked_by_profile_image":"https://robohash.org/quoindignissimos.jpg?size=50x50\u0026set=set1","liked_date":"4/10/2020"},{"id":8,"post_text":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"11/23/2020","liked_by_username":"mpreece7","liked_by_profile_image":"https://robohash.org/accusantiumminimaquo.bmp?size=50x50\u0026set=set1","liked_date":"9/3/2020"},{"id":9,"post_text":"Mauris sit amet eros.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"5/14/2020","liked_by_username":"elowres8","liked_by_profile_image":"https://robohash.org/cumquenecessitatibustempore.bmp?size=50x50\u0026set=set1","liked_date":"4/29/2020"},{"id":10,"post_text":"Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","post_date":"11/11/2020","liked_by_username":"aclarridge9","liked_by_profile_image":"https://robohash.org/quiasequirepellat.png?size=50x50\u0026set=set1","liked_date":"1/22/2021"}
                ]

    res.json(backupData)
})

// feel free to change API name, since this is an arbitrary choose of name by Xinyu-bot
app.get("/being_mentioned", (req, res) => {
    /* 
    NOTE THAT THIS AXIOS CODE IS TESTED TO BE WORKING
    FOR THE PURPOSE OF SAVING THE DAILY 200 LIMITS, 
    XINYU-BOT DECIDED TO USE BACKUPDATA HERE INTENTIONALLY 
    */
    const response = axios
        .get(`${process.env.API_BEING_MENTIONED}?key=${process.env.API_BEING_MENTIONED_KEy}`)
        //.then(response => res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    // temporary workaround because mockaro daily usage limit is exhausted at the moment...
    // NOTE THAT THIS IS JUST A TEMPORARY SOLUTION FOR THE MOCKAROO LIMIT        
    const backupData = [{"mentioner_avatar":"https://robohash.org/veniamrepellatsimilique.png?size=50x50\u0026set=set1","mentioner_username":"rleadley0","mentioned_date":"09/11/2020","post_image":"http://dummyimage.com/100x100.png/cc0000/ffffff","post_username":"oheigl0","post_text":"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."},{"mentioner_avatar":"https://robohash.org/excepturinullaqui.png?size=50x50\u0026set=set1","mentioner_username":"fpikhno1","mentioned_date":"11/01/2020","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"hbarrable1","post_text":"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."},{"mentioner_avatar":"https://robohash.org/praesentiumquasut.png?size=50x50\u0026set=set1","mentioner_username":"amccolley2","mentioned_date":"01/26/2021","post_image":"http://dummyimage.com/100x100.png/dddddd/000000","post_username":"sdahlbom2","post_text":"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."},{"mentioner_avatar":"https://robohash.org/odioquiavero.png?size=50x50\u0026set=set1","mentioner_username":"bschnitter3","mentioned_date":"11/29/2020","post_image":"http://dummyimage.com/100x100.png/5fa2dd/ffffff","post_username":"rrymour3","post_text":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."},{"mentioner_avatar":"https://robohash.org/magniquasisapiente.png?size=50x50\u0026set=set1","mentioner_username":"ccopello4","mentioned_date":"09/14/2020","post_image":"http://dummyimage.com/100x100.png/dddddd/000000","post_username":"pmains4","post_text":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."},{"mentioner_avatar":"https://robohash.org/deseruntperspiciatisoccaecati.png?size=50x50\u0026set=set1","mentioner_username":"bvergo5","mentioned_date":"05/29/2020","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"flaraway5","post_text":"Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."},{"mentioner_avatar":"https://robohash.org/maioreseumquibusdam.png?size=50x50\u0026set=set1","mentioner_username":"ewillerson6","mentioned_date":"06/28/2020","post_image":"http://dummyimage.com/100x100.png/cc0000/ffffff","post_username":"mwhylie6","post_text":"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."},{"mentioner_avatar":"https://robohash.org/nonadipiscivel.png?size=50x50\u0026set=set1","mentioner_username":"wplayfair7","mentioned_date":"02/25/2021","post_image":"http://dummyimage.com/100x100.png/5fa2dd/ffffff","post_username":"rarnaldo7","post_text":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."},{"mentioner_avatar":"https://robohash.org/utconsequaturnam.png?size=50x50\u0026set=set1","mentioner_username":"hmckibbin8","mentioned_date":"01/28/2021","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"cloudian8","post_text":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."},{"mentioner_avatar":"https://robohash.org/similiquevoluptasassumenda.png?size=50x50\u0026set=set1","mentioner_username":"lmandrake9","mentioned_date":"06/27/2020","post_image":"http://dummyimage.com/100x100.png/ff4444/ffffff","post_username":"lhakeworth9","post_text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis."}
                ]

    res.json(backupData)
})

// feel free to change API name, since this is an arbitrary choose of name by Xinyu-bot
// Please check front-end/src/me/Liked.js for important info about this API
app.get("/liked_history", (req, res) => {
    /* 
    NOTE THAT THIS AXIOS CODE IS TESTED TO BE WORKING
    FOR THE PURPOSE OF SAVING THE DAILY 200 LIMITS, 
    XINYU-BOT DECIDED TO USE BACKUPDATA HERE INTENTIONALLY 
    */
    const response = axios
        .get(`${process.env.API_LIKE_HISTORY}?key=${process.env.API_LIKE_HISTORY_KEY}`)
        //.then(response => res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    const backupData = [{"source":"Konklux","userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1","UserName":"Express.js Liked History","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"10/18/2020","contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"}
                ]
    
    // temporary workaround because mockaro daily usage limit is exhausted at the moment...
    // NOTE THAT THIS IS JUST A TEMPORARY SOLUTION FOR THE MOCKAROO LIMIT                
    res.json(backupData)
})


app.get("/getprelogin", (req, res,next) => {

    const response = axios
    .get(`${process.env.API_PRELOGIN}?key=${process.env.API_PRELOGIN_KEY}`)
    //.then(response=> res.json(response.data))
    .catch((err) => {console.log(err)})

// temporary workaround because mockaro daily usage limit is exhausted at the moment...
const backupData = [{"source":"backupPlatform",
"userimg":"https://robohash.org/laboriosamaliquamconsequuntur.jpg?size=50x50\u0026set=set1",
"UserName":"mgalliard0",
"content":"Aaaahhhhhh! I do not know what to say. ",
"Senttime":"10/18/2020",
"contentimg":"http://dummyimage.com/112x136.jpg/cc0000/ffffff"
},{"source":"Domainer","userimg":"https://robohash.org/utculpaesse.png?size=50x50\u0026set=set1","UserName":"hrevie1","content":"Aaaahhhhhhhhhhh! I do not know what to say. ","Senttime":"4/15/2020","contentimg":"http://dummyimage.com/228x124.bmp/cc0000/ffffff"},{"source":"Ventosanzap","userimg":"https://robohash.org/etquosa.bmp?size=50x50\u0026set=set1","UserName":"avedenisov2","content":"Aaaahhhhh! I do not know what to say. ","Senttime":"2/5/2021","contentimg":"http://dummyimage.com/107x217.jpg/5fa2dd/ffffff"},{"source":"Lotlux","userimg":"https://robohash.org/inciduntatest.png?size=50x50\u0026set=set1","UserName":"fhenniger3","content":"Aaaahhhhhhhhhhhhh! I do not know what to say. ","Senttime":"3/1/2021","contentimg":"http://dummyimage.com/219x227.jpg/5fa2dd/ffffff"},{"source":"Span","userimg":"https://robohash.org/quidemquicupiditate.bmp?size=50x50\u0026set=set1","UserName":"gmacqueen4","content":"Aaaahhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/21/2020","contentimg":"http://dummyimage.com/185x108.bmp/dddddd/000000"},{"source":"Namfix","userimg":"https://robohash.org/dolorcumqueeaque.png?size=50x50\u0026set=set1","UserName":"gmorot5","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"9/27/2020","contentimg":"http://dummyimage.com/223x118.jpg/5fa2dd/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditdolorenesciunt.png?size=50x50\u0026set=set1","UserName":"mmcileen6","content":"Aaaahhhhhhhhhhhh! I do not know what to say. ","Senttime":"6/17/2020","contentimg":"http://dummyimage.com/181x111.bmp/5fa2dd/ffffff"},{"source":"Pannier","userimg":"https://robohash.org/etnobisest.jpg?size=50x50\u0026set=set1","UserName":"gthrustle7","content":"Aaaahhhhhhhhhhhhhhh! I do not know what to say. ","Senttime":"5/2/2020","contentimg":"http://dummyimage.com/161x248.png/ff4444/ffffff"},{"source":"Overhold","userimg":"https://robohash.org/oditautet.jpg?size=50x50\u0026set=set1","UserName":"rlafond8","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"3/21/2020","contentimg":"http://dummyimage.com/123x113.png/5fa2dd/ffffff"},{"source":"Bamity","userimg":"https://robohash.org/autdeleniticonsequuntur.bmp?size=50x50\u0026set=set1","UserName":"ckarleman9","content":"Aaaahhhhhh! I do not know what to say. ","Senttime":"11/14/2020","contentimg":"http://dummyimage.com/234x151.jpg/cc0000/ffffff"
} ]

res.json(backupData)
})
   


// helper function, can remove anytime
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = app
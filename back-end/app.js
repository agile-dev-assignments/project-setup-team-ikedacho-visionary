// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules


// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
var request = require('request');
// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use the bodyparser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("front-end/public"))


//put routes here:

// route for HTTP GET requests to the home document
app.get("/", (req, res) => {
    res.send("Hello!")
})

app.get("/comments", (req, res) => {
    res.send("Hello!")
});

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
        .catch((err) => {/*console.log(err)*/})

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
        //.then(response=> res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    // temporary workaround because mockaro daily usage limit is exhausted at the moment...
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
        //.then(response=> res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    // temporary workaround because mockaro daily usage limit is exhausted at the moment...
    // NOTE THAT THIS IS JUST A TEMPORARY SOLUTION FOR THE MOCKAROO LIMIT
    const backupData_suggestion = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName":"express.js friend_suggestion","bio":"p v g t d W U J W w ","action":"follow"},{"img":"https://robohash.org/sedquosequi.bmp?size=50x50\u0026set=set1","UserName":"abalser1","bio":"k e x N L B C M S u ","action":"follow"},{"img":"https://robohash.org/ullamvoluptasiure.png?size=50x50\u0026set=set1","UserName":"agretton2","bio":"B C I S O L G x U J ","action":"follow"},{"img":"https://robohash.org/quiperferendisdistinctio.jpg?size=50x50\u0026set=set1","UserName":"cchaffin3","bio":"j D N E t y F X N I ","action":"follow"},{"img":"https://robohash.org/doloremetquaerat.png?size=50x50\u0026set=set1","UserName":"sbrosenius4","bio":"P D n U y n j E b E ","action":"follow"},{"img":"https://robohash.org/doloribusfugitest.png?size=50x50\u0026set=set1","UserName":"koskehan5","bio":"s b z h i R M C b W ","action":"follow"},{"img":"https://robohash.org/totamvoluptasoccaecati.png?size=50x50\u0026set=set1","UserName":"afrackiewicz6","bio":"u C V V n q f h C t ","action":"follow"},{"img":"https://robohash.org/undeevenietquidem.jpg?size=50x50\u0026set=set1","UserName":"wghidetti7","bio":"r v x W x V Y k j E ","action":"follow"},{"img":"https://robohash.org/porroautut.png?size=50x50\u0026set=set1","UserName":"lswaby8","bio":"D h m L d E W G j r ","action":"follow"},{"img":"https://robohash.org/dignissimosillumplaceat.jpg?size=50x50\u0026set=set1","UserName":"lclemerson9","bio":"D S z Y s l g z g r ","action":"follow"}
                ]
    const backupData_searched = [{"img":"https://robohash.org/animirationequia.bmp?size=50x50\u0026set=set1","UserName": `${req.query.search_name}`,"bio":"p v g t d W U J W w ","action":"follow"}
                ]

    const ret = {
        result: (req.query.search_name == "") ?  backupData_suggestion : backupData_searched,
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
        //.then(response=> res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    const backupData = [{"id":1,"post_text":"Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"10/31/2020","liked_by_username":"Express.js like_history","liked_by_profile_image":"https://robohash.org/sedillumquis.jpg?size=50x50\u0026set=set1","liked_date":"5/2/2020"},{"id":2,"post_text":"Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"12/21/2020","liked_by_username":"fbaterip1","liked_by_profile_image":"https://robohash.org/estdoloreest.jpg?size=50x50\u0026set=set1","liked_date":"3/16/2020"},{"id":3,"post_text":"Morbi non quam nec dui luctus rutrum.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"11/13/2020","liked_by_username":"fcopello2","liked_by_profile_image":"https://robohash.org/molestiaemaximenumquam.png?size=50x50\u0026set=set1","liked_date":"8/13/2020"},{"id":4,"post_text":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.","post_image":"http://dummyimage.com/80x80.png/5fa2dd/ffffff","post_date":"6/8/2020","liked_by_username":"pgreenalf3","liked_by_profile_image":"https://robohash.org/corporisillumrerum.jpg?size=50x50\u0026set=set1","liked_date":"9/14/2020"},{"id":5,"post_text":"Phasellus in felis.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"12/5/2020","liked_by_username":"iseebright4","liked_by_profile_image":"https://robohash.org/inciduntuttenetur.png?size=50x50\u0026set=set1","liked_date":"11/21/2020"},{"id":6,"post_text":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.","post_image":"http://dummyimage.com/80x80.jpg/ff4444/ffffff","post_date":"5/2/2020","liked_by_username":"gbourley5","liked_by_profile_image":"https://robohash.org/evenietconsequunturlabore.png?size=50x50\u0026set=set1","liked_date":"9/26/2020"},{"id":7,"post_text":"Nulla ut erat id mauris vulputate elementum. Nullam varius.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"4/25/2020","liked_by_username":"mutteridge6","liked_by_profile_image":"https://robohash.org/quoindignissimos.jpg?size=50x50\u0026set=set1","liked_date":"4/10/2020"},{"id":8,"post_text":"Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"11/23/2020","liked_by_username":"mpreece7","liked_by_profile_image":"https://robohash.org/accusantiumminimaquo.bmp?size=50x50\u0026set=set1","liked_date":"9/3/2020"},{"id":9,"post_text":"Mauris sit amet eros.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"5/14/2020","liked_by_username":"elowres8","liked_by_profile_image":"https://robohash.org/cumquenecessitatibustempore.bmp?size=50x50\u0026set=set1","liked_date":"4/29/2020"},{"id":10,"post_text":"Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","post_image":"http://dummyimage.com/80x80.bmp/cc0000/ffffff","post_date":"11/11/2020","liked_by_username":"aclarridge9","liked_by_profile_image":"https://robohash.org/quiasequirepellat.png?size=50x50\u0026set=set1","liked_date":"1/22/2021"}
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
        //.then(response=> res.json(response.data))
        .catch((err) => {/*console.log(err)*/})

    const backupData = [{"post_text":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","post_image":"http://dummyimage.com/80x80.png/ff4444/ffffff","post_date":"11/30/2020","liked_by_username":"Express.js Like History","liked_by_profile":"http://dummyimage.com/50x50.jpg/cc0000/ffffff","liked_date":"2/19/2021","liked_content":"Vivamus in felis eu sapien cursus vestibulum."},{"post_text":"Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.","post_image":"http://dummyimage.com/80x80.bmp/ff4444/ffffff","post_date":"4/5/2020","liked_by_username":"ryurin1","liked_by_profile":"http://dummyimage.com/50x50.bmp/ff4444/ffffff","liked_date":"8/23/2020","liked_content":"Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque."},{"post_text":"Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.","post_image":"http://dummyimage.com/80x80.bmp/dddddd/000000","post_date":"9/25/2020","liked_by_username":"rregitz2","liked_by_profile":"http://dummyimage.com/50x50.jpg/cc0000/ffffff","liked_date":"2/26/2021","liked_content":"Phasellus in felis."},{"post_text":"Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"12/31/2020","liked_by_username":"bponcet3","liked_by_profile":"http://dummyimage.com/50x50.bmp/dddddd/000000","liked_date":"9/24/2020","liked_content":"Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis."},{"post_text":"Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.","post_image":"http://dummyimage.com/80x80.bmp/5fa2dd/ffffff","post_date":"10/29/2020","liked_by_username":"nstegell4","liked_by_profile":"http://dummyimage.com/50x50.jpg/dddddd/000000","liked_date":"1/11/2021","liked_content":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."},{"post_text":"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.","post_image":"http://dummyimage.com/80x80.jpg/dddddd/000000","post_date":"10/1/2020","liked_by_username":"ghayford5","liked_by_profile":"http://dummyimage.com/50x50.bmp/ff4444/ffffff","liked_date":"2/5/2021","liked_content":"Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."},{"post_text":"In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.","post_image":"http://dummyimage.com/80x80.png/cc0000/ffffff","post_date":"5/29/2020","liked_by_username":"wmarkovich6","liked_by_profile":"http://dummyimage.com/50x50.png/cc0000/ffffff","liked_date":"8/29/2020","liked_content":"Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim."},{"post_text":"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.","post_image":"http://dummyimage.com/80x80.jpg/5fa2dd/ffffff","post_date":"8/17/2020","liked_by_username":"ksnelson7","liked_by_profile":"http://dummyimage.com/50x50.bmp/dddddd/000000","liked_date":"10/8/2020","liked_content":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."},{"post_text":"Pellentesque at nulla. Suspendisse potenti.","post_image":"http://dummyimage.com/80x80.png/dddddd/000000","post_date":"8/17/2020","liked_by_username":"bwarlton8","liked_by_profile":"http://dummyimage.com/50x50.jpg/5fa2dd/ffffff","liked_date":"4/19/2020","liked_content":"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit."},{"post_text":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.","post_image":"http://dummyimage.com/80x80.bmp/ff4444/ffffff","post_date":"8/20/2020","liked_by_username":"charbertson9","liked_by_profile":"http://dummyimage.com/50x50.jpg/dddddd/000000","liked_date":"8/23/2020","liked_content":"Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum."}
                ]
    
    res.json(backupData)
})


app.get("/getprelogin", (req, res,next) => {
    axios
        .get(`https://my.api.mockaroo.com/postcontent.json?key=a4705650`)
        .then(response=> res.json(response.data))
        .catch((err) => next(err))
            // temporary workaround because mockaro daily usage limit is exhausted at the moment...
})




function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = app
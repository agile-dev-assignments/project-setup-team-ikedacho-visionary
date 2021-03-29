//I will use backup data in this version to avoid randomness of my post content caused by mockaroo and to save mockaroo day limit.

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
        post_data =[{"id":1, "source":"instagram", "content":"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.","senttime":"3/21/2021","contentimg":"http://dummyimage.com/250x145.png/ff4444/ffffff"},{"id":2,"source":"facebook","content":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.","senttime":"9/7/2020","contentimg":"http://dummyimage.com/224x143.png/5fa2dd/ffffff"},{"id":3,"source":"instagram","content":"Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.","senttime":"10/22/2020","contentimg":"http://dummyimage.com/219x245.png/5fa2dd/ffffff"},{"id":4,"source":"instagram","content":"Suspendisse potenti. Cras in purus eu magna vulputate luctus.","senttime":"9/30/2020","contentimg":"http://dummyimage.com/185x107.png/cc0000/ffffff"},{"id":5,"source":"twitter","content":"Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.","senttime":"7/29/2020","contentimg":"http://dummyimage.com/137x169.png/dddddd/000000"},{"id":6,"source":"twitter","content":"Nulla mollis molestie lorem.","senttime":"6/13/2020","contentimg":"http://dummyimage.com/137x202.png/dddddd/000000"},{"id":7,"source":"twitter","content":"Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.","senttime":"1/18/2021","contentimg":"http://dummyimage.com/212x108.png/5fa2dd/ffffff"},{"id":8,"source":"facebook","content":"Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.","senttime":"6/24/2020","contentimg":"http://dummyimage.com/232x197.png/ff4444/ffffff"},{"id":9,"source":"instagram","content":"Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.","senttime":"6/12/2020","contentimg":"http://dummyimage.com/143x282.png/5fa2dd/ffffff"},{"id":10,"source":"facebook","content":"Vivamus vel nulla eget eros elementum pellentesque.","senttime":"3/17/2021","contentimg":"http://dummyimage.com/243x125.png/dddddd/000000"
                    }]//end of backup data
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
    }
    console.log("in get_my_profile:", user_info)
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
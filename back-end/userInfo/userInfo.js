const mongoose = require("mongoose")

const  userInfo = new mongoose.Schema({
    user_name: String,
    user_photo: String,
    background_picture : String,
    post_number : Number,
    follower_number: Number,
    folloing_number: Number,
    linked_social_media : [String],
    unconnected_social_media :[String],
    posts: [String],
    my_history: {
        view_history: [String],
        liked_history: [String],
        commented_history: [String]
    },
    others_history: {
        others_liked_history: [String],
        others_commented_history: [String]
    }
})




module.exports = mongoose.model("userInfo", userInfo)

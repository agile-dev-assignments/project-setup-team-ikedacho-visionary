const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    post_id: Number,
    source: String,
    user_name: String,
    user_photo: String,
    content: String,
    post_date: String,
})

module.exports = mongoose.model('post', Post)

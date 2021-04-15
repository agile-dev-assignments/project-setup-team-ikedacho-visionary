const mongoose = require("mongoose")

const chatroom = new mongoose.Schema({
    chatroom_name: String,
    chatroom_avatar: String,
    participants: [String],
    message_history: [{
        userimg: String, 
        username: String, 
        time: String, 
        content: String
    }]
})

module.exports = mongoose.model("Chatroom", chatroom)

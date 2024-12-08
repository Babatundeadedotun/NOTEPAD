const mongoose = require("mongoose")



let messageSchema = mongoose.Schema({
    userEmail: {type: String, required: true},
    title: {type: String, required: [true, "Title is required"]},
    content: {type: String, required: [true, "Message is required"], maxlength: 1000},
    date: {type: Date, default: Date.now},
    fileReceived: {type: String, default: null}
})


const Content = mongoose.model("contents", messageSchema)

module.exports = Content;
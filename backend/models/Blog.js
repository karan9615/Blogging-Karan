const mongoose = require("mongoose"); 

const blogSchema = new mongoose.Schema({
    caption : String , 
    content: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }
    ], 
    comments: [
        {
            user: {
                type:  mongoose.Schema.Types.ObjectId, 
                ref: "User"
            }, 
            comment: {
                type: String, 
                required: true
            }
        }
    ]
}); 

module.exports = mongoose.model("Blog",blogSchema)
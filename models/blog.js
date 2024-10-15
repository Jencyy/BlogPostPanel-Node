const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Reference to User model
    
});

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;

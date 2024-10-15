const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
});

const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;

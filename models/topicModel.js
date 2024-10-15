const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    title: String,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
    
});

const topicModel = mongoose.model('Topic', TopicSchema);

module.exports = topicModel;

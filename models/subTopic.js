const mongoose = require('mongoose');

const SubTopicSchema = new mongoose.Schema({
    subtopic : String,
    topic: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Topic', 
        required: true 
    }
    
});

const SubtopicModel = mongoose.model('SubTopic', SubTopicSchema);

module.exports = SubtopicModel;

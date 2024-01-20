const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: String,
    postedBy: mongoose.Schema.Types.ObjectId,
    postedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.User || mongoose.model("Topic", TopicSchema);
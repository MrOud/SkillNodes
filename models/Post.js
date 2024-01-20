const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    postedBy: mongoose.Schema.Types.ObjectId,
    datePosted: {
        type: Date,
        default: Date.now
    },
    votes: {
        up: Number,
        down: Number,
        loved: Number,
        helpful: Number,
        notHelpful: Number
    },
    topics: [TopicSchema],
    comments: [CommentSchema]
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);

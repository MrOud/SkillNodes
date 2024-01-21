// import TopicSchema from "@/models/Topic";
// import CommentSchema from "@/models/Comment";

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  content: String,
  postedBy: mongoose.Schema.Types.ObjectId,
  datePosted: {
    type: Date,
    default: Date.now,
  },
  votes: {
    up: {
      type: Number,
      default: 0,
    },
    down: {
      type: Number,
      default: 0,
    },
    loved: {
      type: Number,
      default: 0,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    notHelpful: {
      type: Number,
      default: 0,
    },
  },
  topics: [],
  comments: [],
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);

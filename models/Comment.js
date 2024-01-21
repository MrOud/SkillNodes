const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  bodyContent: String,
  postedBy: mongoose.Schema.Types.ObjectId,
  madeOn: String,
  postedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

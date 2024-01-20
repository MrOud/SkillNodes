const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

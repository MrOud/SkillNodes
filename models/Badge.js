const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Image: String
})

module.exports = mongoose.models.Badge || mongoose.model("Badge", BadgeSchema)
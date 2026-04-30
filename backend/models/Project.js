const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: String,
    members: [String],
    createdBy: String
});

module.exports = mongoose.model("Project", projectSchema);
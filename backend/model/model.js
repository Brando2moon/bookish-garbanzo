const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: String,
	password: String,
	like: [],
});

module.exports = mongoose.model("user", userSchema);

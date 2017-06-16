var mongoose = require("mongoose");

// SCHEMA SETUP
var catSchema = new mongoose.Schema({
	name: String,
	image: String,
	gender: String,
	age: Number,
	hair: String,
	breed: String,
	cost: Number,
	ownerContact: String,
	description: String,
	creator: {
      			id: {
         				type: mongoose.Schema.Types.ObjectId,
         				ref: "User"
      				},
      			username: String
    },
	comments: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Comment"
				}
	]

});

module.exports = mongoose.model("Cat", catSchema);
const { default: mongoose } = require("mongoose");
const crypto = require("node:crypto");

// 1. Make the user schema
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: false
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			unique: false,
			minLength: 8
		},
		salt: {
			type: String,
			required: false,
			unique: false,
			default: function () {
				// generate a random salt value
				let newUserSalt = crypto.randomBytes(64).toString("hex");
				// return the random salt value 
				return newUserSalt;
			}
		},
		emailVerified: {
			type: Boolean,
			required: false,
			default: false
		}
	}, 
	{
		timestamps: true
	}
);

// 2. Make a model using the user schema 
const User = mongoose.model("User", userSchema);

// 3. Export the user model 
module.exports = {
	User
}
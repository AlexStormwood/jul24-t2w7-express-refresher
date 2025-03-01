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


// 1.a Check for raw passwords and hash them!

userSchema.pre("save", async function (next) {

	if (!this.isModified("password")){
		return next();
	}
	// assume the password has been modified from here onwards

	if (!this.salt){
		this.salt = crypto.randomBytes(64).toString("hex");
	}

	this.password = crypto.scryptSync(this.password, this.salt, 64).toString("hex");

	next();
});


// 1.b Add a "comparePassword" method to the model 
userSchema.methods.comparePassword = function (passwordToCheck) {
	// Grab the user salt value 
	let userSalt = this.salt;

	// Hash and salt the passwordToCheck 
	let hashedAndSaltedPasswordToCheck = crypto.scryptSync(passwordToCheck, userSalt, 64).toString("hex");

	// Compare the hashed  & salted version of passwordToCheck against the user's password 
	return this.password == hashedAndSaltedPasswordToCheck;
}


// 2. Make a model using the user schema 
const User = mongoose.model("User", userSchema);

// 3. Export the user model 
module.exports = {
	User
}
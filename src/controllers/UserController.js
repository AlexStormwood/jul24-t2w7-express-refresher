const express = require("express");
const { User } = require("../models/UserModel");
const { createJwt } = require("../utils/jwtFunctions");
const { routeRequiresValidJwt } = require("../middleware/UserJwtMiddleware");
const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
	let {name, email, password} = request.body;

	let newUser = await User.create({
		name: name,
		email: email,
		password: password
	});

	let newUserJwt = createJwt(newUser._id, newUser.name, newUser.emailVerified);

	response.json({
		newUser: newUser,
		userJwt: newUserJwt
	});
});

userRouter.post("/login", async (request, response) => {
	// Get user's email and password from request
	let {email, password} = request.body;

	// Find the user by their email 
	let foundUser = await User.findOne({email: email});

	if (foundUser == null) {
		response.json({
			message:"Invalid login details provided."
		});
	} else {
		// Compare the saved user password to the provided user password 
		let doesPasswordMatch = foundUser.comparePassword(password);
		if (doesPasswordMatch){
			let newJwt = createJwt(foundUser._id, foundUser.name, foundUser.emailVerified);

			response.json({
				result: newJwt
			});
		} else {
			response.json({
				message:"Incorrect login details provided."
			});
		}
	}	

});

userRouter.get("/", routeRequiresValidJwt, async (request, response) => {

	response.json({
		message: request.customData
	})

});

module.exports = userRouter;
const express = require("express");
const { User } = require("../models/UserModel");
const { createJwt } = require("../utils/jwtFunctions");
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

module.exports = userRouter;
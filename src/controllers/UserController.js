const express = require("express");
const { User } = require("../models/UserModel");
const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
	let {name, email, password} = request.body;

	let newUser = await User.create({
		name: name,
		email: email,
		password: password
	});
	
	response.json({
		newUser: newUser
	});
});

module.exports = userRouter;
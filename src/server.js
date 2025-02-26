// import express to begin using it
const express = require("express");

// make an instance of an express server 
const app = express();

// configure the server instance with its routes and other middleware and so on
app.get("/", (request, response) => {
	response.json({
		message:"Hello, world!"
	});
});


module.exports = {
	app
}
// import express to begin using it
const express = require("express");
const { default: mongoose } = require("mongoose");

// make an instance of an express server 
const app = express();

// This allows us to send in JSON body data on our requests!
app.use(express.json());


// configure the server instance with its routes and other middleware and so on
app.get("/", (request, response) => {
	response.json({
		message:"Hello, world!"
	});
});

app.get("/databaseHealth", (request, response) => {

	let databaseState = mongoose.connection.readyState;
	let databaseName = mongoose.connection.name;
	let databaseModels = mongoose.connection.modelNames();
	let databaseHost = mongoose.connection.host;

	response.json({
		readyState: databaseState,
		name: databaseName,
		models: databaseModels,
		host: databaseHost
	});
});

const UserRouter = require("./controllers/UserController");
app.use("/users", UserRouter);


app.use((error, request, response, next) => {
	response.json({
		message:"Something went wrong!",
		error: error.message
	});
});

module.exports = {
	app
}
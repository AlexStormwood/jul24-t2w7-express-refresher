const { databaseConnect } = require("./database");
const { app } = require("./server");

// Allow the environment variables to work
// throughout the rest of the server 
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

// async function serverStart(){
// 	await databaseConnect();
// 	app.listen(PORT, () => {
// 		console.log("Server running on port " + PORT);
// 	})
// }
// serverStart();

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
	databaseConnect();
});

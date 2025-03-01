const jsonwebtoken = require("jsonwebtoken");

// Function to create JWTs
function createJwt(userId, userName, userEmailVerified){
	return jsonwebtoken.sign(
		{
			id: userId,
			name: userName,
			emailVerified: userEmailVerified
		},
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: "1h"
		}
	)
}

// Function to verify JWTs
function verifyJwt(providedJwt){
	let decodedAndVerifiedData = jsonwebtoken.verify(providedJwt, process.env.JWT_SECRET_KEY);

	console.log(decodedAndVerifiedData);

	let newFreshJwt = createJwt(decodedAndVerifiedData.id, decodedAndVerifiedData.name, decodedAndVerifiedData.emailVerified);

	return {
		decodedToken: decodedAndVerifiedData,
		newFreshToken: newFreshJwt
	}
}

module.exports = {
	createJwt, verifyJwt
}
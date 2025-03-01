const { verifyJwt } = require("../utils/jwtFunctions");


async function routeRequiresValidJwt (request, response, next) {
	// pull the jwt from the request header 
	// console.log(request.headers);
	console.log(request.headers.authorization)
	if (request.headers.authorization == null || request.headers.authorization.length < 8){
		return next(new Error("No auth header provided!"));
	}
	let jwtHeaderValue = request.headers.authorization.replace("Bearer ", "");
	console.log(request.headers.authorization);
	// console.log(jwtHeaderValue);

	// verify the jwt 
	// make a new jwt 
	let isTokenValid = verifyJwt(jwtHeaderValue);
	console.log(isTokenValid);

	// add the new jwt to the response header or body or something 
	request.customData = {
		...request.customData || {}, // if existing customData properties exist, don't overwrite them - merge them!
		decodedToken: isTokenValid.decodedToken,
		newFreshToken: isTokenValid.newFreshToken
	}

	// move on to the next step in the middleware chain 
	next();
}

module.exports = {
	routeRequiresValidJwt
}
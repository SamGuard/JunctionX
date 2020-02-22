express = require("express");
router = express.Router();

dbHandler = require('./dbHandler');

function decodeBase64(string){
	let buff = new Buffer(string, 'base64');
	return buff.toString('ascii');
}

function getUsername(str){
	return decodeBase64(str.split(" ")[1]).split(":")[0];
}

function getPassword(str){
	return decodeBase64(str.split(" ")[1]).split(":")[1];
}

function checkAuth(str){
	return dbHandler.userInDB(getUsername(str),getPassword(str));
}


router.post("/", function (req, res, next){//When a get request is made on this directory on this server this function is called
	

	var b64 = req.headers["authorization"].split(" ")[1]

	var string = decodeBase64(b64);
	username = string.split(":")[0];
	password = string.split(":")[1];

	res.json({username: username, status: dbHandler.userInDB(username,password)});
});


module.exports = router;
module.exports.checkAuth = checkAuth;
module.exports.getUsername = getUsername;
module.exports.getPassword = getPassword;

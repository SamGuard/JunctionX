express = require("express");
router = express.Router();

dbHandler = require('./dbHandler');

function decodeBase64(string){
	let buff = new Buffer(string, 'base64');
	return buff.toString('ascii');
}

function checkAuth(str){
	var decB64 = decode(str.split(" ")[1]);

	return dbHandler.userInDB(decB64.split(":")[0],decB64.split(":")[1]);
}


router.post("/", function (req, res, next){//When a get request is made on this directory on this server this function is called
	

	var b64 = req.headers["authorization"].split(" ")[1]

	var string = decodeBase64(b64);
	username = string.split(":")[0];
	password = string.split(":")[1];

	res.json({username: username, status: dbHandler.userInDB(username,password)});
});

module.exports.checkAuth = checkAuth;

module.exports = router;
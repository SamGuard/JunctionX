express = require("express");
fs = require("fs");
dbHandler = require("./dbHandler");

router = express.Router();


function decodeBase64(string){
	let buff = new Buffer(string, 'base64');
	return buff.toString('ascii');
}

router.post("/", function(req, res, next){
	//console.log(req.body.username);
	//console.log(req.body.password);

	console.log(req.headers["authorization"]);

	var decB64 =  decodeBase64(req.headers["authorization"].split(" ")[1]);

	var username = decB64.split(":")[0];
	var password = decB64.split(":")[1];



	//dbHandler.addUser(req.body.username, req.body.password);


	res.send("thank you jospa register");
});



module.exports = router;
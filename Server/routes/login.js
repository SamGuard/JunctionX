express = require("express");
fs = require("fs");
dbHandler = require("./dbHandler");

router = express.Router();


function decodeBase64(string){
	let buff = new Buffer(string);
	return buff.toString('base64');
}


router.post("/login", function(req, res, next){
	console.log(req.body.username);
	console.log(req.body.password);

	console.log(req.headers);

	var plainBody = decodeBase64(req.body.data);

	//dbHandler.userInDB(req.body.username, req.body.password);


	res.send("thank you jospa login");
});

router.post("/register", function(req, res, next){
	console.log(req.body.username);
	console.log(req.body.password);

	dbHandler.addUser(req.body.username, req.body.password);


	res.send("thank you jospa register");
});



module.exports = router;
express = require("express");
fs = require("fs");
dbHandler = require("./dbHandler");
auth = require("./auth");

router = express.Router();


function decodeBase64(string){
	let buff = new Buffer(string);
	return buff.toString('base64');
}

router.get("/", function(req,res,next){
	res.send("eesgg");
});



module.exports = router;
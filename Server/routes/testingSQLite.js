express = require("express");
fs = require("fs");

router = express.Router();



router.get("/", function (req, res, next){//When a get request is made on this directory on this server this function is called
	
	console.log("connection of testing sqlite");
	
	//put code here


	
});


module.exports = router;
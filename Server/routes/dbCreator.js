express = require("express");
fs = require("fs");

router = express.Router();


router.get("/", function(req, res, next){
	//create the db's in here
	res.send("db created");
});

module.exports = router;
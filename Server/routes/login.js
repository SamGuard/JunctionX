express = require("express");
fs = require("fs");
dbHandler = require("./dbHandler");

router = express.Router();


router.post("/", function(req, res, next){
	console.log(req.body.username);
	console.log(req.body.password);

	dbHandler.addUser(req.body.username, req.body.password, 1234);


	res.send("thank you jospa");
});


module.exports = router;
express = require("express");
fs = require("fs");

router = express.Router();


router.post("/", function(req, res, next){
	console.log(req);
	res.send("f you jospa");
});


module.exports = router;
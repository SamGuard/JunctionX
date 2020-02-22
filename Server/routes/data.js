express = require("express");
router = express.Router();


router.get("/", function(req,res,next){
	var body = req.body;

	//var body = JSON.parse('{"type":"trackNames","id": 1}');
	if(body.type == "load"){
		var tracks = dbHandler.getTracks();
		
	}


});


module.exports = router;
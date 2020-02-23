const http = require('http');//Loading http package so i can use a http server
const app = require("./app");//Getting app.js in the current folder which holds all the routes the user can take
const dbHandler = require("./route/dbHandler");

const port = process.env.PORT || 3000;//This means to use port 3000 unless process.env.PORT is set as this variable is set when deployed to heroku

const server = http.createServer(app);//Creates the http server using app.js

server.listen(port);//Listen for incoming connections

console.log("listening on port " + port);



setTimeout(function(){
	var users = dbHandler.getAllUsers();
	for(var i = 0; i < users.length; i++){
		db.updateUserScore(user[i].username, Date.now()-604800000);
	}
},100000);
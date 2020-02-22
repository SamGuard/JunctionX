const express = require('express');//Used for incoming http requests
const app = express();
const bodyparse = require("body-parser");




//Defining the local directory of the routes
const index = require('./routes/index');
const login = require('./routes/login');
const dbTest = require('./routes/testingSQLite');
const dbCreator = require("./routes/dbCreator");



app.use(bodyparse());
app.use(express.static("public"));

//Assigning directories to redirect the incoming request to
app.use("/",index);
app.use("/account", login);
app.use("/dbTest",dbTest);
app.use("/cdb", dbCreator);


//This deals with when a directory has not been found
app.use(function(req, res, next){
	res.send("<!DOCTYPE html><html>Directory not found!</html>");
});

 
module.exports = app;
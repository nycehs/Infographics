var express = require("express"),
	chalk = require("chalk"),
	path = require("path"),
	app = express(),
    swig = require("swig"), 
    eventTracking = require("event-tracking");

// app.use(express.static(path.join(__dirname, "/public")));
// app.use("/vendor", express.static(path.join(__dirname, "node_modules")));


app.get("/", function(req, res, next){
	res.sendFile("index.html", { root: __dirname });	
});

app.get("/test", function(req, res, next){
	res.sendFile("test.html", { root: __dirname });
});

app.get("/test1", function(req, res, next){
	res.sendFile("test1.html", { root: __dirname });
});

app.get("/test2", function(req, res, next){
	res.sendFile("test2.html", { root: __dirname });
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log(chalk.yellow("listening on port ") + chalk.red(port) + chalk.yellow("..."));
});



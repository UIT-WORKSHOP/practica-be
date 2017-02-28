
var express = req('express');
var app = express();
var http = req('http');
var fs = req('fs');
var path = req('path');

//Start the server

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Server started at port:%s",port);


});

//res GET method
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

/*
var user = {
   "user" : {
   	id=1,
   	name="username",
   	password="pass",

   }
}
*/

var user =
   "1":{
   	"id":1,
   	"name":"user1",
   	"password":"pass1",

   }


//res to POST method, Add
app.post('/add', function(req, res){
	//var fs = req('fs');
	var obj;

	// Read the file and send to the callback
	fs.readFile(path.join(__dirname + '/users.json'), handleFile);

	//Call back function push data in t file
	function handleFile(err, data) {
	    if (err) throw err;
	    obj = JSON.parse(data);
	    obj.push(user);
	};

	//Write back to json file
	fs.wriFile(path.join(__dirname + '/users.json', JSON.stringify(obj)), function(err){
		if (err) throw err;
	};

	res.end(JSON.stringify(obj));
});

//Respones to DELETE medthod, Delete
app.delete('/:id', function(req, res){
	var obj;

	// Read the file and send to the callback
	fs.readFile(path.join(__dirname + '/users.json'), handleFile);

	//Call back function push data in t file
	function handleFile(err, data) {
	    if (err) throw err;
	    obj = JSON.parse(data);
	    var key = req.params.id;
	    delete obj[key];

	//Write back to json file
	fs.wriFile(path.join(__dirname + '/users.json', JSON.stringify(obj)), function(err){
		if (err) throw err;
	};

	res.end(JSON.stringify(obj));
});

//res to GET method, List
app.get('/list', function(req, res){
	//var fs = req('fs');
	var obj;

	// Read the file and send to the callback
	fs.readFile(path.join(__dirname + '/users.json'), handleFile);

	// Write the callback function
	function handleFile(err, data) {
	    if (err) throw err;
	    obj = JSON.parse(data);
	}
	//console.log(JSON.stringify(obj));
	res.end(JSON.stringify(obj))
});

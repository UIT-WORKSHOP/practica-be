// call the packages we need
var express = require('express'); // call express
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express();  // define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// START THE SERVER 
var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("This app listening at http://%s:%s", host, port);

});

//Example for GET method 
//response a index.html or A message to test API on POSTMAN
app.get('/', function (req, res) {
   //res.sendFile( __dirname + "/" + "index.html");
     res.json({ message: 'Yay! welcome to REST api!' });   
});
//response a get reqest about list of users
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
});


// Example of POST method. add user to users.json
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       //write new user to the users.json
       fs.writeFile('users.json', JSON.stringify(data), 'utf8',function(err){
        if(err) throw err;
       });
       //Send list of users.
       console.log( data );
       res.end( JSON.stringify(data));
   });
});

//Show detail a user by id (using GET method)
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})
//delete user 
app.delete('/:id', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       //grab the id
       var key="user" +  req.params.id;
       delete data[key];
       console.log(key);
       console.log(data);
       res.end(JSON.stringify(data));
       //Write back to users.json
       //This isnt a good way to handle json file if the data is big,like > 10MB 
       //Because Idk how to delete data inside json file,so, my bad.
       fs.writeFile('users.json', JSON.stringify(data), 'utf8',function(err){
        if(err) throw err;
       });
   });
})

//This file haven't had any PUT method yet. Cuz Idk LOL.
//I will find out the document about this method in REST api and add it soon
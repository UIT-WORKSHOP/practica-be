#How to test my example (scr)
to open server, using this command
$node server.js
then use POSTMAN to test my api
+ browse to 127.0.0.1:8081, method GET to test server is listening or not.
+ browse to 127.0.0.1:8081/listUsers ,method GET to get all the users in json file.
+ browse to 127.0.0.1:8081/addUser ,method POST to add a user(user4 is define in server.js at line 38).
+ browse to 127.0.0.1:8081/:id ,method GET to get detail of a specific user.
+ browse to 127.0.0.1:8081/:id ,method DELETE to delete a specific user.

#Testing Server2 (scr2) - Lyns
+ Accessing server: browse to 127.0.0.1:3000
+ Adding a user: browse to 127.0.0.1:3000/add
+ Deleting a user: browse to 127.0.0.1:3000/:id 
+ Listing list of users: browse to 127.0.0.1:3000/list 

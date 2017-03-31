'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost', 
    port: 3000
});

//Add the route
/*server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply){
        return reply('Here the users will be shown')
    }
});*/

//Connect to db
server.app.db = mongojs('hapi-users', ['users']);

//Load plugin and start server
server.register([  
  require('./routes/users')
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});


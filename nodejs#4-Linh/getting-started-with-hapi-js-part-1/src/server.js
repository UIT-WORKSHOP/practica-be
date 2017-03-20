import Hapi from 'hapi';

const server = new Hapi.Server();

//setting up server
server.connection({
	port:8080
})

//define a route
server.route({

    method: 'GET',
    path: '/hello',
    handler: ( request, reply ) => {
        reply( 'Hello World!' );
    }

});

//start server
server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});
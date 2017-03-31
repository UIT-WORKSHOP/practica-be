'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const Inert = require('inert');

exports.register = function (server, options, next) {

    const db = server.app.db;

//Routes will be defined here
    
    //Return hompage
    server.route({
        method: 'GET',
        path: '/index1.html',
        handler: function(request, reply){
            reply.file('index1.html');
        }
        
    });


    //List users currently in DB
    server.route({
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {

            db.users.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    //Get a user by id
    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: function (request, reply) {

            db.books.findOne({
                _id: request.params.id
            }, (err, doc) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (!doc) {
                    return reply(Boom.notFound());
                }

                reply(doc);
            });

        }
    });

    //
    server.route({
        method: 'POST',
        path: '/books',
        handler: function (request, reply) {

            const book = request.payload;

            //Create an id
            book._id = uuid.v1();

            db.books.save(book, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(book);
            });
        },
        config: {
            validate: {
                payload: {
                    title: Joi.string().min(10).max(50).required(),
                    author: Joi.string().min(10).max(50).required(),
                    isbn: Joi.number()
                }
            }
        }
    });

    server.route({
        method: 'PATCH',
        path: '/books/{id}',
        handler: function (request, reply) {

            db.books.update({
                _id: request.params.id
            }, {
                $set: request.payload
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply().code(204);
            });
        },
        config: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(10).max(50).optional(),
                    author: Joi.string().min(10).max(50).optional(),
                    isbn: Joi.number().optional()
                }).required().min(1)
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/books/{id}',
        handler: function (request, reply) {

            db.books.remove({
                _id: request.params.id
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply().code(204);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-books'
};

'use strict';

var chalk = require('chalk');

// Routes relating to all users
module.exports = function (app) {
    var model = app.model;

    return [

        // Get all users
        {
            method: 'GET',
            path: '/users',
            handler: function (req) {
                model.user.getAll(req.query.client, function (err, users) {
                    if (err) {
                        return req.reply().code(500);
                    } else {
                        req.reply(users).code(200);
                    }
                });
            }
        },

        // Get Posts for user
        {
            method: 'GET',
            path: '/user/{user}',
            handler: function (req) {
                model.posts.getPostTimeline(req.query.client, function (err, posts) {
                    if (err) {
                        return req.reply().code(500);
                    } else {
                        req.reply(posts).code(200);
                    }
                });
            }
        }
    ];
};
'use strict';

var chalk = require('chalk');

// Routes relating to all users
module.exports = function (app) {
    var model = app.model;

    return [
        {

        /*******************************************************************
         CLIENT SOCIAL MEDIA ACCOUNTS

         returns array of client account(s)
         eg. http://127.0.0.1:8000/users/accounts?client=BSI&channel=twitter
         *******************************************************************/
            method: 'GET',
            path: '/users/accounts',
            handler: function (req) {
                //console.log("Request:" + JSON.stringify(req.query));
                model.users.getAll(req.query.client, function (err, users) {
                    //console.log(req.query.client);
                    if (err) {
                        return req.reply().code(500);
                    } else {
                        req.reply(users).code(200);
                    }
                });
            }
        },


        // TODO ROUTES POST /users - get social users and store in database

        // TODO POST /user - get social user and store in database

        // TODO gets post timeline for user account and store in database
    ];
};
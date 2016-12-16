'use strict';

var async = require('async');
var chalk = require('chalk');
var Promise = require('bluebird');
var createTwitterClient = require('../config/twitterclient');
// create twitter cient
var twitterClient = createTwitterClient();

// User model
module.exports = function (app, callback) {

    /*******************************************************************
     RETURNS ARRAY OF CLIENT ACCOUNT(S)
     *******************************************************************/
    app.db.collection('users', function (err, collection) {

        var model = {

            collection: collection,

            getAll: function (client, callback) {
                var userInfo = [];
                var user = "BSI";
                var users = [];

                collection.find({client: client}).toArray(function (err, results) {
                    if (err) {
                        console.log("Error: " + err);
                        callback(err);
                    }

                    callback(null, results);
                });
            },

            getAccount: function (client, accountid) {

                collection.find({client: client, accountid: accountid}).toArray(function (err, result) {
                   if (err) {
                       console.log("Error: " + err);
                       callback(err);
                   }
                    callback(null, result);
                });
            },

            // create users
            create: function (users, callback) {

            }

        };
        callback(null, model);
    });
}
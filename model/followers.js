'use strict';

var async = require('async');
var chalk = require('chalk');
var Promise = require('bluebird');
var socialClientHandler = require('../config/socialclient.js');
var socialclient = socialClientHandler();
var ObjectID = require('mongodb').ObjectID;

// User model
module.exports = function (app, callback) {
    app.db.collection('followers', function (err, collection) {
        var model = {

            processFollowers: function (account, accountName, callback) {
                var result = socialclient.getFollowers(accountName);
                //console.log("Account: " + JSON.stringify(account));

                Promise.all(result).then(function (result) {
                    var processResults = [];
                    // save fields that we want and put in db.
                    result.forEach( function (follower) {
                        processResults.push({
                            account: account,
                            name: follower.name, // foreign key for users collection
                            screen_name: follower.screen_name, // eg. BSI
                            location: follower.location,
                            description: follower.description,
                            //url: follower.display_url
                        });
                    });
                    var results = Promise.all(processResults);

                    results.then(function (data) {
                        collection.insert(data, function (err, result) {
                            if (err) {
                                return callback(err);
                            }
                            callback(null, result);
                        });
                    });


                });
            },

            getFollowers: function (account, callback) {
                var filter = {};
                filter.account = new ObjectID(account);

                collection
                    .find(filter)
                   // .sort({followers_count: -1})
                    .toArray(function (err, results) {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, results);
                    });
            }
        };
        callback(null, model);
    });
}
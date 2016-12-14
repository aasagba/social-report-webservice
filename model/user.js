'use strict';

var async = require('async');
var chalk = require('chalk');
var Promise = require('bluebird');
var socialClientHandler = require('../config/socialclient.js');
var socialclient = socialClientHandler();
var ObjectID = require('mongodb').ObjectID;

// User model
module.exports = function (app, callback) {
    var globalmodel = app.model;

    app.db.collection('user', function (err, collection) {

        var model = {

            collection: collection,

            /*******************************************************************
             RUN USER LOOKUP
             *******************************************************************/
            runByClient: function (users, callback) {
                var userInfo = [];
                var user = "BSI";

                //userInfo = users.map(twitterClient.userLookup);
                userInfo = users.map(socialclient.userLookup);

                Promise.all(userInfo).then(function (userInfo) {
                    // prepare result object needed
                    var newResult = [];
                    //var followers = [];

                    userInfo.forEach( function (user) {
                        newResult.push({
                         account: user.userid, // foreign key for users collection
                         client: user.clientid, // eg. BSI
                         name: user.name,
                         screen_name: user.screen_name,
                         date: Date.now(),
                         channel: user.channel,
                         location: user.location,
                         description: user.description,
                         followers_count: user.followers_count,
                         friends_count: user.friends_count,
                         favourites_count: user.favourites_count,
                         statuses_count: user.statuses_count,
                         latest_status_date: user.status.created_at,
                         latest_status: user.status.text
                         });
                    });
                    var results = Promise.all(newResult);

                    results.then(function (data) {
                        // TODO insert results into db
                        // return success/failure message

                       collection.insert(data, function (err, result) {
                          if (err) {
                              return callback(err);
                          }

                           console.log("Users: " + JSON.stringify(users));
                           console.log("Length: " + users.length);

                           users.forEach (function (user) {
                               // Followers Lookup
                               globalmodel.followers.processFollowers(user._id, user.accountid, function (err, results) {
                                  if (err) {
                                      return req.reply().code(500);
                                  }
                               });

                               globalmodel.friends.processFriends(user._id, user.accountid, function (err, results) {
                                   if (err) {
                                       return req.reply().code(500);
                                   }
                               });
                           });


                           callback(null, result);

                       });



                       // callback(null, data);
                    });


                });
            },

            // return user lookup results from DB
            getByClient: function (client, callback) {

                collection
                    .find({client: client})
                    .sort({followers_count: -1})
                    .toArray(function (err, results) {
                       if (err) {
                           return callback(err);
                       }
                        callback(null, results);
                    });
            },

            // Default filter options
            _defaultFilterOpts: function (opts) {
                return {
                    user: opts.user
                };
            },

            getResultById: function (id, opts, callback) {
                opts.user = id;

                var filter = {
                    account: opts.user
                };

                if (opts.user) {
                    filter.account = new ObjectID(opts.user);
                }

                collection
                    .find(filter)
                    .sort({date: -1})
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
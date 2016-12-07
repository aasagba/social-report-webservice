'use strict';

var async = require('async');
var chalk = require('chalk');
var Promise = require('bluebird');
var createTwitterClient = require('../config/twitterclient');
// create twitter cient
var twitterClient = createTwitterClient();

// User model
module.exports = function (app, callback) {
    app.db.collection('users', function (err, collection) {

        var model = {

            collection: collection,

            getAll: function (client, channel, callback) {
                var channel = channel.toLowerCase();
                var userInfo = [];
                var user = "BSI";
                var users = [];

                collection.find({client: client}).toArray(function (err, results) {
                    if (err) {
                        console.log("Error: " + err);
                        callback(err);
                    }
                    callback(null, results);

                    /*
                    users = results;
                    console.log("Find in db: " + JSON.stringify(results));
                    console.log("users length: " + users.length);

                    switch (channel) {
                        case "twitter":
                            // get users, hardcode for now
                            //var users = ['BSI_UK', 'BSI_France', 'BSI_AustraliaNZ', 'BSI_Brazil'];

                            // perform user lookup
                            userInfo = users.map(twitterClient.userLookup);

                            break;
                        case "facebook":

                            break;
                        case "linkedin":

                            break;
                        default:

                    }
                    */


                /*
                    Promise.all(userInfo).then(function (userInfo) {
                        callback(null, userInfo);
                    });
                   */
                    /*var users = [{
                     name: 'BSI_UK',
                     location: 'London, UK',
                     followers_count: '14029',
                     friends_count: '994',
                     favourites_count: '482',
                     statuses_count: '5080',
                     status: {
                     created_at: 'Thu Dec 01 11:20:50 +0000 2016',
                     text: '@elainecohen is talking about the key findings of the research commissioned as part of this project/event… https://t.co/rMzhaUnDHR'
                     }
                     }, {
                     name: 'BSI_France',
                     location: 'Paris, France',
                     followers_count: '3139',
                     friends_count: '774',
                     favourites_count: '90',
                     statuses_count: '495',
                     status: {
                     created_at: 'Wed Nov 30 18:00:21 +0000 2016',
                     text: 'RT BSI_UK: Mark Carolan espiongroup outlines why IT security managers should be worried about ICS in their Infrastructure Vía BSI_press'
                     }
                     }];*/

                    //callback(null, users);
                });
            },

            // create users
            create: function (users, callback) {

            }

        };
        callback(null, model);
    });
}
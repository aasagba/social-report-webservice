'use strict';

var async = require('async');
var chalk = require('chalk');
var Promise = require('bluebird');
var createTwitterClient = require('../config/twitterclient');
// create twitter cient
var twitterClient = createTwitterClient();

// User model
module.exports = function (app, callback) {
    app.db.collection('user', function (err, collection) {

        var model = {

            collection: collection,

            // run user lookup
            runByClient: function (users, channel, callback) {
                var channel = channel.toLowerCase();
                var userInfo = [];
                var user = "BSI";

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

                Promise.all(userInfo).then(function (userInfo) {
                    // prepare result object needed
                    var preparedResults = [];
                    userInfo.forEach( function (user) {
                        preparedResults.push({
                         accountid: "",
                         name: user.name,
                         screenName: user.screen_name,
                         channel: "twitter",
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
                    var results = Promise.all(preparedResults);

                    //insert results into db
                    // return success/failure message
                    /*
                     collection.insert()
                     */

                    results.then(function (data) {
                        callback(null, data);
                    });

                });
            },

            // get user lookup
            getByClient: function (users, callback) {

            }

        };
        callback(null, model);
    });
}
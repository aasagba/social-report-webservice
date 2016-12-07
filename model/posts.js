'use strict';

var async = require('async');
var chalk = require('chalk');
var Promise = require('bluebird');
var createTwitterClient = require('../config/twitterclient');
// create twitter cient
var twitterClient = createTwitterClient();

// User model
module.exports = function (app, callback) {
    var model = {
        getPostTimeline: function (channel, name, callback) {
            // change 'BSI_UK' to client

            switch (channel) {
                case "twitter":
                    console.log("Getting Twitter posts for: " + name);

                    var options = {screen_name: name, count:200};
                    var action = "statuses/user_timeline";

                    twitterClient.getPostTimeline(action, options).then(function (posts) {
                        console.log("resolved postTimeline");
                        console.log(posts.length);

                        callback(null, posts);

                    });

                    break;
                case "facebook":
                    console.log("Getting Facebook posts for: " + name);
                    callback(null, [{text: "No Posts"}]);
                    break;
                case "linkedin":
                    console.log("Getting LinkedIn posts for: " + name);
                    callback(null, [{text: "No Posts"}]);
                    break;
                default:

            }

            /*
            var posts = [{
                text: "Discover how having access to over 90,000 internationally recognized #standards can help your organization. >>>> http://bit.ly/2gUYJet"
            }, {
                text: "How does Organisational Resilience link with Lean Six Sigma? > http://bit.ly/2fQzgRC"
            }, {
                text: "Find out how #standards can help your organization achieve excellence. >>>> http://bit.ly/2g2gAMx"
            }];

            callback(null, posts);
            */
        }
    };
    callback(null, model);
}
'use strict';

var async = require('async');
var chalk = require('chalk');

// User model
module.exports = function (app, callback) {
    var model = {
        getPostTimeline: function (name, callback) {

            var posts = [{
                text: "Discover how having access to over 90,000 internationally recognized #standards can help your organization. >>>> http://bit.ly/2gUYJet"
            }, {
                text: "How does Organisational Resilience link with Lean Six Sigma? > http://bit.ly/2fQzgRC"
            }, {
                text: "Find out how #standards can help your organization achieve excellence. >>>> http://bit.ly/2g2gAMx"
            }];

            callback(null, posts);
        }
    };
    callback(null, model);
}
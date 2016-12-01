'use strict';

var async = require('async');
var chalk = require('chalk');

// User model
module.exports = function (app, callback) {
    var model = {

        getAll: function (client, callback) {

            var users = [{
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
            }];

            callback(null, users);
        }

    };
    callback(null, model);
}
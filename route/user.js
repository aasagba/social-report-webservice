'use strict';

var chalk = require('chalk');

// Routes relating to all users
module.exports = function (app) {
    var model = app.model;

    return [
        {
            method: 'GET',
            path: '/',
            handler: function (req) {
                req.reply("Welcome to the LFI Social-Report-Webservice").code(200);
            }
        },
        // Get Posts for user
        {
            method: 'GET',
            path: '/user/account/{account}',
            handler: function (req) {
                model.posts.getPostTimeline(req.query.channel, req.query.client, function (err, posts) {
                    if (err) {
                        return req.reply().code(500);
                    } else {
                        req.reply(posts).code(200);
                    }
                });
            }
        },

        {
            // eg http://127.0.0.1:8000/user/run?client=BSI&channel=twitter
            method: 'GET',
            path: '/user/run',
            handler: function (req) {
                var client = req.query.client;
                var channel = req.query.channel;

                // put channel as field in users collection and remove argument below

                model.users.getAll(client, channel, function (err, users) {
                    console.log(client);
                    if (err) {
                        return req.reply().code(500);
                    } else {
                        model.user.runByClient(users, channel, function (err, results) {
                            if (err) {
                                return req.reply().code(500);
                            } else {
                                req.reply(results).code(200);
                            }
                        });
                    }
                });

            }
        },

        {
            // eg. http://127.0.0.1:8000/user/results?client=BSI&channel=twitter
            method: 'GET',
            path: '/user/results',
            handler: function (req) {

                // hardocoded results
                var results = [

                    {
                        "accountid": "",
                        "name": "BSI UK",
                        "screenName": "BSI_UK",
                        "channel": "twitter",
                        "location": "London,UK",
                        "description": "The UK’s national standards body & the business standards company providing services in knowledge, assurance (including the Kitemark) and compliance",
                        "followers_count": 14084,
                        "friends_count": 996,
                        "favourites_count": 490,
                        "statuses_count": 5105,
                        "latest_status_date": "Tue Dec 06 14:46:47 +0000 2016",
                        "latest_status": "First to achieve #BIMKitemark for Design and Construction @balfourbeatty @BAMContractors @BAMConstructUK @gammon_hk… https://t.co/sV11ktPZc7"
                    },
                    {
                        "accountid": "",
                        "name": "BSI Brasil",
                        "screenName": "BSI_Brazil",
                        "channel": "twitter",
                        "location": "Sao Paulo, Brazil",
                        "description": "BSI Brasil, a empresa de gestão de negócios fornecedora de normas e serviços relacionados a conhecimento, garantia e conformidade.",
                        "followers_count": 7,
                        "friends_count": 1,
                        "favourites_count": 1,
                        "statuses_count": 3,
                        "latest_status_date": "Wed Aug 31 07:21:56 +0000 2016",
                        "latest_status": "RT @BSI_UK: Last week’s UK horsemeat scandal arrests are a reminder to stay vigilant about food fraud. https://t.co/KWs0I4MYzr https://t.co…"
                    },
                    {
                        "accountid": "",
                        "name": "BSI France",
                        "screenName": "BSI_France",
                        "channel": "twitter",
                        "location": "Paris, France",
                        "description": "Organisme de notification pour les dispositifs médicaux #CE et de certification sur les #normes #ISO13485 #ISO27001 #ISO9001 #ISO14001 #ISO22301 #ISO45001 #ISO",
                        "followers_count": 312,
                        "friends_count": 776,
                        "favourites_count": 90,
                        "statuses_count": 496,
                        "latest_status_date": "Tue Dec 06 15:00:26 +0000 2016",
                        "latest_status": "First BIM Kitemark paves way for new era of digital technology in construction https://t.co/SdQ2oolDtJ Vía BSI_press"
                    },
                    {
                        "accountid": "",
                        "name": "BSI Australia NZ",
                        "screenName": "BSI_AustraliaNZ",
                        "channel": "twitter",
                        "location": "Australia and NZ",
                        "description": "BSI Australia and NZ, the business standards company providing standards and related services in knowledge, assurance and compliance",
                        "followers_count": 180,
                        "friends_count": 605,
                        "favourites_count": 4,
                        "statuses_count": 69,
                        "latest_status_date": "Mon Oct 17 00:36:57 +0000 2016",
                        "latest_status": "#IATF16949 new quality management system for the automotive industry is published. Find out more today: https://t.co/5OppZqUBBs"
                    }

                ];

                req.reply(results).code(200);
            }
        }
    ];

};
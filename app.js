'use strict';

var async = require('async');
var Hapi = require('hapi');

module.exports = initApp;

// Initialise the application
function initApp (config, callback) {

    var app = module.exports = {
        server: new Hapi.Server(config.host, config.port, {}),
        database: null,
        model: {}
    };

    async.series([

        function (next) {
            require('./model/user')(app, function (err, model) {
                app.model.user = model;
                next(err);
            });
        },

        function (next) {
            require('./model/posts')(app, function (err, model) {
                app.model.posts = model;
                next(err);
            });
        },

        function (next) {
            app.server.addRoutes(require('./route/users')(app));
            /*app.server.addRoutes(require('./route/user')(app));*/
            app.server.start(next);
        }
    ], function (err) {
       callback(err, app);
    });
}
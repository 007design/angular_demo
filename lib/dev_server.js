/*
 *
 * user/repo
 *
 * Copyright (c) 2014
 * Licensed under the MIT license.
 */

'use strict';

var express       = require('express');

module.exports = {
  startServer: function(port, options){
    if (!port) {
      console.log('No port specified!');
      return;
    }

    options = options || {};
    // Get the root dir
    var dir = options.targetDir || process.cwd();

    var app = express();

    // Serve assets
    app.use(express.static(dir + '/src/assets'));

    // Serve test fixtures
    app.use(express.static(dir + '/tests/fixtures'));

    function configureStatic(path){
      app.use(express.static(dir + path));
    }

    function configureGet(route){
      app.get(route.path, function(req, res){
        if (route.responseType === 'redirect') {
          res.redirect(route.response);
        } else if (route.responseType === 'file') {
          res.sendFile(dir + route.response);
        } else if (route.responseType === 'function') {
          route.response(req, res);
        } else {
          res.send(route.response);
        }
      });
    }

    function configurePost(route){
      app.post(route.path, function(req, res){
        if (route.responseType === 'redirect') {
          res.redirect(route.response);
        } else if (route.responseType === 'file') {
          res.sendFile(dir + route.response);
        } else if (route.responseType === 'function') {
          route.response(req, res);
        } else {
          res.send(route.response);
        }
      });
    }

    if (options.staticRoutes) {
      for (var b=0; b<options.staticRoutes.length; b++) {
        configureStatic(options.staticRoutes[b]);
      }
    }

    // Parse routes from options
    if (options.routes) {
      for (var a=0; a<options.routes.length; a++) {
        var route = options.routes[a];

        // Error checking
        if (!route.path) {
          console.log('No path specified in route', route);
          break;
        } else if (!route.response) {
          console.log('No response specified in route', route);
          break;
        }

        // Post requests
        if (route.method && route.method.match(/post/i) !== null) {
          configurePost(route);
        }

        // Get requests
        else {
          configureGet(route);
        }
      }
    }

    /* Listen for requests */
    return app.listen(port);
  }
};


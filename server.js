var server = require('./lib/dev_server.js');

app = server.startServer(9001, {
  staticRoutes: [ '/src' ],
  routes: [
    {'path': '/', 'method': 'get', 'responseType': 'file', 'response': '/src/templates/index.html'},
    {'path': '/data.json', 'method': 'get', 'responseType': 'file', 'response': '/lib/data.json'},
    {'path': '/data2.json', 'method': 'get', 'responseType': 'file', 'response': '/lib/data2.json'}
  ]
});
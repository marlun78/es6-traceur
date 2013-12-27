/**
 * server/index.js
 */
var http = require('http'),
    path = require('path'),
    util = require('util'),
    application = require('./application'),
    absRootPath = path.join(__dirname, '../', process.env.BUILD || process.env.npm_package_config_build || 'build'),
    host = process.env.HOST || process.env.npm_package_config_host || 'localhost',
    port = process.env.PORT || process.env.npm_package_config_port || 1337;

var server = module.exports = http.createServer(application(absRootPath));
server.listen(port, host, listening);

function listening() {
    console.log(util.format('Server started on %s:%d serving from %s', host, port, absRootPath));
}

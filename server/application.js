/**
 * app.js
 */
var application,
    connect = require('connect');

module.exports = function (absPath) {
    if (!application) {
        application = connect()
            //.use(connect.favicon())
            //.use(connect.logger('dev'))
            .use(connect.static(absPath))
            //.use(connect.directory('dist'))
            //.use(connect.cookieParser())
            //.use(connect.session({ secret: 'my secret here' }))
            .use(unhandled);

        application.absPath = absPath;
    }
    return application;
};

function unhandled(req, res) {
    console.log('Final destination', req.url);
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    res.end('Ooops! No such file');
}
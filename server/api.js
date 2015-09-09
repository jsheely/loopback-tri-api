'use strict';
// StrongLoop/LoopBack Modules
var app = require('app-core').loopback;
var boot = require('loopback-boot');
var debug = require('debug')('app-api');
var colors = require('colors');
var config = require('app-core').config;

module.exports = {
    loopback: app,
    config: config
}


boot(app, __dirname);

/**
 * Start the API Server
 */

app.start = function () {

    // start the web server
    return app.listen(function () {
        app.emit('started');
        debug('listening in ' + app.settings.env.green.bold + ' mode.');
        debug('Ctrl+C'.green.bold + ' to shut down. ;)');
        console.log('listening on port ' + app.get('port'));

        // Exit cleanly on Ctrl+C
        process.on('SIGINT', function () {
            // app.io.close();  // close socket.io
            console.log('\n');
            debug('has ' + 'shutdown'.green.bold);
            debug('was running for ' + Math.round(process.uptime()).toString().green.bold + ' seconds.');
            process.exit(0);
        });

    });

};


if (require.main === module || (
    require.main.filename.indexOf('interceptor.js') !== -1 &&
    (require.main.children || []).indexOf(module) !== -1)
) {
    app.start();
}

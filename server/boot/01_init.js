'use strict';
module.exports = function (server) {
	server.set('port', process.env.port || 3001);
}
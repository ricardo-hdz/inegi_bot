var botBuilder = require('claudia-bot-builder'),
    _ = require('lodash');

var parseJson = require('parse-json');
var HandlerHelper = require('./handler_helper');

module.exports = botBuilder(function (message, request) {
    var helper = new HandlerHelper();
    return helper.handleRequest(message, request);
});
var _ = require('lodash');
var DataHelper = require('./data_helper');

function HandlerHelper() {};

HandlerHelper.prototype.handleRequest = function(message, request) {
    var helper = new DataHelper();
    if (message.originalRequest.inline_query) {
        return helper.getInlineHoroscope(message.text, message.originalRequest);
    }
};

module.exports = HandlerHelper;
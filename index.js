'use strict';

var _ = require('lodash');
var DataHelper = require('./data_helper');
var parseJson = require('parse-json');

var app = function() {
    var dataHelper = new DataHelper();
    var requestFeed = function() {
        dataHelper.requestUpdates().then(function(response) {
            console.log(JSON.stringify(response));
            return response;
        });
    };

    return {
        requestFeed: requestFeed
    };
};

app().requestFeed();

module.exports = app;
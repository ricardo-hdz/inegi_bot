'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var parseString = require('xml2js').parseString;

function DataHelper() {};

DataHelper.prototype.requestUpdates = function() {
    return this.getFeed().then(function(response) {
        var feed = response.body;
        var resultObj = {};
        parseString(feed, function (err, result) {
            // console.log(result.rss.channel);
            //var feedJSON = JSON.stringify(result);
            if (_.has(result, 'rss.channel')) {
                resultObj = result.rss.channel[0];
            }
        });
        return resultObj;
    });
};

DataHelper.prototype.filterEntriesForDay = function(data) {
    var lastBuildDate = _.has(data, 'lastBuildDate') ? data.lastBuildDate : null;
    var item = _.has(data, 'item') ? data.item : null;

    if (lastBuildDate && item) {
        var buildDateObj = new Date(lastBuildDate);
        var now = new Date();
        if (
            buildDateObj.getDate() === now.getDate() &&
            buildDateObj.getMonth() === now.getMonth() &&
            buildDateObj.getYear() === now.getYear()
        ) {
            // INEGI never publishes more than 10 entries per day, just grab first 10 to iterate through
            var lastEntries = _.slice(item, 0, 10);
            var dayEntries = [];
            _.forEach(lastEntries, function(value, key) {
                if (_.has(value, 'pubDate') && value.pubDate === lastBuildDate) {
                    dayEntries.push(value);
                }
            });
        }
    }
};

DataHelper.prototype.flattenItems = function(items) {
    return _.reduce(items, function(filteredItems, value, key) {
        var description = value.description[0];
        if (_.indexOf(filteredItems, description) === -1) {
            filteredItems.push(description);
        }
        return filteredItems;
    }, []);
};

DataHelper.prototype.getFeed = function() {
    var options = {
        method: 'GET',
        uri: 'http://www.inegi.org.mx/inegi/contenidos/espanol/rss/XML/rss_todos.xml',
        resolveWithFullResponse: true
    };
    return rp(options);
};

module.exports = DataHelper;
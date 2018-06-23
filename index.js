'use strict';

const https = require('https');
const qs = require('querystring');

var HolidayAPI = function (key) {
  if ('undefined' !== typeof key) {
    HolidayAPI.prototype.key = key;
  }
};

HolidayAPI.prototype.v1 = {};

HolidayAPI.prototype.v1.holidays = function (parameters, callback) {
  const querystringObject = Object.assign(
    {},
    {key: HolidayAPI.prototype.key},
    parameters,
  )
  const querystring = qs.stringify(querystringObject);
  const url = `https://holidayapi.com/v1/holidays?${querystring}`;

  https.get(url, function (res) {
    res.on('data', function (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = {};
      }

      var error = null;

      if (res.statusCode !== 200) {
        if ('undefined' === typeof data['error']) {
          error = 'Unknown error.';
        } else {
          error = data.error;
        }
      }

      return callback(error, data);
    });
  }).on('error', function (e) {
    callback(e.message);
  });
};

module.exports = HolidayAPI;


# node-holidayapi
Official Node.js library for [Holiday API](https://holidayapi.com)

## Installation

```shell
npm install --save node-holidayapi
```

## Usage

```javascript
var HolidayAPI = require('node-holidayapi');
var hapi = new HolidayAPI('_YOUR_API_KEY_').v1;

var parameters = {
  // Required
  country: 'US',
  year:    2016,
  // Optional
  // month:    7,
  // day:      4,
  // previous: true,
  // upcoming: true,
  // public:   true,
  // pretty:   true,
};

hapi.holidays(parameters, function (err, data) {
  // Insert awesome code here...
});
```


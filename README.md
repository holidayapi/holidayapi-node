# node-holidayapi
Official Node.js library for [Holiday API](https://holidayapi.com)

## Installation

```shell
npm install --save node-holidayapi
```

## Usage

```javascript
var hapi = require('node-holidayapi');
var Hapi = new HolidayAPI('_YOUR_API_KEY').v1;

var parameters = {
  // Required
  country: 'US',
  year:    2016,
  // Optional
  // month:    7,
  // day:      4,
  // previous  true,
  // upcoming  true,
  // public:   true,
  // pretty:   true,
};

var Hapi.holidays(parameters, function (err, data) {
  // Insert awesome code here...
});
```


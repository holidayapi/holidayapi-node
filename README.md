# Holiday API Node.js Library

[![License](https://img.shields.io/npm/l/holidayapi-node?style=for-the-badge)](https://github.com/holidayapi/holidayapi-node/blob/master/LICENSE)
![Node Version](https://img.shields.io/node/v/holidayapi?style=for-the-badge)
![Build Status](https://img.shields.io/travis/holidayapi/holidayapi-node/master?style=for-the-badge)
[![Coverage Status](https://img.shields.io/coveralls/github/holidayapi/holidayapi-node/master?style=for-the-badge)](https://coveralls.io/github/holidayapi/holidayapi-node?branch=master)

Official Node.js library for [Holiday API](https://holidayapi.com) providing
quick and easy access to holiday information from applications written in
server-side JavaScript.

## Migrating from 1.x

Please note, version 2.x of this library is a full rewrite of the 1.x series in
TypeScript. The interfacing to the library has been simplified and existing
applications upgrading to 2.x will need to be updated.

| Version 1.x Syntax (Old)                          | Version 2.x+ Syntax (New)                         |
|---------------------------------------------------|---------------------------------------------------|
| `const HolidayAPI = require('node-holidayapi');`  | `import { HolidayAPI } from 'holidayapi';`        |
| `const holidayApi = new HolidayAPI(key).v1;`      | `const holidayApi = new HolidayAPI({ key });`     |
| `holidayApi.holidays(params, (err, data) => {});` | `holidayApi.holidays(params).then((data) => {});` |

Version 1.x of the library can still be found
[here](https://github.com/joshtronic/node-holidayapi).

## Documentation

Full documentation of the Holiday API endpoints is available
[here](https://holidayapi.com/docs).

## Installation

```shell
# NPM
npm install --save holidayapi

# Yarn
yarn add holidayapi
```

## Usage

```javascript
import { HolidayAPI } from 'holidayapi';

const key = 'Insert your API key here';
const holidayApi = new HolidayAPI({ key });

// Fetch supported countries and subdivisions
holidayApi.countries()
  .then((countries) => { console.log(countries); })
  .catch((err) => { console.error(err); });

// Fetch supported languages
holidayApi.languages()
  .then((languages) => { console.log(languages); })
  .catch((err) => { console.error(err); });

// Fetch holidays with minimum parameters
holidayApi.holidays({ country: 'US', year: 2019 })
  .then((holidays) => { console.log(holidays); })
  .catch((err) => { console.error(err); });

// Async? Await? No problem!
(async () => {
  // Fetch supported countries and subdivisions
  const countries = await holidayApi.countries();

  // Fetch supported languages
  const languages = await holidayApi.languages();

  // Fetch holidays with minimum parameters
  const holidays = await holidayApi.holidays({
    country: 'US',
    year: 2019,
  });
})();
```

## Examples

### Countries

#### Fetch all supported countries

```javascript
holidayApi.countries();
```

#### Fetch only countries with public holidays

```javascript
holidayApi.countries({
  public: true,
});
```

#### Fetch a supported country by code

```javascript
holidayApi.countries({
  country: 'NO',
});
```

#### Search for countries by code or name

```javascript
holidayApi.countries({
  search: 'united',
});
```

### Languages

#### Fetch all supported languages

```javascript
holidayApi.languages();
```

#### Fetch a supported language by code

```javascript
holidayApi.language({
  language: 'es',
});
```

#### Search for languages by code or name

```javascript
holidayApi.language({
  search: 'Chinese',
});
```

### Holidays

#### Fetch holidays for a specific year

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
});
```

#### Fetch holidays for a specific month

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
});
```

#### Fetch holidays for a specific day

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
  day: 4,
});
```

#### Fetch upcoming holidays based on a specific date

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
  day: 4,
  upcoming: true,
});
```

#### Fetch previous holidays based on a specific date

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
  day: 4,
  previous: true,
});
```

#### Fetch only public holidays

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  public: true,
});
```

#### Fetch holidays for a specific subdivision

```javascript
holidayApi.holidays({
  country: 'GB-ENG',
  year: 2019,
});
```

#### Include subdivision holidays with countrywide holidays

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  subdivisions: true,
});
```

#### Search for a holiday by name

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  search: 'New Year',
});
```

#### Translate holidays to another language

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  language: 'zh', // Chinese (Simplified)
});
```

#### Fetch holidays for multiple countries

```javascript
holidayApi.holidays({
  country: 'US,GB,NZ',
  year: 2019,
});

holidayApi.holidays({
  country: ['US', 'GB', 'NZ'],
  year: 2019,
});
```

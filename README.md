# node-holidayapi

Official Node.js library for [Holiday API](https://holidayapi.com)

[![License](https://img.shields.io/npm/l/node-holidayapi?style=for-the-badge)](https://github.com/holidayapi/node-holidayapi/blob/master/LICENSE)
![Node Version](https://img.shields.io/node/v/holidayapi?style=for-the-badge)
![Build Status](https://img.shields.io/travis/holidayapi/node-holidayapi/master?style=for-the-badge)
[![Coverage Status](https://img.shields.io/coveralls/github/holidayapi/node-holidayapi/master?style=for-the-badge)](https://coveralls.io/github/holidayapi/node-holidayapi?branch=master)

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
holidayApi.languages();
  .then((languages) => { console.log(languages); })
  .catch((err) => { console.error(err); });

// Fetch holidays with minimum parameters
holidayApi.holidays({ country: 'US', year: 2019 });
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

### Fetch holidays for a specific year

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
});
```

### Fetch holidays for a specific month

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
});
```

### Fetch holidays for a specific day

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
  day: 4,
});
```

### Fetch upcoming holidays based on a specific date

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
  day: 4,
  upcoming: true,
});
```

### Fetch previous holidays based on a specific date

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  month: 7,
  day: 4,
  previous: true,
});
```

### Fetch only public holidays

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  public: true,
});
```

### Fetch holidays for a specific subdivision

```javascript
holidayApi.holidays({
  country: 'GB-ENG',
  year: 2019,
});
```

### Include subdivision holidays with countrywide holidays

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  subdivisions: true,
});
```

### Search for a holiday by name

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  search: 'New Year',
});
```

### Translate holidays to another language

```javascript
holidayApi.holidays({
  country: 'US',
  year: 2019,
  language: 'zh', // Chinese (Simplified)
});
```

### Fetch holidays for multiple countries

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

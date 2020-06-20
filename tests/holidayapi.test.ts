import * as nock from 'nock';
import { HolidayAPI } from '../src/holidayapi';

const baseUrl = 'https://holidayapi.com/v1/';
const key = 'b58e6dec-8a47-459f-a3c1-eaa26eb4dd30';

describe('holidayapi', () => {
  describe('instantiation', () => {
    it('should error when key is missing', () => {
      expect.assertions(1);
      expect(() => {
        const holidayapi = new HolidayAPI({});
        expect(holidayapi.key).toBeUndefined();
      }).toThrowError(/missing api key/i);
    });

    it('should error when key is invalid format', () => {
      expect.assertions(1);
      expect(() => {
        const holidayapi = new HolidayAPI({
          key: 'zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz',
        });
        expect(holidayapi.key).toBeUndefined();
      }).toThrowError(/invalid api key/i);
    });

    it('should error when version is too low', () => {
      expect.assertions(1);
      expect(() => {
        const holidayapi = new HolidayAPI({ key, version: 0 });
        expect(holidayapi.baseUrl).toBeUndefined();
      }).toThrowError(/invalid version/i);
    });

    it('should error when version is too high', () => {
      expect.assertions(1);
      expect(() => {
        const holidayapi = new HolidayAPI({ key, version: 2 });
        expect(holidayapi.baseUrl).toBeUndefined();
      }).toThrowError(/invalid version/i);
    });

    it('should assign class members', () => {
      const holidayapi = new HolidayAPI({ key });
      expect(holidayapi.baseUrl).toBe(baseUrl);
      expect(holidayapi.key).toBe(key);
    });
  });

  describe('v1 requests', () => {
    const holidayapi = new HolidayAPI({ key });
    const mockRequest = nock(baseUrl);

    describe('/v1/countries', () => {
      const basePath = `/countries?key=${key}`;

      it('should return countries', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          countries: [
            {
              code: 'ST',
              name: 'Sao Tome and Principe',
              languages: ['pt'],
              codes: {
                'alpha-2': 'ST',
                'alpha-3': 'STP',
                numeric: 678,
              },
              flag: 'https://www.countryflags.io/ST/flat/64.png',
              subdivisions: [
                {
                  code: 'ST-P',
                  name: 'Príncipe',
                  languages: ['pt'],
                },
                {
                  code: 'ST-S',
                  name: 'São Tomé',
                  languages: ['pt'],
                },
              ],
            },
          ],
        };

        mockRequest.get(basePath).reply(200, expectedResponse);
        expect(await holidayapi.countries()).toStrictEqual(expectedResponse);
      });

      it('should return only countries with public holidays', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          countries: [
            {
              code: 'ST',
              name: 'Sao Tome and Principe',
              languages: ['pt'],
              codes: {
                'alpha-2': 'ST',
                'alpha-3': 'STP',
                numeric: 678,
              },
              flag: 'https://www.countryflags.io/ST/flat/64.png',
              subdivisions: [
                {
                  code: 'ST-P',
                  name: 'Príncipe',
                  languages: ['pt'],
                },
                {
                  code: 'ST-S',
                  name: 'São Tomé',
                  languages: ['pt'],
                },
              ],
            },
          ],
        };

        mockRequest.get(`${basePath}&public=true`).reply(200, expectedResponse);
        expect(await holidayapi.countries({
          public: true,
        })).toStrictEqual(expectedResponse);
      });

      it('should return one country', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          countries: [
            {
              code: 'ST',
              name: 'Sao Tome and Principe',
              languages: ['pt'],
              codes: {
                'alpha-2': 'ST',
                'alpha-3': 'STP',
                numeric: 678,
              },
              flag: 'https://www.countryflags.io/ST/flat/64.png',
              subdivisions: [
                {
                  code: 'ST-P',
                  name: 'Príncipe',
                  languages: ['pt'],
                },
                {
                  code: 'ST-S',
                  name: 'São Tomé',
                  languages: ['pt'],
                },
              ],
            },
          ],
        };

        mockRequest.get(`${basePath}&country=ST`).reply(200, expectedResponse);
        expect(await holidayapi.countries({
          country: 'ST',
        })).toStrictEqual(expectedResponse);
      });

      it('should search countries', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          countries: [
            {
              code: 'ST',
              name: 'Sao Tome and Principe',
              languages: ['pt'],
              codes: {
                'alpha-2': 'ST',
                'alpha-3': 'STP',
                numeric: 678,
              },
              flag: 'https://www.countryflags.io/ST/flat/64.png',
              subdivisions: [
                {
                  code: 'ST-P',
                  name: 'Príncipe',
                  languages: ['pt'],
                },
                {
                  code: 'ST-S',
                  name: 'São Tomé',
                  languages: ['pt'],
                },
              ],
            },
          ],
        };

        mockRequest.get(`${basePath}&search=Sao`).reply(200, expectedResponse);
        expect(await holidayapi.countries({
          search: 'Sao',
        })).toStrictEqual(expectedResponse);
      });

      it('should raise 4xx errors', async () => {
        const expectedResponse = {
          status: 429,
          error: 'Rate limit exceeded',
        };

        expect.assertions(1);
        mockRequest.get(basePath).reply(429, expectedResponse);

        try {
          await holidayapi.countries();
        } catch (err) {
          expect(err.message).toMatch(/rate limit exceeded/i);
        }
      });

      it('should raise 5xx errors', async () => {
        expect.assertions(1);
        mockRequest.get(basePath).reply(500);

        try {
          await holidayapi.countries();
        } catch (err) {
          expect(err.message).toMatch(/internal server error/i);
        }
      });
    });

    describe('/v1/holidays', () => {
      const basePath = `/holidays?key=${key}`;

      it('should return holidays', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          holidays: [
            {
              name: 'Independence Day',
              date: '2015-07-04',
              observed: '2015-07-03',
              public: true,
              country: 'US',
              uuid: '88268759-9b90-468c-804f-b729b8418e7c',
              weekday: {
                date: {
                  name: 'Saturday',
                  numeric: '6',
                },
                observed: {
                  name: 'Friday',
                  numeric: '5',
                },
              },
            },
          ],
        };

        mockRequest.get(`${basePath}&country=US&year=2019&month=7&day=4`)
          .reply(200, expectedResponse);

        expect(await holidayapi.holidays({
          country: 'US',
          year: 2019,
          month: 7,
          day: 4,
        })).toStrictEqual(expectedResponse);
      });

      it('should search holidays', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          holidays: [
            {
              name: 'Independence Day',
              date: '2015-07-04',
              observed: '2015-07-03',
              public: true,
              country: 'US',
              uuid: '88268759-9b90-468c-804f-b729b8418e7c',
              weekday: {
                date: {
                  name: 'Saturday',
                  numeric: '6',
                },
                observed: {
                  name: 'Friday',
                  numeric: '5',
                },
              },
            },
          ],
        };

        mockRequest.get(`${basePath}&country=US&year=2019&search=Independence`)
          .reply(200, expectedResponse);

        expect(await holidayapi.holidays({
          country: 'US',
          year: 2019,
          search: 'Independence',
        })).toStrictEqual(expectedResponse);
      });

      it('should error when country is missing', async () => {
        expect.assertions(1);

        try {
          await holidayapi.holidays();
        } catch (err) {
          expect(err.message).toMatch(/missing country/i);
        }
      });

      it('should error when year is missing', async () => {
        expect.assertions(1);

        try {
          await holidayapi.holidays({ country: 'US' });
        } catch (err) {
          expect(err.message).toMatch(/missing year/i);
        }
      });

      it('should error when both previous and upcoming', async () => {
        expect.assertions(1);

        try {
          await holidayapi.holidays({
            country: 'US',
            year: 2019,
            previous: true,
            upcoming: true,
          });
        } catch (err) {
          expect(err.message).toMatch(/previous and upcoming/i);
        }
      });

      it('should raise 4xx errors', async () => {
        const expectedResponse = {
          status: 429,
          error: 'Rate limit exceeded',
        };

        expect.assertions(1);
        mockRequest.get(`${basePath}&country=US&year=2019`)
          .reply(429, expectedResponse);

        try {
          await holidayapi.holidays({ country: 'US', year: 2019 });
        } catch (err) {
          expect(err.message).toMatch(/rate limit exceeded/i);
        }
      });

      it('should raise 5xx errors', async () => {
        expect.assertions(1);
        mockRequest.get(`${basePath}&country=US&year=2019`).reply(500);

        try {
          await holidayapi.holidays({ country: 'US', year: 2019 });
        } catch (err) {
          expect(err.message).toMatch(/internal server error/i);
        }
      });
    });

    describe('/v1/languages', () => {
      const basePath = `/languages?key=${key}`;

      it('should return languages', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          languages: [
            {
              code: 'ar',
              name: 'Arabic',
            },
            {
              code: 'en',
              name: 'English',
            },
            {
              code: 'es',
              name: 'Spanish, Castilian',
            },
            {
              code: 'hi',
              name: 'Hindi',
            },
            {
              code: 'zh',
              name: 'Chinese (Simplified)',
            },
          ],
        };

        mockRequest.get(basePath).reply(200, expectedResponse);
        expect(await holidayapi.languages()).toStrictEqual(expectedResponse);
      });

      it('should return one language', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          languages: [
            {
              code: 'hi',
              name: 'Hindi',
            },
          ],
        };

        mockRequest.get(`${basePath}&language=hi`).reply(200, expectedResponse);
        expect(await holidayapi.languages({
          language: 'hi',
        })).toStrictEqual(expectedResponse);
      });

      it('should search languages', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          languages: [
            {
              code: 'hi',
              name: 'Hindi',
            },
            {
              code: 'zh',
              name: 'Chinese (Simplified)',
            },
          ],
        };

        mockRequest.get(`${basePath}&search=in`).reply(200, expectedResponse);
        expect(await holidayapi.languages({
          search: 'in',
        })).toStrictEqual(expectedResponse);
      });

      it('should raise 4xx errors', async () => {
        const expectedResponse = {
          status: 429,
          error: 'Rate limit exceeded',
        };

        expect.assertions(1);
        mockRequest.get(basePath).reply(429, expectedResponse);

        try {
          await holidayapi.languages();
        } catch (err) {
          expect(err.message).toMatch(/rate limit exceeded/i);
        }
      });

      it('should raise 5xx errors', async () => {
        expect.assertions(1);
        mockRequest.get(basePath).times(2).reply(500);

        try {
          await holidayapi.languages();
        } catch (err) {
          expect(err.message).toMatch(/internal server error/i);
        }
      });
    });

    describe('/v1/workday', () => {
      const basePath = `/workday?key=${key}`;

      it('should return workday', async () => {
        const expectedResponse = {
          status: 200,
          requests: {
            used: 1000,
            available: 9000,
            resets: '2019-10-01 00:00:00',
          },
          workday: [
            {
              date: '2019-07-16',
              weekday: {
                name: 'Tuesday',
                numeric: '2',
              },
            },
          ],
        };

        mockRequest.get(`${basePath}&country=US&start=2019-07-01&days=10`)
          .reply(200, expectedResponse);

        expect(await holidayapi.workday({
          country: 'US',
          start: '2019-07-01',
          days: 10,
        })).toStrictEqual(expectedResponse);
      });

      it('should error when country is missing', async () => {
        expect.assertions(1);

        try {
          await holidayapi.workday();
        } catch (err) {
          expect(err.message).toMatch(/missing country/i);
        }
      });

      it('should error when start is missing', async () => {
        expect.assertions(1);

        try {
          await holidayapi.workday({ country: 'US' });
        } catch (err) {
          expect(err.message).toMatch(/missing start date/i);
        }
      });

      it('should error when days is missing', async () => {
        expect.assertions(1);

        try {
          await holidayapi.workday({ country: 'US', start: '2019-07-01' });
        } catch (err) {
          expect(err.message).toMatch(/missing days/i);
        }
      });

      it('should error when days is negative', async () => {
        expect.assertions(1);

        try {
          await holidayapi.workday({ country: 'US', start: '2019-07-01', days: -10 });
        } catch (err) {
          expect(err.message).toMatch(/days must be 1 or more/i);
        }
      });

      it('should raise 4xx errors', async () => {
        const expectedResponse = {
          status: 429,
          error: 'Rate limit exceeded',
        };

        expect.assertions(1);
        mockRequest.get(`${basePath}&country=US&start=2019-07-01&days=10`)
          .reply(429, expectedResponse);

        try {
          await holidayapi.workday({ country: 'US', start: '2019-07-01', days: 10 });
        } catch (err) {
          expect(err.message).toMatch(/rate limit exceeded/i);
        }
      });

      it('should raise 5xx errors', async () => {
        expect.assertions(1);
        mockRequest.get(`${basePath}&country=US&start=2019-07-01&days=10`).reply(500);

        try {
          await holidayapi.workday({ country: 'US', start: '2019-07-01', days: 10 });
        } catch (err) {
          expect(err.message).toMatch(/internal server error/i);
        }
      });
    });
  });
});

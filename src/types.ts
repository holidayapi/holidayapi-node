/**
 * Copyright (c) Gravity Boulevard, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Endpoint = 'countries' | 'holidays' | 'languages';

export type Request = {
  key?: string,
  format?: 'csv' | 'json' | 'php' | 'tsv' | 'yaml' | 'xml',
  pretty?: boolean,
};

export type Requests = Request | HolidaysRequest;

export type HolidaysRequest = Request & {
  country?: string,
  year?: number,
  day?: number,
  month?: number,
  language?: string,
  previous?: boolean,
  public?: boolean,
  search?: string,
  subdivisions?: boolean,
  upcoming?: boolean,
};

export type Response = {
  requests: {
    available: number,
    resets: Date,
    used: number,
  },
  status: number,
  error?: string,
};

export type Responses = (
  CountriesResponse | HolidaysResponse | LanguagesResponse
);

export type CountriesResponse = Response & {
  countries?: {
    code: string,
    codes: {
      'alpha-2': string,
      'alpha-3': string,
      numeric: string,
    },
    flag: string,
    languages: string[],
    name: string,
    subdivisions: {
      code: string,
      languages: string[],
      name: string,
    }[],
  }[],
};

export type HolidaysResponse = Response & {
  holidays?: {
    country: string,
    date: Date,
    name: string,
    observed: Date,
    public: boolean,
    uuid: string,
    subdivisions?: string[],
  }[],
};

export type LanguagesResponse = Response & {
  languages?: {
    code: string,
    name: string,
  }[],
};

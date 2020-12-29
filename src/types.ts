/**
 * Copyright (c) Gravity Boulevard; LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Endpoint = 'countries' | 'holidays' | 'languages' | 'workday';

type Weekday = {
  name: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  numeric: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

type Request = {
  format?: 'csv' | 'json' | 'php' | 'tsv' | 'xml' | 'yaml';
  key?: string;
  pretty?: boolean;
  search?: string;
};

export type CountriesRequest = Request & {
  country?: string;
  public?: boolean;
};

export type HolidaysRequest = Request & {
  country?: string;
  day?: number;
  language?: string;
  month?: number;
  previous?: boolean;
  public?: boolean;
  subdivisions?: boolean;
  upcoming?: boolean;
  year?: number;
};

export type LanguagesRequest = Request & {
  language?: string;
};

export type WorkdayRequest = Request & {
  country?: string;
  start?: string;
  days?: number;
};

export type Response = {
  requests: {
    available: number;
    resets: Date;
    used: number;
  };
  status: number;
  error?: string;
};

export type CountriesResponse = Response & {
  countries?: {
    code: string;
    codes: {
      'alpha-2': string;
      'alpha-3': string;
      numeric: string;
    };
    flag: string;
    languages: string[];
    name: string;
    subdivisions: {
      code: string;
      languages: string[];
      name: string;
    }[];
    weekday: {
      date: Weekday;
      observed: Weekday;
    };
  }[];
};

export type HolidaysResponse = Response & {
  holidays?: {
    country: string;
    date: Date;
    name: string;
    observed: Date;
    public: boolean;
    uuid: string;
    subdivisions?: string[];
  }[];
};

export type LanguagesResponse = Response & {
  languages?: {
    code: string;
    name: string;
  }[];
};

export type WorkdayResponse = Response & {
  workday?: {
    date: Date;
    weekday: Weekday;
  }
};

export type Requests = (
  | CountriesRequest
  | HolidaysRequest
  | LanguagesRequest
  | WorkdayRequest
);

export type Responses = (
  | CountriesResponse
  | HolidaysResponse
  | LanguagesResponse
  | WorkdayResponse
);

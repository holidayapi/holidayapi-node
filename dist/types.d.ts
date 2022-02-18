export declare type Endpoint = 'countries' | 'holidays' | 'languages' | 'workday' | 'workdays';
export declare type Weekday = {
    name: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    numeric: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};
declare type Request = {
    format?: 'csv' | 'json' | 'php' | 'tsv' | 'xml' | 'yaml';
    key?: string;
    pretty?: boolean;
    search?: string;
};
export declare type CountriesRequest = Request & {
    country?: string;
    public?: boolean;
};
export declare type HolidaysRequest = Request & {
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
export declare type LanguagesRequest = Request & {
    language?: string;
};
export declare type WorkdayRequest = Request & {
    country?: string;
    start?: string;
    days?: number;
};
export declare type WorkdaysRequest = Request & {
    country?: string;
    start?: string;
    end?: string;
};
export declare type Response = {
    requests: {
        available: number;
        resets: string;
        used: number;
    };
    status: number;
    error?: string;
};
export declare type CountriesResponse = Response & {
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
export declare type HolidaysResponse = Response & {
    holidays?: {
        country: string;
        date: string;
        name: string;
        observed: string;
        public: boolean;
        uuid: string;
        subdivisions?: string[];
    }[];
};
export declare type LanguagesResponse = Response & {
    languages?: {
        code: string;
        name: string;
    }[];
};
export declare type WorkdayResponse = Response & {
    workday?: {
        date: string;
        weekday: Weekday;
    };
};
export declare type WorkdaysResponse = Response & {
    workdays?: number;
};
export declare type Requests = (CountriesRequest | HolidaysRequest | LanguagesRequest | WorkdayRequest | WorkdaysRequest);
export declare type Responses = (CountriesResponse | HolidaysResponse | LanguagesResponse | WorkdayResponse | WorkdaysResponse);
export {};

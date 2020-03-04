export declare type Endpoint = 'countries' | 'holidays' | 'languages';
declare type Request = {
    format?: 'csv' | 'json' | 'php' | 'tsv' | 'yaml' | 'xml';
    key?: string;
    pretty?: boolean;
    search?: string;
};
export declare type Requests = CountriesRequest | HolidaysRequest | LanguagesRequest;
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
export declare type Response = {
    requests: {
        available: number;
        resets: Date;
        used: number;
    };
    status: number;
    error?: string;
};
export declare type Responses = (CountriesResponse | HolidaysResponse | LanguagesResponse);
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
    }[];
};
export declare type HolidaysResponse = Response & {
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
export declare type LanguagesResponse = Response & {
    languages?: {
        code: string;
        name: string;
    }[];
};
export {};

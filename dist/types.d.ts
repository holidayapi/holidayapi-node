export declare type Endpoint = 'countries' | 'holidays' | 'languages';
export declare type Request = {
    key?: string;
    format?: 'csv' | 'json' | 'php' | 'tsv' | 'yaml' | 'xml';
    pretty?: boolean;
};
export declare type Requests = Request | HolidaysRequest;
export declare type HolidaysRequest = Request & {
    country?: string;
    year?: number;
    day?: number;
    month?: number;
    language?: string;
    previous?: boolean;
    public?: boolean;
    search?: string;
    subdivisions?: boolean;
    upcoming?: boolean;
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

import { CountriesRequest, CountriesResponse, HolidaysResponse, HolidaysRequest, LanguagesRequest, LanguagesResponse } from './types';
export declare class HolidayAPI {
    baseUrl: string;
    key: string;
    constructor({ key, version }: {
        key?: string;
        version?: number;
    });
    private createUrl;
    private request;
    countries(request?: CountriesRequest): Promise<CountriesResponse>;
    holidays(request?: HolidaysRequest): Promise<HolidaysResponse>;
    languages(request?: LanguagesRequest): Promise<LanguagesResponse>;
}

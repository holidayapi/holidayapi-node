import { CountriesResponse, HolidaysResponse, HolidaysRequest, LanguagesResponse, Request } from './types';
export declare class HolidayAPI {
    baseUrl: string;
    key: string;
    constructor({ key, version }: {
        key?: string;
        version?: number;
    });
    private createUrl;
    private request;
    countries(request?: Request): Promise<CountriesResponse>;
    holidays(request?: HolidaysRequest): Promise<HolidaysResponse>;
    languages(request?: Request): Promise<LanguagesResponse>;
}

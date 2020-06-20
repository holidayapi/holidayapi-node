import { CountriesRequest, CountriesResponse, HolidaysRequest, HolidaysResponse, LanguagesRequest, LanguagesResponse, WorkdayRequest, WorkdayResponse } from './types';
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
    workday(request?: WorkdayRequest): Promise<WorkdayResponse>;
}

import { LocationRegions } from "./locations-data.interface";

export interface LocationCountryTranslated{
	code: string;
	regions?:Array<LocationRegions>;
    label:string;
}
export interface LocationTranslated {
    country : LocationCountryTranslated
}
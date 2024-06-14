
export interface LocationCountryProvider{
	code: string;
	regions?:Array<string>;
	label?:string;
}
export interface LocationProvider {
    country : LocationCountryProvider
}
// Creating an interface for the 'lastYearInvoice' object
export interface LastYearInvoice {
	amount: string;
	currency: string;
}

// Creating an interface for 'mainInternalCombustionEngine' and 'mainMineralProduct' objects
export interface MainProduct {
	name: string;
	lastYearInvoice: LastYearInvoice;
}

export interface MainRigidMaterial {
	name: string;
}

export interface CompanyDetail {
	name: string;
	numberEmployees: string;
	countries: string[];
	email: string;
	link: string;
}
export interface Co2Emission {
	mainInternalCombustionEngine: MainProduct;
	mainMineralProduct: MainProduct;
	mainRigidMaterial: MainRigidMaterial;
}

export interface Waste {
	mainCategoryNonInert: string;
}

export interface ToxicProduct {
	products: string[];
}

export interface WaterConsumption {
	mainActivity: string[];
	amount: string;
	lastYearInvoice: LastYearInvoice;
}
export interface SmeRecomendationRequest {
	companyDetail: CompanyDetail;
	co2Emission: Co2Emission;
	waste: Waste;
	toxicProduct: ToxicProduct;
	waterConsumption: WaterConsumption;
}

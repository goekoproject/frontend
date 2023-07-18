export interface MainProduct {
	name: string;
	lastYearInvoice: string;
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

export interface HazardousProduct {
	products: string[];
}

export interface WaterConsumption {
	mainActivity: string[];
	amount: string;
	lastYearInvoice: string;
}
export interface SmeRecomendationRequest {
	companyDetail: CompanyDetail;
	co2Emission: Co2Emission;
	waste: Waste;
	hazardousProduct: HazardousProduct;
	waterConsumption: WaterConsumption;
}

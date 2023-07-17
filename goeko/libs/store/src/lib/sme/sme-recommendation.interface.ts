export interface SmeRecomendation {
	co2EmissionResponse: Response[];
	toxicProductResponse: Response[];
	wasteResponse: Response[];
	waterConsumptionResponse: Response[];
}

export interface Response {
	companyDetail: CompanyDetailResponse;
	improvement?: Improvement;
	price: Price;
	solutionName: string;
}

export interface CompanyDetailResponse {
	countries: string[];
	email: string;
	link: string;
	name: string;
}

export interface Improvement {
	operationalCostReductionPercentage: number;
	paybackPeriodYears: number;
	reductionPercentage: number;
	smeOperationalCostReduction: Price;
	smeReduction: number;
}

export interface Price {
	amount: number;
	currency: string;
}


export interface ResponseRecommendations {
  ecosolutions: Recommendation[];
}

export interface Recommendation {
	id:string;
	approved: boolean;
	certified: boolean;
	classification: Classification;
	companyDetail: CompanyDetailOfEcosolution;
	countries: string[];
	description: string;
	detailedDescription: string;
	guarantee: boolean;
	guaranteeInYears?: number;
	improvement: ImprovementOfEcosolution;
	marketReady: boolean;
	paybackPeriodYears?: number;
	priceDescription?: string;
	solutionName: string;
	sustainableDevelopmentGoals: number[];
	pictures: PictureEcosolution[];
	locations: LocationsResponse[]
}
export interface LocationsResponse {
	country: SmeCountryResponse
}
export interface SmeCountryResponse {
	code: string;
	regions?:Array<ElementLocation>;
	label?:string;
}
export interface ElementLocation {
	code: string;
	label: string;
}



export interface Classification {
	mainCategory: string;
	products: string[];
	subCategory: string;
}

export interface CompanyDetailOfEcosolution {
	city: string;
	countries: string[];
	country: string;
	email: string;
	link: string;
	logo: string;
	name: string;
	id:string;
}

export interface ImprovementOfEcosolution {
	operationalCostReductionPercentage: ReductionPercentageOfEcosolution;
	reductionPercentage: ReductionPercentageOfEcosolution;
	smeOperationalCostReduction: SMEOperationalCostReduction;
	smeReduction: number;
}

export interface ReductionPercentageOfEcosolution {
	from: number;
	to: number;
}

export interface SMEOperationalCostReduction {
	amount: number;
	currency: string;
}
export interface PictureEcosolution {
	id: string;
	name: string;
	url: string;
}
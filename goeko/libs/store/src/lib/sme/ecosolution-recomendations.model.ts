export interface ResponseRecommendations {
	recommendations: Recommendation[];
}

export interface Recommendation {
	approved: boolean;
	certified: boolean;
	classification: Classification;
	companyDetail: CompanyDetailOfEcosolution;
	countries: string[];
	description: string;
	guarantee: boolean;
	guaranteeInYears?: number;
	improvement: ImprovementOfEcosolution;
	marketReady: boolean;
	paybackPeriodYears?: number;
	priceDescription?: string;
	solutionName: string;
	sustainableDevelopmentGoals: number[];
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

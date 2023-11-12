interface Price {
	amount: number;
	currency: string;
}

interface Improvement {
	reductionPercentage: number;
	operationalCostReductionPercentage: number;
}

interface Classification {
	mainCategory: string;
	subCategory: string;
	products: string[];
}

export interface NewEcosolutions {
	cleantechId: string;
	solutionName: string;
	classification: Classification;
	price?: Price;
	improvement?: Improvement;
	sustainableDevelopmentGoals?: number[];
	countries?: string[];
	paybackPeriodYears?: number;
	marketReady?: boolean;
	guarantee?: boolean;
	certified?: boolean;
	approved?: boolean;
}

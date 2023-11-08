interface Price {
	amount: number;
	currency: string;
}

interface Improvement {
	reductionPercentage: number;
}

interface Classification {
	mainCategory: string;
	subCategory: string;
	products: string[];
}

export interface NewEcosolutions {
	cleantechId: string;
	solutionName: string;
	price?: Price;
	improvement?: Improvement;
	sustainableDevelopmentGoals?: number[];
	classification: Classification;
}

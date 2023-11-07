export class CardEcosolutions {
	solutionName: string;
	products: string[];
	sustainableDevelopmentGoals: number[];

	constructor(dataEcosolutions: any) {
		this.solutionName = dataEcosolutions.solutionName;
		this.products = dataEcosolutions.classification?.products?.toString();
		this.sustainableDevelopmentGoals = dataEcosolutions.sustainableDevelopmentGoals;
	}
}

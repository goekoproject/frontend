import { NewEcosolutions } from '@goeko/store';
export interface GoalChecked {
	value: string;
	checked: boolean;
}
export class EcosolutionForm {
	solutionName: string;
	solutionDescription?: string;
	subCategory: string;
	products: string[];
	reductionPercentage?: number;
	operationalCostReductionPercentage?: number;
	sustainableDevelopmentGoals?: any[] | undefined;
	price?: number;
	deliverCountries?: string[];
	paybackPeriodYears?: number;
	marketReady?: boolean;
	guarantee?: boolean;
	certified?: boolean;
	approved?: boolean;

	constructor(ecosolution: NewEcosolutions) {
		this.solutionName = ecosolution.solutionName;
		this.solutionDescription = ecosolution.solutionDescription;
		this.subCategory = ecosolution.classification.subCategory;
		this.products = ecosolution.classification.products;
		this.reductionPercentage = ecosolution.improvement?.reductionPercentage;
		this.operationalCostReductionPercentage = ecosolution.improvement?.operationalCostReductionPercentage;
		this.sustainableDevelopmentGoals = ecosolution.sustainableDevelopmentGoals?.map((ods) => ({
			value: ods,
			checked: true,
		}));
		this.price = ecosolution.price?.amount;
		this.deliverCountries = ecosolution.countries;
		this.paybackPeriodYears = ecosolution.paybackPeriodYears;
		this.marketReady = ecosolution.marketReady;
		this.guarantee = ecosolution.guarantee;
		this.certified = ecosolution.certified;
		this.approved = ecosolution.approved;
	}
}

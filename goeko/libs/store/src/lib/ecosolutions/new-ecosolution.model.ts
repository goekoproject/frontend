import { CountrySelectOption } from '../constants/select-data.constants';

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

export class NewEcosolutionsBody implements NewEcosolutions {
	cleantechId: string;
	solutionName: string;
	classification: Classification;
	price?: Price | undefined;
	improvement?: Improvement | undefined;
	sustainableDevelopmentGoals?: number[] | undefined;
	countries?: string[] | undefined;
	paybackPeriodYears?: number | undefined;
	marketReady?: boolean | undefined;
	guarantee?: boolean | undefined;
	certified?: boolean | undefined;
	approved?: boolean | undefined;

	constructor(cleanTechId: string, mainCategory: string, formValue: any) {
		if (!formValue) {
			throw Error(`Missing form value for create ecosolutions`);
		}
		this.cleantechId = cleanTechId;
		this.solutionName = formValue.solutionName;
		this.price = {
			amount: formValue.price,
			currency: 'EUR',
		};
		this.improvement = {
			reductionPercentage: formValue.reductionPercentage,
			operationalCostReductionPercentage: formValue.operationalCostReductionPercentage,
		};
		this.sustainableDevelopmentGoals = this.getSustainableDevelopmentGoalsChecked(formValue);
		this.classification = {
			mainCategory: mainCategory,
			subCategory: formValue.subCategory?.controlName,
			products: formValue.products,
		};
		this.countries = formValue?.deliverCountries?.map((country: CountrySelectOption) => country.code);
		this.paybackPeriodYears = formValue?.paybackPeriodYears?.id;
		this.marketReady = formValue.marketReady;
		this.guarantee = formValue.guarantee;
		this.certified = formValue.certified;
		this.approved = formValue.approved;
	}

	getSustainableDevelopmentGoalsChecked(formValue: any) {
		return formValue.sustainableDevelopmentGoals
			.filter((goalChecked: { value: string; checked: boolean }) => goalChecked.checked)
			.map((goal: { value: string; checked: boolean }) => goal.value);
	}
}

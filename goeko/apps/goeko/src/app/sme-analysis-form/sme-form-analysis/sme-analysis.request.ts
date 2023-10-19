import { Classifications, SmeRecomendationRequest } from '@goeko/store';
import { Section } from '../form-field.model';

const formToClassificationsMapper = (formValue: Section) => {
	const classifications: Classifications[] = [];

	const isObject = (obj: unknown) => typeof obj === 'object' && obj !== null;

	Object.entries(formValue).map((value) => {
		let mainCategory!: string;
		let categoryClassification;

		value.forEach((category: any) => {
			if (isObject(category)) {
				Object.keys(category).forEach((index) => {
					const subCategory = index;
					if (!category[index]) {
						return;
					}
					const products = category[index].map((res: any) => res.id.toString());

					if (!products) {
						return;
					}
					categoryClassification = {
						mainCategory,
						subCategory,
						products,
					};
					classifications.push(categoryClassification);
				});
			} else {
				mainCategory = category;
			}
		});
	});

	return classifications;
};

interface Item {
	mainCategory: string;
	products: string[];
	subCategory: string;
}

export const transformArrayToObj = (arr: Item[]) => {
	const result: {
		[mainCategory: string]: {
			[subCategory: string]: string[];
		};
	} = {};

	const transformObej = (subCategory: string, products: string[]) => {
		return {
			[subCategory]: products,
		};
	};

	arr.forEach((item) => {
		const { subCategory, products } = item;
		if (!result[item.mainCategory]) {
			result[item.mainCategory] = transformObej(subCategory, products);
		} else if (!result[item.mainCategory][subCategory]) {
			result[item.mainCategory][subCategory] = products;
		}
	});

	return result;
};

export class FormValueToSmeAnalysisRequest implements SmeRecomendationRequest {
	smeId: string;
	classifications: Classifications[];
	constructor(smeId: string, formValue: Section) {
		this.smeId = smeId;
		this.classifications = formToClassificationsMapper(formValue);
	}
}

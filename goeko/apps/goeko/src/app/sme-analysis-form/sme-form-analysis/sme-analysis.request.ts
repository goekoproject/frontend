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
					const products = category[index];

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

export class FormValueToSmeAnalysisRequest implements SmeRecomendationRequest {
	smeId: string;
	classifications: Classifications[];
	constructor(smeId: string, formValue: Section) {
		this.smeId = smeId;
		this.classifications = formToClassificationsMapper(formValue);
	}
}

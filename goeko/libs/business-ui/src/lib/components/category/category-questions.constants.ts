import { CATEGORIES } from './category.enum';

export interface Field {
	controlName: string;
	type: string;
	textHelp: string;
	label: string; // for cleactech
	question?: string; // for question of sme
	hidden?: boolean;
}
export interface Section {
	id: string;
	searchName?: string;
	keyLang: string;
	status: STATUS_SECTION;
	icon?: string;
	fields?: Field[];
	controlName: CATEGORIES;
	showResult: boolean;
	checked?: boolean;
}

export enum STATUS_SECTION {
	COMPLETED = 'COMPLETED',
	INCOMPLETED = 'INCOMPLETED',
}
export const FORM_CATEGORIES_QUESTION: Section[] = [
	{
		id: 'co2-category-form',
		keyLang: 'CATEGORIES.co2Emission',
		controlName: CATEGORIES.CO2_EMISSION,
		status: STATUS_SECTION.COMPLETED,
		icon: 'co2',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'mainInternalCombustionEngine',
				type: 'badge-group',
				textHelp: '',
				label: 'CATEGORIES_LABEL.mainInternalCombustionEngine.label',
				question: 'CATEGORIES_LABEL.mainInternalCombustionEngine.question',
			},
			/* {
				controlName: 'fuelInvoice',
				type: 'number',
				textHelp: 'Fuel invoice the main combustion engine (2022)',
				question: 'CATEGORIES_LABEL.fuelInvoice',
				hidden: true,
			}, */
			{
				controlName: 'mainMineralProduct',
				type: 'badge-group',
				textHelp: 'cement, concrete, etc.',
				question: 'CATEGORIES_LABEL.mainMineralProduct.question',
				label: 'CATEGORIES_LABEL.mainMineralProduct.label',
			},
			/* 	{
				controlName: 'mainRigidMaterial',
				type: 'boolean',
				textHelp: '',
				question: 'CATEGORIES_LABEL.mainRigidMaterial',
			}, */
			/* 			{
				controlName: 'energySource',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.energySource.question',
				label: 'CATEGORIES_LABEL.energySource.label',
				hidden: true,
			}, */
			{
				controlName: 'sustainableBuildingOperations',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.sustainableBuildingOperations.question',
				label: 'CATEGORIES_LABEL.sustainableBuildingOperations.label',
			},
		],
	},
	{
		id: 'waste-category-form',
		keyLang: 'CATEGORIES.waste',
		controlName: CATEGORIES.WASTE,
		status: STATUS_SECTION.COMPLETED,
		icon: 'waste',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'mainCategoryNonInert',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.mainCategoryNonInert.question',
				label: 'CATEGORIES_LABEL.mainCategoryNonInert.label',
			},
			{
				controlName: 'inertOrMineralWaste',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.inertOrMineralWaste.question',
				label: 'CATEGORIES_LABEL.inertOrMineralWaste.label',
			},
			{
				controlName: 'greenWaste',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.greenWaste.question',
				label: 'CATEGORIES_LABEL.greenWaste.label',
			},
			{
				controlName: 'specialWaste',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.specialWaste.question',
				label: 'CATEGORIES_LABEL.specialWaste.label',
			},
			{
				controlName: 'hazardousWaste',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.hazardousWaste.question',
				label: 'CATEGORIES_LABEL.hazardousWaste.label',
			},
		],
	},
	{
		id: 'water-category-form',
		keyLang: 'CATEGORIES.water',
		controlName: CATEGORIES.WATER,
		status: STATUS_SECTION.COMPLETED,
		icon: 'water',
		showResult: true,
		checked: false,
		fields: [
			/* {
				controlName: 'amount',
				type: 'number',
				textHelp: '',
				question: 'CATEGORIES_LABEL.amount',
				hidden: true,
			},
			{
				controlName: 'lastYearInvoice',
				type: 'number',
				textHelp: '',
				question: 'CATEGORIES_LABEL.lastYearInvoice',
				hidden: true,
			}, */
			{
				controlName: 'mainActivity',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.mainActivity.question',
				label: 'CATEGORIES_LABEL.mainActivity.label',
			},
			{
				controlName: 'buildingOperation',
				type: 'badge-group',
				textHelp: 'buildingOperation_question',
				question: 'CATEGORIES_LABEL.buildingOperation.question',
				label: 'CATEGORIES_LABEL.buildingOperation.label',
			},
		],
	},
	{
		id: 'hp-category-form',
		keyLang: 'CATEGORIES.hazardousProduct',
		controlName: CATEGORIES.HAZARDOUS_PRODUCT,
		status: STATUS_SECTION.COMPLETED,
		icon: 'hp',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'products',
				type: 'badge-group',
				textHelp: '',
				question: 'CATEGORIES_LABEL.products.question',
				label: 'CATEGORIES_LABEL.products.label',
			},
		],
	},
	/* 	{
		keyLang: 'summary',
		status: STATUS_SECTION.COMPLETED,
		controlName: '',
		showResult: false,
		checked: false,
	},*/
];

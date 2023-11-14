import { CATEGORIES } from './category.enum';

export interface Field {
	controlName: string;
	type: string;
	textHelp: string;
	label: string;
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
		keyLang: 'CATEGORIES.co2emission',
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
				label: 'CATEGORIES_FIELD.mainInternalCombustionEngine',
			},
			/* {
				controlName: 'fuelInvoice',
				type: 'number',
				textHelp: 'Fuel invoice the main combustion engine (2022)',
				label: 'CATEGORIES_FIELD.fuelInvoice',
				hidden: true,
			}, */
			{
				controlName: 'mainMineralProduct',
				type: 'badge-group',
				textHelp: 'cement, concrete, etc.',
				label: 'CATEGORIES_FIELD.mainMineralProduct',
			},
			/* 	{
				controlName: 'mainRigidMaterial',
				type: 'boolean',
				textHelp: '',
				label: 'CATEGORIES_FIELD.mainRigidMaterial',
			}, */
			{
				controlName: 'energySource',
				type: 'badge-group',
				textHelp: '',
				label: 'CATEGORIES_FIELD.energySource',
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
				label: 'CATEGORIES_FIELD.mainCategoryNonInert',
			},
			{
				controlName: 'inertOrMineralWaste',
				type: 'badge-group',
				textHelp: '',
				label: 'CATEGORIES_FIELD.inertOrMineralWaste',
			},
			{
				controlName: 'greenWaste',
				type: 'badge-group',
				textHelp: '',
				label: 'CATEGORIES_FIELD.greenWaste',
			},
			{
				controlName: 'specialWaste',
				type: 'badge-group',
				textHelp: '',
				label: 'CATEGORIES_FIELD.specialWaste',
			},
			{
				controlName: 'hazardousWaste',
				type: 'badge-group',
				textHelp: '',
				label: 'CATEGORIES_FIELD.hazardousWaste',
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
				label: 'CATEGORIES_FIELD.amount',
				hidden: true,
			},
			{
				controlName: 'lastYearInvoice',
				type: 'number',
				textHelp: '',
				label: 'CATEGORIES_FIELD.lastYearInvoice',
				hidden: true,
			}, */
			{
				controlName: 'mainActivity',
				type: 'badge-group',
				textHelp: '',
				label: 'CATEGORIES_FIELD.mainActivity',
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
				label: 'CATEGORIES_FIELD.products',
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

import { Section } from './form-field.model';

export enum STATUS_SECTION {
	COMPLETED = 'COMPLETED',
	INCOMPLETED = 'INCOMPLETED',
}
export const FORM_FIELD_DEMO: Section[] = [
	{
		id: 'co2-category-form',
		keyLang: 'CATEGORIES.co2emission',
		controlName: 'co2Emission',
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
			{
				controlName: 'fuelInvoice',
				type: 'number',
				textHelp: 'Fuel invoice the main combustion engine (2022)',
				label: 'CATEGORIES_FIELD.fuelInvoice',
				hidden: true,
			},
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
		controlName: 'waste',
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
		controlName: 'waterConsumption',
		status: STATUS_SECTION.COMPLETED,
		icon: 'water',
		showResult: true,
		checked: false,
		fields: [
			{
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
			},
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
		controlName: 'hazardousProduct',
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

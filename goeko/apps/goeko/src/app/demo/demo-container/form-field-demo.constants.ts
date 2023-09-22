import { Section } from './form-field.model';

export enum STATUS_SECTION {
	COMPLETED = 'COMPLETED',
	INCOMPLETED = 'INCOMPLETED',
}
export const FORM_FIELD_DEMO: Section[] = [
	{
		keyLang: 'companyDetails',
		controlName: 'companyDetail',
		status: STATUS_SECTION.COMPLETED,
		icon: 'apartment',
		showResult: false,
		checked: false,
		fields: [
			{
				controlName: 'name',
				type: 'text',
				textHelp: '',
				label: 'FORM_LABEL.companyName',
			},
			/* 			{
				controlName: 'numberEmployees',
				type: 'number',
				textHelp: 'How many employees does your company have?',
				label: 'Number of employees',
			}, */
			{
				controlName: 'countries',
				type: 'select',
				textHelp: '',
				label: 'FORM_LABEL.country',
			},
			{
				controlName: 'email',
				type: 'text',
				textHelp: '',
				label: 'FORM_LABEL.email',
			},
			{
				controlName: 'link',
				type: 'text',
				textHelp: 'URL',
				label: 'FORM_LABEL.website',
			},
		],
	},
	{
		keyLang: 'CATEGORIES.co2emission',
		controlName: 'co2Emission',
		status: STATUS_SECTION.COMPLETED,
		icon: 'co2',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'mainInternalCombustionEngine',
				type: 'select-multiple',
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
				type: 'select-multiple',
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
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.energySource',
			},
		],
	},
	{
		keyLang: 'CATEGORIES.waste',
		controlName: 'waste',
		status: STATUS_SECTION.COMPLETED,
		icon: 'water_pump',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'mainCategoryNonInert',
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.mainCategoryNonInert',
			},
			{
				controlName: 'inertOrMineralWaste',
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.inertOrMineralWaste',
			},
			{
				controlName: 'greenWaste',
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.greenWaste',
			},
			{
				controlName: 'specialWaste',
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.specialWaste',
			},
			{
				controlName: 'hazardousWaste',
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.hazardousWaste',
			},
		],
	},
	{
		keyLang: 'CATEGORIES.water',
		controlName: 'waterConsumption',
		status: STATUS_SECTION.COMPLETED,
		icon: 'water_drop',
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
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.mainActivity',
			},
		],
	},
	{
		keyLang: 'CATEGORIES.hazardousProduct',
		controlName: 'hazardousProduct',
		status: STATUS_SECTION.COMPLETED,
		icon: 'science',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'products',
				type: 'select-multiple',
				textHelp: '',
				label: 'CATEGORIES_FIELD.products',
			},
		],
	},
	{
		keyLang: 'Summary',
		status: STATUS_SECTION.COMPLETED,
		controlName: '',
		showResult: false,
		checked: false,
	},
];

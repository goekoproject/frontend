import { Section } from './form-field.model';

export enum STATUS_SECTION {
	COMPLETED = 'COMPLETED',
	INCOMPLETED = 'INCOMPLETED',
}
export const FORM_FIELD_DEMO: Section[] = [
	{
		nameSection: 'Company details',
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
				label: 'Company name',
			},
			{
				controlName: 'numberEmployees',
				type: 'number',
				textHelp: 'How many employees does your company have?',
				label: 'Number of employees',
			},
			{
				controlName: 'countries',
				type: 'text',
				textHelp: '',
				label: 'Country',
			},
			{
				controlName: 'email',
				type: 'text',
				textHelp: '',
				label: 'Email',
			},
			{
				controlName: 'link',
				type: 'text',
				textHelp: 'URL',
				label: 'Website',
			},
		],
	},
	{
		nameSection: 'CO2 emissions',
		controlName: 'co2Emission',
		status: STATUS_SECTION.COMPLETED,
		icon: 'co2',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'mainInternalCombustionEngine',
				type: 'select',
				textHelp: '',
				label: 'Main internal combustion engine',
			},
			{
				controlName: 'fuelInvoice',
				type: 'number',
				textHelp: 'Fuel invoice the main combustion engine (2022)',
				label: 'Fuel invoice ',
				hidden: true,
			},
			{
				controlName: 'mainMineralProduct',
				type: 'select',
				textHelp: 'cement, concrete, etc.',
				label: ' Main mineral product purchased (2022)',
			},
			{
				controlName: 'mainRigidMaterial',
				type: 'boolean',
				textHelp: '',
				label: 'Does your company use insolation panels?',
			},
		],
	},
	{
		nameSection: 'Waste',
		controlName: 'waste',
		status: STATUS_SECTION.COMPLETED,
		icon: 'water_pump',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'mainCategoryNonInert',
				type: 'select',
				textHelp: '',
				label: 'Main category of non-inert waste (2022)',
			},
		],
	},
	{
		nameSection: 'Water',
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
				label: 'Water consumption (2022)',
				hidden: true,
			},
			{
				controlName: 'lastYearInvoice',
				type: 'number',
				textHelp: '',
				label: 'Water invoice (2022)',
				hidden: true,
			},
			{
				controlName: 'mainActivity',
				type: 'select',
				textHelp: '',
				label: 'Activity that consumes the most',
			},
		],
	},
	{
		nameSection: 'Hazardous product',
		controlName: 'hazardousProduct',
		status: STATUS_SECTION.COMPLETED,
		icon: 'science',
		showResult: true,
		checked: false,
		fields: [
			{
				controlName: 'products',
				type: 'select',
				textHelp: '',
				label: 'Type of hazardous product',
			},
		],
	},
	{
		nameSection: 'Summary',
		status: STATUS_SECTION.COMPLETED,
		controlName: '',
		showResult: false,
		checked: false,
	},
];

import { Section } from './form-field.model';

export enum STATUS_SECTION {
	COMPLETED = 'COMPLETED',
	INCOMPLETED = 'INCOMPLETED',
}
export const FORM_FIELD_DEMO: Section[] = [
	{
		nameSection: 'Company details',
		controlName: 'companyDetails',
		status: STATUS_SECTION.COMPLETED,
		icon: 'apartment',
		fields: [
			{
				controlName: 'nameCompany',
				type: 'text',
				textHelp: '',
				label: 'Name Company',
			},
			{
				controlName: 'numberEmployees',
				type: 'text',
				textHelp: '¿How many employees does your company have?',
				label: 'Number of employee',
			},
			{
				controlName: 'country',
				type: 'text',
				textHelp: '',
				label: 'Country',
			},
			{
				controlName: 'contact',
				type: 'text',
				textHelp: '',
				label: 'Contact link',
			},
		],
	},
	{
		nameSection: 'CO2 emissions',
		controlName: 'emissions',
		status: STATUS_SECTION.COMPLETED,
		icon: 'co2',
		fields: [
			{
				controlName: 'internalCombustion',
				type: 'text',
				textHelp: '',
				label: 'Main internal combustion engine',
			},
			{
				controlName: 'fuelInvoice',
				type: 'text',
				textHelp: 'Fuel invoice the main combustion engine (2022)',
				label: 'Fuel invoice ',
			},
			{
				controlName: 'ammountMineral',
				type: 'text',
				textHelp: 'cement, concrete, etc.',
				label: 'Total amount of mineral product purchased (2022)',
			},
			{
				controlName: 'mineralProduct',
				type: 'text',
				textHelp: '',
				label: 'Main mineral product purchased (2022)',
			},
		],
	},
	{
		nameSection: 'Waste',
		controlName: 'waste',
		status: STATUS_SECTION.COMPLETED,
		icon: 'water_pump',
		fields: [
			{
				controlName: 'mainCategory',
				type: 'text',
				textHelp: '',
				label: 'Main category of non-inert waste (2022)',
			},
		],
	},
	{
		nameSection: 'Water',
		controlName: 'water',
		status: STATUS_SECTION.COMPLETED,
		icon: 'water_drop',
		fields: [
			{
				controlName: 'waterConsumption',
				type: 'text',
				textHelp: '',
				label: 'Water consumption (2022)',
			},
			{
				controlName: 'waterInvoice',
				type: 'text',
				textHelp: '',
				label: 'Water invoice (2022)',
			},
			{
				controlName: 'mostActivity',
				type: 'text',
				textHelp: '',
				label: 'Activity more that consume',
			},
		],
	},
	{
		nameSection: 'Toxic product',
		controlName: 'toxicProduct',
		status: STATUS_SECTION.COMPLETED,
		icon: 'science',
		fields: [
			{
				controlName: 'hazardousProduct',
				type: 'text',
				textHelp: '',
				label: 'Types of hazardous product',
			},
		],
	},
	{
		nameSection: 'Summary',
		status: STATUS_SECTION.COMPLETED,
		controlName: '',
	},
];

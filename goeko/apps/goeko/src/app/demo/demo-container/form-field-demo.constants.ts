export enum STATUS_SECTION {
	COMPLETED = 'COMPLETED',
	INCOMPLETED = 'INCOMPLETED',
}
export const FORM_FIELD_DEMO = [
	{
		nameSection: 'Company details',
		status: STATUS_SECTION,
		icon: 'apartment',
		fields: [
			{
				control: 'nameCompany',
				type: 'text',
				textHelp: '',
				label: 'Name Company',
			},
			{
				control: 'numberEmployees',
				type: 'text',
				textHelp: '¿How many employees does your company have?',
				label: 'Number of employee',
			},
			{
				control: 'country',
				type: 'text',
				textHelp: '',
				label: 'Country',
			},
			{
				control: 'Contact link',
				type: 'text',
				textHelp: '',
				label: 'Contact link',
			},
		],
	},
	{
		nameSection: 'CO2 emissions',
		status: STATUS_SECTION,
		icon: 'co2',
		fields: [
			{
				control: '  ',
				type: 'text',
				textHelp: '',
				label: 'Main internal combustion engine',
			},
			{
				control: 'numberEmployees',
				type: 'text',
				textHelp: 'Fuel invoice the main combustion engine (2022)',
				label: 'Fuel invoice ',
			},
			{
				control: 'country',
				type: 'text',
				textHelp: 'cement, concrete, etc.',
				label: 'Total amount of mineral product purchased (2022)',
			},
			{
				control: 'Contact link',
				type: 'text',
				textHelp: '',
				label: 'Main mineral product purchased (2022)',
			},
		],
	},
	{
		nameSection: 'Waste',
		status: STATUS_SECTION,
		icon: 'water_pump',
		fields: [
			{
				control: '  ',
				type: 'text',
				textHelp: '',
				label: 'Main category of non-inert waste (2022)',
			},
		],
	},
	{
		nameSection: 'Water',
		status: STATUS_SECTION,
		icon: 'water_drop',
		fields: [
			{
				control: '  ',
				type: 'text',
				textHelp: '',
				label: 'Water consumption (2022)',
			},
			{
				control: '  ',
				type: 'text',
				textHelp: '',
				label: 'Water invoice (2022)',
			},
			{
				control: '  ',
				type: 'text',
				textHelp: '',
				label: 'Activity more that consume',
			},
		],
	},
	{
		nameSection: 'Toxic product',
		status: STATUS_SECTION,
		icon: 'science',
		fields: [
			{
				control: '  ',
				type: 'text',
				textHelp: '',
				label: 'Types of hazardous product',
			},
		],
	},
	{
		nameSection: 'Summary',
		status: STATUS_SECTION,
		fields: [
			{
				type: 'readonly',
				textHelp: '',
				label: 'Types of hazardous product',
			},
		],
	},
];

export interface FooterInfo {
	title: string;
	elements: Elements[];
}
export interface Elements {
	title: string;
	url: string;
	logo?: string;
}

export const FOOTER_INFO = [
	{
		title: 'Service',
		elements: [
			{
				title: 'Transition ecology',
				url: '',
			},
		],
	},

	{
		title: 'Resources',
		elements: [
			{
				title: 'WhitePapers',
				url: '',
			},
		],
	},

	{
		title: 'Contact',
		elements: [
			{
				title: 'info@goeko.com',
				url: '',
				logo: 'mail',
			},
			{
				title: '999999999',
				url: '',
				logo: 'settings_phone',
			},
		],
	},
];

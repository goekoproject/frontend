export interface MenuUser {
	// RANDOMuuid FORMAT `${string}-${string}-${string}-${string}-${string}`
	id: string;
	title: string;
	url: string;
	active: boolean;
	icon: string;
}
export const MENU_USER_SME: MenuUser[] = [
	{
		id: window.crypto.randomUUID(),
		title: 'MENU_USER.dashboard',
		url: '/dashboard/sme',
		active: true,
		icon: 'home',
	},
	{
		id: window.crypto.randomUUID(),

		title: 'profile',
		url: 'profile',
		active: true,
		icon: 'user-square-rounded',
	},
	{
		id: window.crypto.randomUUID(),
		title: 'analysis',
		url: 'sme-analysis/new',
		active: true,
		icon: 'ti ti-analyze-filled',
	},
	{
		id: window.crypto.randomUUID(),
		title: 'MENU_USER.favorites',
		url: 'favorite',
		active: true,
		icon: 'heart',
	},
];

export const MENU_USER_CLEANTECH: MenuUser[] = [
	{
		id: window.crypto.randomUUID(),
		title: 'MENU_USER.dashboard',
		url: '/dashboard/cleantech',
		active: true,
		icon: 'home',
	},
	{
		id: window.crypto.randomUUID(),
		title: 'profile',
		url: 'profile',
		active: true,
		icon: 'user-square-rounded',
	},
	{
		id: window.crypto.randomUUID(),
		title: 'Ecosolutions',
		url: 'cleantech-ecosolutions',
		active: true,
		icon: 'solar-panel-2',
	},
];

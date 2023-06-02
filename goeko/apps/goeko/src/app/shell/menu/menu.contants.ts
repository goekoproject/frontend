import { IMenu } from './menu.interface';

let _id = Math.random();
export const MENU: IMenu[] = [
	{
		id: ++_id,
		title: 'About GoEko',
		url: '',
		type: 'text',
	},
	{
		id: ++_id,
		title: 'Blog',
		url: '',
		type: 'text',
	},
	{
		id: ++_id,
		title: 'Contact us',
		url: '',
		type: 'text',
	},
	{
		id: ++_id,
		title: 'Login',
		url: '',
		type: 'button',
	},
];

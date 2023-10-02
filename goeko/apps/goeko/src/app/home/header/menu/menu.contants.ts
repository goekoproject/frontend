import { IMenu } from './menu.interface';

let _id = Math.random();
export const MENU: IMenu[] = [
	{
		id: ++_id,
		keyLang: 'MENU.aboutGoEKo',
		url: '',
		type: 'text',
	},
	{
		id: ++_id,
		keyLang: 'MENU.blog',
		url: '',
		type: 'text',
	},
	{
		id: ++_id,
		keyLang: 'MENU.contanctUs',
		url: '',
		type: 'text',
	},
];

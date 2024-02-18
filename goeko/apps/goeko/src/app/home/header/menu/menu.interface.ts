export interface IMenu {
	id: string;
	code: string;
	keyLang: string;
	url: string;
	className?: string;
	type: 'text' | 'button';
	submenu?: any[]
}

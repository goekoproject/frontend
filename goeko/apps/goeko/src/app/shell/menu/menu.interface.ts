export interface IMenu {
	id: number;
	keyLang: string;
	url: string;
	className?: string;
	type: 'text' | 'button';
}

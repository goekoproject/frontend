export interface Team {
	name: string;
	photo: string;
	rating: string;
	active: boolean;
}

export const TEAMS: Team[] = [
	{
		name: 'Raphael Herrera',
		photo: 'funder-mock.webp',
		rating: 'Founder',
		active: true,
	},
	{
		name: 'Daniel Eskenazi',
		photo: 'mandela-mock.jpg',
		rating: 'Founder',
		active: false,
	},
];

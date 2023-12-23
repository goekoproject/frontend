export interface Team {
	name: string;
	photo: string;
	rating: string;
	active: boolean;
}

export const TEAMS: Team[] = [
	{
		name: 'Raphael Herrera',
		photo: 'mock-team.jpg',
		rating: 'Founder',
		active: true,
	},
	{
		name: 'Daniel Eskenazi',
		photo: 'mock-team.jpg',
		rating: 'Founder',
		active: false,
	},
];

export enum CATEGORIES {
	CO2_EMISSION = 'co2emission',
	HAZARDOUS_PRODUCT = 'hazardousProduct',
	WASTE = 'waste',
	WATER = 'water',
}

export const CATEGORY_SECTION = [
	{
		id: 'icon-catagory-co2',
		icon: 'co2',
		keyLang: 'CATEGORIES.co2emission',
		code: CATEGORIES.CO2_EMISSION,
	},
	{
		id: 'icon-catagory-waste',
		icon: 'waste',
		keyLang: 'CATEGORIES.waste',
		code: CATEGORIES.WASTE,
	},
	{
		id: 'icon-catagory-water',
		icon: 'water',
		keyLang: 'CATEGORIES.water',
		code: CATEGORIES.WATER,
	},
	{
		id: 'icon-catagory-hp',
		icon: 'hp',
		keyLang: 'CATEGORIES.hazardousProduct',
		code: CATEGORIES.HAZARDOUS_PRODUCT,
	},
];

export const SelectMainInternalCombustionEngine = [
	{ id: 1, title: 'Equipment carrier truck' },
	{ id: 2, title: 'Materials carrier truck' },
	{ id: 3, title: 'Loader' },
	{ id: 4, title: 'Backhoe' },
	{ id: 5, title: 'Backhoe loader' },
	{ id: 6, title: 'Aerial bucket truck' },
	{ id: 7, title: 'Bulldozer' },
	{ id: 8, title: 'Scraper' },
	{ id: 9, title: 'Steam roller' },
	{ id: 10, title: 'Dumper' },
	{ id: 11, title: 'Grader' },
	{ id: 12, title: 'Other' },
];

export const SelectMainMineralProduct = [
	{ id: 1, title: 'Cement' },
	{ id: 2, title: 'Concrete' },
];

export const SelectMainRigidMaterial = [{ id: 1, title: 'Insolation panels' }];

export const SelectMainCategoryNonInert = [
	{ id: 1, title: 'Metals and alloys' },
	{ id: 2, title: 'Untreated wood' },
	{ id: 3, title: 'Paper and cardboard' },
	{ id: 4, title: 'Plastic' },
	{ id: 5, title: 'Mineral wools' },
	{ id: 6, title: 'Paint, varnish, glue' },
	{ id: 7, title: 'Cartridges without toxic products' },
	{ id: 8, title: 'Electrical and electronic equipment' },
	{ id: 9, title: 'Plaster' },
];
export const SelectMainActivity = [
	{ id: 1, title: 'Site cleaning', value: 'siteCleaning' },
	{ id: 2, title: 'Cleaning site vehicles' },
	{ id: 3, title: 'Tool cleaning' },
	{ id: 4, title: 'Pouring concrete' },
	{ id: 5, title: 'Site hut' },
	{ id: 6, title: 'Paint' },
];
export const SelectProducts = [
	{ id: 1, title: 'Aerosol', value: 'aerosol' },
	{ id: 2, title: 'Accumulators and batteries containing dangerous substances', value: 'batteries' },
	{ id: 3, title: 'Wood treated with hazardous substances' },
	{ id: 4, title: 'Packaging soiled with dangerous substances' },
	{ id: 5, title: 'Oil separator sludge' },
	{ id: 6, title: 'Cartridges containing dangerous substances' },
	{ id: 7, title: 'Products containing tar' },
	{ id: 8, title: 'Energy-saving lamps' },
	{ id: 9, title: 'Electrical and electronic waste containing hazardous substances' },
	{ id: 10, title: 'Paint/varnish' },
];
export const DataSelect = {
	mainInternalCombustionEngine: SelectMainInternalCombustionEngine,
	mainMineralProduct: SelectMainMineralProduct,
	mainRigidMaterial: SelectMainRigidMaterial,
	mainCategoryNonInert: SelectMainCategoryNonInert,
	mainActivity: SelectMainActivity,
	products: SelectProducts,
};

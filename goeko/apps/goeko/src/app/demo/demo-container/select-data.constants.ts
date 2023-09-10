export const SelectMainInternalCombustionEngine = [
	{ id: 1, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.equipmentCarrierTruck' },
	{ id: 2, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.materialsCarrierTruck' },
	{ id: 3, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.loader' },
	{ id: 4, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.backhoe' },
	{ id: 5, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.backhoeLoader' },
	{ id: 6, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.aerialBucketTruck' },
	{ id: 7, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.bulldozer' },
	{ id: 8, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.scraper' },
	{ id: 9, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.steamRoller' },
	{ id: 10, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.dumper' },
	{ id: 11, keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.grader' },
];
export const SelectMainMineralProduct = [
	{ id: 1, keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.cement' },
	{ id: 2, keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.concrete' },
];

export const SelectMainRigidMaterial = [{ id: 1, title: 'SELECT_DATA_LABEL.Insolation panels' }];

export const SelectMainCategoryNonInert = [
	{ id: 1, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.metalsAndAlloys' },
	{ id: 2, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.untreatedWood' },
	{ id: 3, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.paperAndCardboard' },
	{ id: 4, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plastic' },
	{ id: 5, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.mineralWools' },
	{ id: 6, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.paintVarnishGlue' },
	{ id: 7, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.cartridgesWithoutToxicProducts' },
	{ id: 8, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.electricalAndElectronicEquipment' },
	{ id: 9, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plaster' },
];
export const SelectMainActivity = [
	{ id: 1, keyLang: 'SELECT_DATA_LABEL.selectMainActivity.siteCleaning' },
	{ id: 2, keyLang: 'SELECT_DATA_LABEL.selectMainActivity.cleaningSiteVehicles' },
	{ id: 3, keyLang: 'SELECT_DATA_LABEL.selectMainActivity.toolCleaning' },
	{ id: 4, keyLang: 'SELECT_DATA_LABEL.selectMainActivity.pouringConcrete' },
	{ id: 5, keyLang: 'SELECT_DATA_LABEL.selectMainActivity.siteHut' },
	{ id: 6, keyLang: 'SELECT_DATA_LABEL.selectMainActivity.paint' },
];
export const SelectProducts = [
	{ id: 1, keyLang: 'SELECT_DATA_LABEL.selectProducts.aerosol' },
	{ id: 2, keyLang: 'SELECT_DATA_LABEL.selectProducts.batteries' },
	{ id: 3, keyLang: 'SELECT_DATA_LABEL.selectProducts.woodTreatedWithHazardousSubstances' },
	{ id: 4, keyLang: 'SELECT_DATA_LABEL.selectProducts.packagingSoiledWithDangerousSubstances' },
	{ id: 5, keyLang: 'SELECT_DATA_LABEL.selectProducts.oilSeparatorSludge' },
	{ id: 6, keyLang: 'SELECT_DATA_LABEL.selectProducts.cartridgesContainingDangerousSubstances' },
	{ id: 7, keyLang: 'SELECT_DATA_LABEL.selectProducts.productsContainingTar' },
	{ id: 8, keyLang: 'SELECT_DATA_LABEL.selectProducts.energySavingLamps' },
	{ id: 9, keyLang: 'SELECT_DATA_LABEL.selectProducts.electricalAndElectronicWasteContainingHazardousSubstances' },
	{ id: 10, keyLang: 'SELECT_DATA_LABEL.selectProducts.paintVarnish' },
];
export const SelectEnergySource = [
	{ id: 1, keyLang: 'SELECT_DATA_LABEL.selectEnergySource.aSmartManagementSystemOptimisingEnergyConsumption' },
	{
		id: 2,
		keyLang: 'SELECT_DATA_LABEL.selectEnergySource.greenSolutionProducingTheEnergyForYourBuildingOrActivityNeeds',
	},
];
export const DataSelect = {
	mainInternalCombustionEngine: SelectMainInternalCombustionEngine,
	mainMineralProduct: SelectMainMineralProduct,
	mainRigidMaterial: SelectMainRigidMaterial,
	mainCategoryNonInert: SelectMainCategoryNonInert,
	mainActivity: SelectMainActivity,
	products: SelectProducts,
	energySource: SelectEnergySource,
};

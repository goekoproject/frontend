export interface DataSelectOption {
	id: string | number;
	keyLang: string;
}

export const SelectMainInternalCombustionEngine: DataSelectOption[] = [
	{
		id: 'equipmentCarrierTruck',
		keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.equipmentCarrierTruck',
	},
	{
		id: 'materialsCarrierTruck',
		keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.materialsCarrierTruck',
	},
	{ id: 'loader', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.loader' },
	{ id: 'backhoe', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.backhoe' },
	{ id: 'backhoeLoader', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.backhoeLoader' },
	{ id: 'aerialBucketTruck', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.aerialBucketTruck' },
	{ id: 'bulldozer', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.bulldozer' },
	{ id: 'scraper', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.scraper' },
	{ id: 'steamRoller', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.steamRoller' },
	{ id: 'dumper', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.dumper' },
	{ id: 'grader', keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.grader' },
];
export const SelectMainMineralProduct: DataSelectOption[] = [
	{ id: 'cement', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.cement' },
	{ id: 'concrete', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.concrete' },
	{ id: 'isolation', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.isolation' },
	{ id: 'iron', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.iron' },
	{ id: 'steel', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.steel' },
];

export const SelectMainRigidMaterial: DataSelectOption[] = [
	{ id: 'mainRigidMaterial', keyLang: 'SELECT_DATA_LABEL.insolationPanels' },
];

export const SelectMainCategoryNonInert: DataSelectOption[] = [
	{ id: 'metalsAndAlloys', keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.metalsAndAlloys' },
	{ id: 'untreatedWood', keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.untreatedWood' },
	{ id: 'plastic', keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plastic' },
	{ id: 'plaster', keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plaster' },

	/* 	{ id: 5, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.mineralWools' },
	 */
	{ id: 'insulationMaterials', keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.insulationMaterials' },
	{ id: 'cardboardAndPaper', keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.cardboardAndPaper' },
	/* 	{ id: 7, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.cartridgesWithoutToxicProducts' },
	{ id: 8, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.electricalAndElectronicEquipment' }, */
	/* 	{ id: 9, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plaster' }, */
];
export const SelectMainActivity: DataSelectOption[] = [
	{ id: 'siteCleaning', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.siteCleaning' },
	{ id: 'cleaningSiteVehicles', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.cleaningSiteVehicles' },
	{ id: 'toolCleaning', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.toolCleaning' },
	{ id: 'pouringConcrete', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.pouringConcrete' },
	{ id: 'siteHut', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.siteHut' },
	{ id: 'paint', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.paint' },
	{ id: 'wateringForCure', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.wateringForCure' },
	{
		id: 'cleaningOfSiteAndPeripheryAccesses',
		keyLang: 'SELECT_DATA_LABEL.selectMainActivity.cleaningOfSiteAndPeripheryAccesses',
	},
	{ id: 'wateringPlants', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.wateringPlants' },
];
export const SelectProducts: DataSelectOption[] = [
	{ id: 'aerosol', keyLang: 'SELECT_DATA_LABEL.selectProducts.aerosol' },
	{ id: 'productsContainingTar', keyLang: 'SELECT_DATA_LABEL.selectProducts.productsContainingTar' },
	/* 	{ id: 2, keyLang: 'SELECT_DATA_LABEL.selectProducts.batteries' },
	 */
	{
		id: 'woodTreatedWithHazardousSubstances',
		keyLang: 'SELECT_DATA_LABEL.selectProducts.woodTreatedWithHazardousSubstances',
	},
	/* 	{ id: 4, keyLang: 'SELECT_DATA_LABEL.selectProducts.packagingSoiledWithDangerousSubstances' },
 { id: 5, keyLang: 'SELECT_DATA_LABEL.selectProducts.oilSeparatorSludge' },	
	{ id: 6, keyLang: 'SELECT_DATA_LABEL.selectProducts.cartridgesContainingDangerousSubstances' },
	{ id: 8, keyLang: 'SELECT_DATA_LABEL.selectProducts.energySavingLamps' },
	{ id: 9, keyLang: 'SELECT_DATA_LABEL.selectProducts.electricalAndElectronicWasteContainingHazardousSubstances' }*/
	{ id: 'paintVarnish', keyLang: 'SELECT_DATA_LABEL.selectProducts.paintVarnish' },
	{ id: 'fuel', keyLang: 'SELECT_DATA_LABEL.selectProducts.fuel' },
	{ id: 'oils', keyLang: 'SELECT_DATA_LABEL.selectProducts.oils' },
	{ id: 'curingProducts', keyLang: 'SELECT_DATA_LABEL.selectProducts.curingProducts' },
	{ id: 'admixtures', keyLang: 'SELECT_DATA_LABEL.selectProducts.admixtures' },
	{
		id: 'bituminousProductsContainingHAPs',
		keyLang: 'SELECT_DATA_LABEL.selectProducts.bituminousProductsContainingHAPs',
	},
];
export const SelectEnergySource: DataSelectOption[] = [
	{
		id: 'aSmartManagementSystemOptimisingEnergyConsumption',
		keyLang: 'SELECT_DATA_LABEL.selectEnergySource.aSmartManagementSystemOptimisingEnergyConsumption',
	},
	{
		id: 'greenSolutionProducingTheEnergyForYourBuildingOrActivityNeeds',
		keyLang: 'SELECT_DATA_LABEL.selectEnergySource.greenSolutionProducingTheEnergyForYourBuildingOrActivityNeeds',
	},
	{ id: 'energySource-none', keyLang: 'none' },
];

export const SelectCountry = [
	{ id: 'france', keyLang: 'SELECT_DATA_LABEL.selectCountry.france' },
	{ id: 'germany', keyLang: 'SELECT_DATA_LABEL.selectCountry.germany' },
	{ id: 'italy', keyLang: 'SELECT_DATA_LABEL.selectCountry.italy' },
	{ id: 'spain', keyLang: 'SELECT_DATA_LABEL.selectCountry.spain' },
	{ id: 'switzerland', keyLang: 'SELECT_DATA_LABEL.selectCountry.switzerland' },
];

// Resultado de la constante SelectInertOrMineralWaste
export const SelectInertOrMineralWaste: DataSelectOption[] = [
	{ id: 'concrete', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.concrete' },
	{ id: 'brick', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.brick' },
	{ id: 'stone', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.stone' },
	{ id: 'soil', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.soil' },
	{ id: 'ceramic', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.ceramic' },
];

// Resultado de la constante GreenWaste
export const SelectGreenWaste: DataSelectOption[] = [
	{ id: 'greenWoodUntreated', keyLang: 'SELECT_DATA_LABEL.greenWaste.greenWoodUntreated' },
	{ id: 'topsoil', keyLang: 'SELECT_DATA_LABEL.greenWaste.topsoil' },
];

// Resultado de la constante SelectSpecialWaste
export const SelectSpecialWaste: DataSelectOption[] = [
	{ id: 'paintsAndSolvents', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.paintsAndSolvents' },
	{ id: 'usedOils', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.usedOils' },
	{ id: 'batteriesAndAccumulators', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.batteriesAndAccumulators' },
	{
		id: 'fluorescentTubesEnergySavingBulbsNeonTubes',
		keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.fluorescentTubesEnergySavingBulbsNeonTubes',
	},
	/* 	{ id: 'aerosols', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.aerosols' },
	 */ {
		id: 'electricalAndElectronicEquipmentPCB',
		keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.electricalAndElectronicEquipmentPCB',
	},
	{
		id: 'cartridgesSealantChemicalCaulking',
		keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.cartridgesSealantChemicalCaulking',
	},
	{ id: 'treatedWood', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.treatedWood' },

	{ id: 'polyurethaneFoams', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.polyurethaneFoams' },
	{ id: 'asbestos', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.asbestos' },
	{ id: 'agglomeratedConcrete', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.agglomeratedConcrete' },
	{ id: 'agglomeratedCementPanels', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.agglomeratedCementPanels' },
	{ id: 'rubberProducts', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.rubberProducts' },
];

// Resultado de la constante SelectHazardousWaste
export const SelectHazardousWaste: DataSelectOption[] = [
	{
		id: 'productsContainingHeavyMetals',
		keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.productsContainingHeavyMetals',
	},
	{ id: 'productsContainingTar', keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.productsContainingTar' },
	{ id: 'oilSeparatorSludge', keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.oilSeparatorSludge' },
];

export const DataSelect = {
	mainInternalCombustionEngine: SelectMainInternalCombustionEngine,
	mainMineralProduct: SelectMainMineralProduct,
	mainRigidMaterial: SelectMainRigidMaterial,
	mainCategoryNonInert: SelectMainCategoryNonInert,
	mainActivity: SelectMainActivity,
	products: SelectProducts,
	energySource: SelectEnergySource,
	countries: SelectCountry,
	inertOrMineralWaste: SelectInertOrMineralWaste,
	greenWaste: SelectGreenWaste,
	specialWaste: SelectSpecialWaste,
	hazardousWaste: SelectHazardousWaste,
};

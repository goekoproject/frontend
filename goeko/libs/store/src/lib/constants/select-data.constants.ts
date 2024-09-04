export interface DataSelectOption {
  id: string | number
  keyLang: string
}

export interface CountrySelectOption extends DataSelectOption {
  code: string
}

export interface ReductionPercentageSelectOption extends DataSelectOption {
  from: number
  to: number | string
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
  {
    id: 'loader',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.loader',
  },
  {
    id: 'backhoe',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.backhoe',
  },
  {
    id: 'backhoeLoader',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.backhoeLoader',
  },
  {
    id: 'aerialBucketTruck',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.aerialBucketTruck',
  },
  {
    id: 'bulldozer',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.bulldozer',
  },
  {
    id: 'scraper',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.scraper',
  },
  {
    id: 'steamRoller',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.steamRoller',
  },
  {
    id: 'dumper',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.dumper',
  },
  {
    id: 'grader',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.grader',
  },

  {
    id: 'slicer',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.slicer',
  },
  {
    id: 'compressor',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.compressor',
  },
  {
    id: 'mechanicalPalletTruck',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.mechanicalPalletTruck',
  },
  {
    id: 'vehicleFortransportingPeople​​',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.vehicleFortransportingPeople​​',
  },
  {
    id: 'generator',
    keyLang: 'SELECT_DATA_LABEL.selectMainInternalCombustionEngine.generator',
  },
]
export const SelectMainMineralProduct: DataSelectOption[] = [
  {
    id: 'cement',
    keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.cement',
  },
  {
    id: 'concrete',
    keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.concrete',
  },
  {
    id: 'isolation',
    keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.isolation',
  },
  { id: 'iron', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.iron' },
  { id: 'steel', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.steel' },

  {
    id: 'copper',
    keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.copper',
  },
  { id: 'zinc', keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.zinc' },
  {
    id: 'aluminum',
    keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.aluminum',
  },
  {
    id: 'sealingStrip',
    keyLang: 'SELECT_DATA_LABEL.selectMainMineralProduct.sealingStrip',
  }
]

export const SelectMainRigidMaterial: DataSelectOption[] = [{ id: 'mainRigidMaterial', keyLang: 'SELECT_DATA_LABEL.insolationPanels' }]

export const SelectMainCategoryNonInert: DataSelectOption[] = [
  {
    id: 'metalsAndAlloys',
    keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.metalsAndAlloys',
  },
  {
    id: 'untreatedWood',
    keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.untreatedWood',
  },
  {
    id: 'plastic',
    keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plastic',
  },
  {
    id: 'plaster',
    keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plaster',
  },

  /* 	{ id: 5, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.mineralWools' },
   */
  {
    id: 'insulationMaterials',
    keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.insulationMaterials',
  },
  {
    id: 'cardboardAndPaper',
    keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.cardboardAndPaper',
  },
  /* 	{ id: 7, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.cartridgesWithoutToxicProducts' },
	{ id: 8, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.electricalAndElectronicEquipment' }, */
  /* 	{ id: 9, keyLang: 'SELECT_DATA_LABEL.selectMainCategoryNonInert.plaster' }, */
]
export const SelectMainActivity: DataSelectOption[] = [
  {
    id: 'siteCleaning',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.siteCleaning',
  },
  {
    id: 'cleaningSiteVehicles',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.cleaningSiteVehicles',
  },
  {
    id: 'toolCleaning',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.toolCleaning',
  },
  {
    id: 'pouringConcrete',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.pouringConcrete',
  },
  { id: 'siteHut', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.siteHut' },
  { id: 'paint', keyLang: 'SELECT_DATA_LABEL.selectMainActivity.paint' },
  {
    id: 'wateringForCure',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.wateringForCure',
  },
  {
    id: 'cleaningOfSiteAndPeripheryAccesses',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.cleaningOfSiteAndPeripheryAccesses',
  },
  {
    id: 'wateringPlants',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.wateringPlants',
  },
  {
    id: 'constructionSiteWater',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.constructionSiteWater',
  },
  {
    id: 'boiler',
    keyLang: 'SELECT_DATA_LABEL.selectMainActivity.boiler',
  },
]
export const SelectProducts: DataSelectOption[] = [
  { id: 'aerosol', keyLang: 'SELECT_DATA_LABEL.selectProducts.aerosol' },
  {
    id: 'productsContainingTar',
    keyLang: 'SELECT_DATA_LABEL.selectProducts.productsContainingTar',
  },
  /* 	{ id: 2, keyLang: 'SELECT_DATA_LABEL.selectProducts.batteries' },
   */
  {
    id: 'woodTreatedWithHazardousSubstances',
    keyLang: 'SELECT_DATA_LABEL.selectProducts.woodTreatedWithHazardousSubstances',
  },
  {
    id: 'collects',
    keyLang: 'SELECT_DATA_LABEL.selectProducts.collects',
  },
  /* 	{ id: 4, keyLang: 'SELECT_DATA_LABEL.selectProducts.packagingSoiledWithDangerousSubstances' },
 { id: 5, keyLang: 'SELECT_DATA_LABEL.selectProducts.oilSeparatorSludge' },
	{ id: 6, keyLang: 'SELECT_DATA_LABEL.selectProducts.cartridgesContainingDangerousSubstances' },
	{ id: 8, keyLang: 'SELECT_DATA_LABEL.selectProducts.energySavingLamps' },
	{ id: 9, keyLang: 'SELECT_DATA_LABEL.selectProducts.electricalAndElectronicWasteContainingHazardousSubstances' }*/
  {
    id: 'paintVarnish',
    keyLang: 'SELECT_DATA_LABEL.selectProducts.paintVarnish',
  },
  { id: 'fuel', keyLang: 'SELECT_DATA_LABEL.selectProducts.fuel' },
  { id: 'oils', keyLang: 'SELECT_DATA_LABEL.selectProducts.oils' },
  {
    id: 'curingProducts',
    keyLang: 'SELECT_DATA_LABEL.selectProducts.curingProducts',
  },
  { id: 'admixtures', keyLang: 'SELECT_DATA_LABEL.selectProducts.admixtures' },
  {
    id: 'bituminousProductsContainingHAPs',
    keyLang: 'SELECT_DATA_LABEL.selectProducts.bituminousProductsContainingHAPs',
  },
]
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
]

export const SelectCountry: CountrySelectOption[] = [
  {
    id: 'france',
    keyLang: 'SELECT_DATA_LABEL.selectCountry.france',
    code: 'FR',
  },
  {
    id: 'germany',
    keyLang: 'SELECT_DATA_LABEL.selectCountry.germany',
    code: 'DE',
  },
  { id: 'italy', keyLang: 'SELECT_DATA_LABEL.selectCountry.italy', code: 'IT' },
  { id: 'spain', keyLang: 'SELECT_DATA_LABEL.selectCountry.spain', code: 'ES' },
  {
    id: 'switzerland',
    keyLang: 'SELECT_DATA_LABEL.selectCountry.switzerland',
    code: 'CH',
  },
]

// Resultado de la constante SelectInertOrMineralWaste
export const SelectInertOrMineralWaste: DataSelectOption[] = [
  {
    id: 'concrete',
    keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.concrete',
  },
  { id: 'brick', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.brick' },
  { id: 'stone', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.stone' },
  { id: 'soil', keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.soil' },
  {
    id: 'ceramic',
    keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.ceramic',
  },
  {
    id: 'glass',
    keyLang: 'SELECT_DATA_LABEL.selectInertOrMineralWaste.glass',
  },
]

// Resultado de la constante GreenWaste
export const SelectGreenWaste: DataSelectOption[] = [
  {
    id: 'greenWoodUntreated',
    keyLang: 'SELECT_DATA_LABEL.greenWaste.greenWoodUntreated',
  },
  { id: 'topsoil', keyLang: 'SELECT_DATA_LABEL.greenWaste.topsoil' },
]

// Resultado de la constante SelectSpecialWaste
export const SelectSpecialWaste: DataSelectOption[] = [
  {
    id: 'paintsAndSolvents',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.paintsAndSolvents',
  },
  { id: 'usedOils', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.usedOils' },
  {
    id: 'batteriesAndAccumulators',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.batteriesAndAccumulators',
  },
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

  {
    id: 'treatedWood',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.treatedWood',
  },
  {
    id: 'polyurethaneFoams',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.polyurethaneFoams',
  },
  { id: 'asbestos', keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.asbestos' },
  {
    id: 'pouredAsphalt',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.pouredAsphalt',
  },
  {
    id: 'agglomeratedConcrete',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.agglomeratedConcrete',
  },
  {
    id: 'agglomeratedCementPanels',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.agglomeratedCementPanels',
  },
  {
    id: 'rubberProducts',
    keyLang: 'SELECT_DATA_LABEL.selectSpecialWaste.rubberProducts',
  },
]

// Resultado de la constante SelectHazardousWaste
export const SelectHazardousWaste: DataSelectOption[] = [
  {
    id: 'productsContainingHeavyMetals',
    keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.productsContainingHeavyMetals',
  },
  {
    id: 'productsContainingTar',
    keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.productsContainingTar',
  },
  {
    id: 'oilSeparatorSludge',
    keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.oilSeparatorSludge',
  },
  {
    id: 'productsContainingHCB',
    keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.productsContainingHCB',
  },
  {
    id: 'landsContainingPFAS',
    keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.landsContainingPFAS',
  },
  {
    id: 'lead',
    keyLang: 'SELECT_DATA_LABEL.selectHazardousWaste.lead',
  },
]
export const SelectPaybackPeriodYears: DataSelectOption[] = [
  {
    id: 1,
    keyLang: 'year',
  },
  {
    id: 2,
    keyLang: 'years',
  },
  {
    id: 3,
    keyLang: 'years',
  },
  {
    id: 4,
    keyLang: 'years',
  },
  {
    id: 5,
    keyLang: 'years',
  },
  {
    id: '',
    keyLang: 'SELECT_DATA_LABEL.fiveBetweenTen',
  },
]

export const SelectYearGuarantee: DataSelectOption[] = [
  {
    id: 1,
    keyLang: 'year',
  },
  {
    id: 2,
    keyLang: 'years',
  },
  {
    id: 3,
    keyLang: 'years',
  },
  {
    id: 4,
    keyLang: 'years',
  },
  {
    id: 5,
    keyLang: 'years',
  },
  {
    id: 6,
    keyLang: 'years',
  },
  {
    id: 7,
    keyLang: 'years',
  },
  {
    id: 8,
    keyLang: 'years',
  },
  {
    id: 9,
    keyLang: 'years',
  },
  {
    id: 10,
    keyLang: 'years',
  },
  {
    id: '+10',
    keyLang: 'years',
  },
]

const SelectOdsDescription: DataSelectOption[] = [
  { id: 'ods_1', keyLang: 'ODS.ods_1' },
  { id: 'ods_2', keyLang: 'ODS.ods_2' },
  { id: 'ods_3', keyLang: 'ODS.ods_3' },
  { id: 'ods_4', keyLang: 'ODS.ods_4' },
  { id: 'ods_5', keyLang: 'ODS.ods_5' },
  { id: 'ods_6', keyLang: 'ODS.ods_6' },
  { id: 'ods_7', keyLang: 'ODS.ods_7' },
  { id: 'ods_8', keyLang: 'ODS.ods_8' },
  { id: 'ods_9', keyLang: 'ODS.ods_9' },
  { id: 'ods_10', keyLang: 'ODS.ods_10' },
  { id: 'ods_11', keyLang: 'ODS.ods_11' },
  { id: 'ods_12', keyLang: 'ODS.ods_12' },
  { id: 'ods_13', keyLang: 'ODS.ods_13' },
  { id: 'ods_14', keyLang: 'ODS.ods_14' },
  { id: 'ods_15', keyLang: 'ODS.ods_15' },
  { id: 'ods_16', keyLang: 'ODS.ods_16' },
  { id: 'ods_17', keyLang: 'ODS.ods_17' },
]
const SelectSustainableBuildingOperations: DataSelectOption[] = [
  {
    id: 'useRenewableEnergies',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.useRenewableEnergies',
  },
  {
    id: 'recoverHeat',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.recoverHeat',
  },
  {
    id: 'useLowConsumptionLighting',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.useLowConsumptionLighting',
  },
  {
    id: 'sustainableLightingSystems',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.sustainableLightingSystems',
  },
  {
    id: 'storeEnergy',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.storeEnergy',
  },
  {
    id: 'optimizeEnergyConsumption',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.optimizeEnergyConsumption',
  },
  {
    id: 'chargeElectricVehicles',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.chargeElectricVehicles',
  },
  {
    id: 'electricMeansOfTransport',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.electricMeansOfTransport',
  },
  {
    id: 'intelligentHeatingSystems',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.intelligentHeatingSystems',
  },
  {
    id: 'homeAutomation',
    keyLang: 'SELECT_DATA_LABEL.selectSustainableBuildingOperations.homeAutomation',
  },
]
export const SelectCurrency: DataSelectOption[] = [
  {
    id: 'EUR',
    keyLang: 'EUR',
  },
  {
    id: 'CHF',
    keyLang: 'CHF',
  },
]

export const SelectreductionPercentage: ReductionPercentageSelectOption[] = [
  {
    id: 1,
    keyLang: 'upTo',
    from: 0,
    to: 0,
  },
  {
    id: 1,
    keyLang: 'upTo',
    from: 0,
    to: 10,
  },
  {
    id: 2,
    keyLang: 'upTo',
    from: 0,
    to: 20,
  },
  {
    id: 3,
    keyLang: 'upTo',
    from: 0,
    to: 30,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 40,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 50,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 60,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 70,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 80,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 90,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 100,
  },
]
export const SelectOperationalCostReduction: ReductionPercentageSelectOption[] = [
  {
    id: 1,
    keyLang: 'upTo',
    from: 0,
    to: 0,
  },
  {
    id: 1,
    keyLang: 'upTo',
    from: 0,
    to: 10,
  },
  {
    id: 2,
    keyLang: 'upTo',
    from: 0,
    to: 20,
  },
  {
    id: 3,
    keyLang: 'upTo',
    from: 0,
    to: 30,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 40,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 50,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 60,
  },
  {
    id: 4,
    keyLang: 'upTo',
    from: 0,
    to: 70,
  },
  {
    id: 4,
    keyLang: '+',
    from: 0,
    to: 70,
  },
]
const SelectBuildingOperation: DataSelectOption[] = [
  {
    id: 'greenRoofsWalls',
    keyLang: 'SELECT_DATA_LABEL.selectBuildingOperation.greenRoofsWalls',
  },
  {
    id: 'waterManagementWastewater',
    keyLang: 'SELECT_DATA_LABEL.selectBuildingOperation.waterManagementWastewater',
  },
  {
    id: 'ecoFriendlytaps',
    keyLang: 'SELECT_DATA_LABEL.selectBuildingOperation.ecoFriendlytaps',
  },
  {
    id: 'ecoFriendlySanitary',
    keyLang: 'SELECT_DATA_LABEL.selectBuildingOperation.ecoFriendlySanitary',
  },
]

export const DataSelect = {
  mainInternalCombustionEngine: SelectMainInternalCombustionEngine,
  mainMineralProduct: SelectMainMineralProduct,
  mainRigidMaterial: SelectMainRigidMaterial,
  mainCategoryNonInert: SelectMainCategoryNonInert,
  mainActivity: SelectMainActivity,
  products: SelectProducts,
  energySource: SelectEnergySource,
  countries: SelectCountry,
  paybackPeriodYears: SelectPaybackPeriodYears,
  inertOrMineralWaste: SelectInertOrMineralWaste,
  greenWaste: SelectGreenWaste,
  odsDescription: SelectOdsDescription,
  specialWaste: SelectSpecialWaste,
  hazardousWaste: SelectHazardousWaste,
  sustainableBuildingOperations: SelectSustainableBuildingOperations,
  yearGuarantee: SelectYearGuarantee,
  currency: SelectCurrency,
  reductionPercentage: SelectreductionPercentage,
  operationalCostReduction: SelectOperationalCostReduction,
  buildingOperation: SelectBuildingOperation,
}

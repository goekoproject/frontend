import { CATEGORIES } from './category.enum';

export interface Field {
  controlName: string;
  type: string;
  textHelp: string;
  label: string; // for cleactech
  question: string; // for question of sme
  hidden?: boolean;
  order: number; //
}
export interface Section {
  id: string;
  searchName?: string;
  keyLang: string;
  status: STATUS_SECTION;
  icon?: string;
  fields?: Field[];
  controlName: CATEGORIES;
  showResult: boolean;
  checked?: boolean;
  code: CATEGORIES;
}

export enum STATUS_SECTION {
  COMPLETED = 'COMPLETED',
  INCOMPLETED = 'INCOMPLETED',
}
const TYPE_FIELD = 'select-subcategory-product';
export const FORM_CATEGORIES_QUESTION: Section[] = [
  {
    id: 'co2-category-form',
    code: CATEGORIES.CO2_EMISSION,
    keyLang: 'CATEGORIES.co2Emission',
    controlName: CATEGORIES.CO2_EMISSION,
    status: STATUS_SECTION.COMPLETED,
    icon: 'co2',
    showResult: true,
    checked: false,
    fields: [
      {
        controlName: 'mainInternalCombustionEngine',
        type: TYPE_FIELD,
        textHelp: '',
        label: 'CATEGORIES_LABEL.mainInternalCombustionEngine.label',
        question: 'CATEGORIES_LABEL.mainInternalCombustionEngine.question',
        order: 1,
      },
      /* {
				controlName: 'fuelInvoice',
				type: 'number',
				textHelp: 'Fuel invoice the main combustion engine (2022)',
				question: 'CATEGORIES_LABEL.fuelInvoice',
				hidden: true,
			}, */
      {
        controlName: 'mainMineralProduct',
        type: TYPE_FIELD,
        textHelp: 'cement, concrete, etc.',
        question: 'CATEGORIES_LABEL.mainMineralProduct.question',
        label: 'CATEGORIES_LABEL.mainMineralProduct.label',
        order: 2,
      },
      /* 	{
				controlName: 'mainRigidMaterial',
				type: 'boolean',
				textHelp: '',
				question: 'CATEGORIES_LABEL.mainRigidMaterial',
			}, */
      /* 			{
				controlName: 'energySource',
				type: TYPE_FIELD,
				textHelp: '',
				question: 'CATEGORIES_LABEL.energySource.question',
				label: 'CATEGORIES_LABEL.energySource.label',
				hidden: true,
			}, */
      {
        controlName: 'sustainableBuildingOperations',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.sustainableBuildingOperations.question',
        label: 'CATEGORIES_LABEL.sustainableBuildingOperations.label',
        order: 3,
      },
    ],
  },
  {
    id: 'waste-category-form',
    keyLang: 'CATEGORIES.waste',
    controlName: CATEGORIES.WASTE,
    status: STATUS_SECTION.COMPLETED,
    icon: 'waste',
    showResult: true,
    checked: false,
    code: CATEGORIES.WASTE,
    fields: [
      {
        controlName: 'mainCategoryNonInert',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.mainCategoryNonInert.question',
        label: 'CATEGORIES_LABEL.mainCategoryNonInert.label',
        order: 1,
      },
      {
        controlName: 'inertOrMineralWaste',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.inertOrMineralWaste.question',
        label: 'CATEGORIES_LABEL.inertOrMineralWaste.label',
        order: 2,
      },
      {
        controlName: 'greenWaste',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.greenWaste.question',
        label: 'CATEGORIES_LABEL.greenWaste.label',
        order: 3,
      },
      {
        controlName: 'specialWaste',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.specialWaste.question',
        label: 'CATEGORIES_LABEL.specialWaste.label',
        order: 4,
      },
      {
        controlName: 'hazardousWaste',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.hazardousWaste.question',
        label: 'CATEGORIES_LABEL.hazardousWaste.label',
        order: 5,
      },
    ],
  },
  {
    id: 'water-category-form',
    code: CATEGORIES.WATER,
    keyLang: 'CATEGORIES.water',
    controlName: CATEGORIES.WATER,
    status: STATUS_SECTION.COMPLETED,
    icon: 'water',
    showResult: true,
    checked: false,
    fields: [
      /* {
				controlName: 'amount',
				type: 'number',
				textHelp: '',
				question: 'CATEGORIES_LABEL.amount',
				hidden: true,
			},
			{
				controlName: 'lastYearInvoice',
				type: 'number',
				textHelp: '',
				question: 'CATEGORIES_LABEL.lastYearInvoice',
				hidden: true,
			}, */
      {
        controlName: 'mainActivity',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.mainActivity.question',
        label: 'CATEGORIES_LABEL.mainActivity.label',
        order: 1,
      },
      {
        controlName: 'buildingOperation',
        type: TYPE_FIELD,
        textHelp: 'buildingOperation_question',
        question: 'CATEGORIES_LABEL.buildingOperation.question',
        label: 'CATEGORIES_LABEL.buildingOperation.label',
        order: 2,
      },
    ],
  },
  {
    id: 'hp-category-form',
    code: CATEGORIES.HAZARDOUS_PRODUCT,
    keyLang: 'CATEGORIES.hazardousProduct',
    controlName: CATEGORIES.HAZARDOUS_PRODUCT,
    status: STATUS_SECTION.COMPLETED,
    icon: 'hp',
    showResult: true,
    checked: false,
    fields: [
      {
        controlName: 'products',
        type: TYPE_FIELD,
        textHelp: '',
        question: 'CATEGORIES_LABEL.products.question',
        label: 'CATEGORIES_LABEL.products.label',
        order: 1,
      },
    ],
  },
  /* 	{
		keyLang: 'summary',
		status: STATUS_SECTION.COMPLETED,
		controlName: '',
		showResult: false,
		checked: false,
	},*/
];

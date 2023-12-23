import {
  CountrySelectOption,
  ReductionPercentageSelectOption,
} from '@goeko/store';
import { DataSelectOption } from '../../sme-analysis-form/select-data.constants';

export const defaultSetProductsCategories = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.toString() === o2;
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.id.toString() === o2.id.toString();
  }

  return false;
};

export const defaultSetDeliverCountries = (
  option: CountrySelectOption,
  optionSelected: string
) => {
  if (option && optionSelected) {
    return option.code.toString() === optionSelected;
  }

  return false;
};

export const defaultSetPaybackPeriodYears = (
  option: DataSelectOption,
  optionSelected: number
) => {
  if (option && optionSelected) {
    return option.id === optionSelected;
  }

  return false;
};

export const defaultSetCurrency = (
  option: DataSelectOption,
  optionSelected: number
) => {
  if (option && optionSelected) {
    return option.id === optionSelected;
  }

  return false;
};

export const defaultSetReductions = (
  option: ReductionPercentageSelectOption,
  optionSelected: { from: number; to: number }
) => {
  if (option && optionSelected) {
    return (
      option.from === optionSelected.from && option.to === optionSelected.to
    );
  }
  return false;
};
export const defaultSetyearGuarantee = (
  option: DataSelectOption,
  optionSelected: number
) => {
  if (option && optionSelected) {
    return option.id === optionSelected;
  }
  return false;
};

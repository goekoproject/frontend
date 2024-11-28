import {
  CountrySelectOption,
} from '@goeko/store';
import { DataSelectOption } from '../../sme-analysis-form/select-data.constants';


export const defaultSetDeliverCountries = (
  option: CountrySelectOption,
  optionSelected: string
) => {
  if (option && optionSelected) {
    return option.code.toString() === optionSelected;
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


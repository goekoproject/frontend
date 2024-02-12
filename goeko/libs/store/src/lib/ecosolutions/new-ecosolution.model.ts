import { CountrySelectOption } from '../constants/select-data.constants';

interface Price {
  amount: number;
  currency: string;
}
export interface FromTO {
  from: number;
  to: number | string;
}
export interface ReductionPercentage extends FromTO {
  from: number;
  to: number | string;
}
export interface OperationalCostReductionPercentage extends FromTO {
  from: number;
  to: number | string;
}
interface Improvement {
  reductionPercentage: ReductionPercentage;
  operationalCostReductionPercentage: OperationalCostReductionPercentage;
}

interface Classification {
  mainCategory: string;
  subCategory: string;
  products: string[];
}

export interface NewEcosolutions {
  cleantechId: string;
  solutionName: string;
  solutionDescription?: string;
  classification: Classification;
  price?: Price;
  improvement?: Improvement;
  sustainableDevelopmentGoals?: number[];
  countries?: string[];
  paybackPeriodYears?: number;
  marketReady?: boolean;
  guarantee?: boolean;
  certified?: boolean;
  approved?: boolean;
  guaranteeInYears?: number;
  priceDescription?: string;
  detailedDescription? :string;
}

export class NewEcosolutionsBody implements NewEcosolutions {
  cleantechId: string;
  solutionName: string;
  solutionDescription?: string;
  detailedDescription?: string;
  classification: Classification;
  price?: Price;
  improvement?: Improvement;
  sustainableDevelopmentGoals?: number[];
  countries?: string[];
  paybackPeriodYears?: number;
  marketReady?: boolean;
  guarantee?: boolean;
  guaranteeInYears?: number;
  certified?: boolean;
  approved?: boolean;
  unit?: string;
  currency?: string;
  priceDescription?: string;
  constructor(cleanTechId: string, mainCategory: string, formValue: any) {
    if (!formValue) {
      throw Error(`Missing form value for create ecosolutions`);
    }
    this.cleantechId = cleanTechId;
    this.solutionName = formValue.solutionName;
    this.solutionDescription = formValue.solutionDescription;
    this.detailedDescription = formValue.detailedDescription;
    /* 	this.price = {
			amount: formValue.price,
			currency: formValue.currency?.id,
		}; */
    this.priceDescription = formValue.priceDescription;
    this.guaranteeInYears = formValue.yearGuarantee?.id;
    this.improvement = {
      reductionPercentage: {
        from: formValue?.reductionPercentage?.from,
        to: formValue?.reductionPercentage?.to,
      },
      operationalCostReductionPercentage: {
        from: formValue.operationalCostReductionPercentage?.from,
        to: formValue?.operationalCostReductionPercentage?.to,
      },
    };
    this.sustainableDevelopmentGoals =
      this.getSustainableDevelopmentGoalsChecked(formValue);
    this.classification = {
      mainCategory: mainCategory,
      subCategory: formValue.subCategory?.code,
      products: formValue.products,
    };
    this.countries = formValue?.deliverCountries?.map(
      (country: CountrySelectOption) => country.code
    );
    this.paybackPeriodYears = formValue?.paybackPeriodYears?.id;
    this.marketReady = formValue.marketReady;
    this.guarantee = formValue.guarantee;
    this.certified = formValue.certified;
    this.approved = formValue.approved;
  }

  getSustainableDevelopmentGoalsChecked(formValue: any) {
    return formValue.sustainableDevelopmentGoals
      .filter(
        (goalChecked: { value: string; checked: boolean }) =>
          goalChecked.checked
      )
      .map((goal: { value: string; checked: boolean }) => goal.value);
  }
}

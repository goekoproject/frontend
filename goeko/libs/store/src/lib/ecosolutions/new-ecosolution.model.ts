import { mapperLocations } from '@goeko/core';
import { FiledTranslations } from '../model/field-translations.interface';
import { Picture } from '../model/pictures.interface';
import { Country } from '../user/public-api';

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

export interface Ecosolutions {
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
  detailedDescription?: string;
  locations: Array<Country>;
  pictures?: Picture[];
  nameTranslations: FiledTranslations[];
}

export class NewEcosolutionsBody implements Ecosolutions {
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
  locations: Array<Country>;
  nameTranslations!: FiledTranslations[];

  constructor(cleanTechId: string, mainCategory: string, formValue: any) {
    if (!formValue) {
      throw Error(`Missing form value for create ecosolutions`);
    }
    this.cleantechId = cleanTechId;
    this.solutionName = formValue.solutionName;
    this.solutionDescription = formValue.solutionDescription;
    this.detailedDescription = formValue.detailedDescription;
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
    this.sustainableDevelopmentGoals = formValue.sustainableDevelopmentGoals;
    this.classification = {
      mainCategory: mainCategory,
      subCategory: formValue.subCategory?.code,
      products: formValue.products,
    };
    this.countries = undefined;
    this.paybackPeriodYears = formValue?.paybackPeriodYears?.id;
    this.marketReady = formValue.marketReady;
    this.guarantee = formValue.guarantee;
    this.certified = formValue.certified;
    this.approved = formValue.approved;
    this.locations = mapperLocations(formValue.locations);
    this.nameTranslations = formValue.nameTranslations;
  }
}

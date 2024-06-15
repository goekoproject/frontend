import {
  Country,
  Ecosolutions,
  FromTO,
  ReductionPercentage,
} from '@goeko/store';
export interface GoalChecked {
  value: string;
  checked: boolean;
}
export class EcosolutionForm {
  solutionName: string;
  solutionDescription?: string;
  subCategory: string;
  products: string[];
  reductionPercentage?: ReductionPercentage;
  operationalCostReductionPercentage?: FromTO;
  sustainableDevelopmentGoals?: any[] | undefined;
  price?: number;
  currency?: string;
  deliverCountries?: string[];
  paybackPeriodYears?: number;
  marketReady?: boolean;
  guarantee?: boolean;
  certified?: boolean;
  approved?: boolean;
  yearGuarantee?: number;
  priceDescription?: string;
  detailedDescription?: string;
  locations?: Array<Country>;
  constructor(ecosolution: Ecosolutions) {
    this.solutionName = ecosolution.solutionName;
    this.solutionDescription = ecosolution.solutionDescription;
    this.subCategory = ecosolution.classification.subCategory;
    this.products = ecosolution.classification.products;
    this.reductionPercentage = ecosolution.improvement?.reductionPercentage;
    this.operationalCostReductionPercentage =
      ecosolution.improvement?.operationalCostReductionPercentage;
    this.sustainableDevelopmentGoals = ecosolution.sustainableDevelopmentGoals;
    this.price = ecosolution.price?.amount;
    this.currency = ecosolution.price?.currency;
    this.deliverCountries = ecosolution.countries;
    this.paybackPeriodYears = ecosolution.paybackPeriodYears;
    this.marketReady = ecosolution.marketReady;
    this.guarantee = ecosolution.guarantee;
    this.certified = ecosolution.certified;
    this.approved = ecosolution.approved;
    this.yearGuarantee = ecosolution.guaranteeInYears;
    this.priceDescription = ecosolution.priceDescription;
    this.detailedDescription = ecosolution.detailedDescription;
    this.locations = ecosolution.locations;
  }
}

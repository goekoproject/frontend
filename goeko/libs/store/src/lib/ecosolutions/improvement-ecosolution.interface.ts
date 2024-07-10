export interface ImprovementEcosolution {
  operationalCostReductionPercentage: ReductionPercentageOfEcosolution;
  reductionPercentage: ReductionPercentageOfEcosolution;
  smeOperationalCostReduction: SMEOperationalCostReduction;
  smeReduction: number;
}

export interface ReductionPercentageOfEcosolution {
  from: number;
  to: number;
}

export interface SMEOperationalCostReduction {
  amount: number;
  currency: string;
}

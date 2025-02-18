export enum FINANCING_TYPE {
  SustainableEquipment = 'sustainable-equipment',
  RealEstate = 'real-estate',
}
export enum FINANCING_TYPE_LEAD {
  REAL_ESTATE = 'REAL_ESTATE',
  SUSTAINABLE_EQUIPMENT = 'SUSTAINABLE_EQUIPMENT',
}
export type FinancingTypeLead = FINANCING_TYPE_LEAD.REAL_ESTATE | FINANCING_TYPE_LEAD.SUSTAINABLE_EQUIPMENT

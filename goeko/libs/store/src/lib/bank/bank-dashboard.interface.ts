export interface BankDashboard {
  sustainableEquipmentLeads: number
  realEstateLeads: number
}

export type BankDashboardRecord = Record<keyof BankDashboard, number>

export interface BankSummary {
  summary: BankDashboardRecord
}

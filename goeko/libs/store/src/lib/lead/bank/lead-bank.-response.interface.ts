import { ResponseClassifications } from './../../model/classifications.interface'
export interface LeadBankResponse {
  id: string
  sme: LeadSme
  financing: LeadFinancing
  date: string
  message: string
}

export interface LeadSme {
  id: string
  name: string
  notification: LeadNotification
}

export interface LeadNotification {
  email: string
  phoneNumber: string
  lang: string
}

export interface LeadFinancing {
  id: string
  financingType: string
  realEstate: LeadsRealEstate
  sustainableEquipment: LeadsSustainableEquipment
}

export interface LeadsSustainableEquipment {
  classifications: ResponseClassifications[]
}
export interface LeadsRealEstate {
  classifications: ResponseClassifications[]
}

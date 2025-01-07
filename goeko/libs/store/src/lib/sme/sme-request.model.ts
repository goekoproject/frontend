import { Classifications } from '../model/classifications.interface'
import { Locations } from '../model/locations.interface'

export interface MainProduct {
  name: string
  lastYearInvoice: string
}

export interface MainRigidMaterial {
  name: string
}

export interface Co2Emission {
  mainInternalCombustionEngine: MainProduct
  mainMineralProduct: MainProduct
  mainRigidMaterial: MainRigidMaterial
}

export interface Waste {
  mainCategoryNonInert: string
}

export interface HazardousProduct {
  products: string[]
}

export interface WaterConsumption {
  mainActivity: string[]
  amount: string
  lastYearInvoice: string
}

export interface SmeSaveRequest {
  smeId?: string
  classifications: Classifications[]
  locations?: Array<Locations>
  notification?: NotificationSearch
}
export interface SmeSaveRecomendationRequest extends SmeSaveRequest {
  smeId?: string
  classifications: Classifications[]
  searchName?: string
}

export interface SmeSaveRecomendationProjectRequest extends SmeSaveRequest {
  smeId?: string
  name: string
  classifications: Classifications[]
}
export interface NotificationSearch {
  onNewEcosolution: boolean
}
export interface SmeCreateRecomendationRequest {
  classifications: Classifications[]
  locations?: Array<Locations>
}

export interface SmeRequestResponse {
  classifications: Classifications[]
  id: string
  date: string
  searchName?: string
  name?: string
  notification: NotificationSearch
}
export interface Requests {
  requests: SmeRequestResponse[]
}
export interface Projects {
  projects: SmeRequestResponse[]
}

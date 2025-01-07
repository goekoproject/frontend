import { ResponseClassifications } from '../model/classifications.interface'
import { LocationTranslated } from '../model/location-translated.interface'
import { NotificationSearch } from './sme-request.model'

export interface Project {
  classifications: ResponseClassifications[]
  id: string
  date: string
  name: string
  notification: NotificationSearch
  locations: Array<LocationTranslated>
}

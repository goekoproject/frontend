import { Classifications } from '../model/classificaciones.interface'
import { NotificationSearch } from './sme-request.model'

export interface Project {
  classifications: Classifications[]
  id: string
  date: string
  name: string
  notification: NotificationSearch
}

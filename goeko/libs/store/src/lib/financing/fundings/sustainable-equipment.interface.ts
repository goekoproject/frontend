import { Observable } from 'rxjs'
import { SustainableEquipmentPayload } from '../sustainable-equipment.model'

export interface OperationSustainableEquipment {
  createSustainableEquipment(data: SustainableEquipmentPayload): Observable<any>

  updateSustainableEquipment(id: string, data: SustainableEquipmentPayload): Observable<any>
}

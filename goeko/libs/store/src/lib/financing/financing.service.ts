import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { FINANCING_TYPE } from './financing-type.enum'
import { OperationRealStateLoan } from './fundings/real-state-loan.interface'
import { OperationSustainableEquipment } from './fundings/sustainable-equipment.interface'
import { RealStateLoanPayload } from './real-state-loan.model'
import { SustainableEquipmentPayload } from './sustainable-equipment.model'

export type FinancingType = FINANCING_TYPE.SustainableEquipment | FINANCING_TYPE.RealEstate
@Injectable()
export class FinancingService implements OperationSustainableEquipment, OperationRealStateLoan {
  private _http = inject(HttpClient)

  getAll(type: FinancingType) {
    return this._http.get(`/v1/financing/${type}`)
  }

  createSustainableEquipment(data: SustainableEquipmentPayload): Observable<any> {
    return this._http.post(`/v1/financing/${FINANCING_TYPE.SustainableEquipment}`, data)
  }
  updateSustainableEquipment(id: string, data: SustainableEquipmentPayload): Observable<any> {
    return this._http.put(`/v1/financing/${FINANCING_TYPE.SustainableEquipment}/${id}`, data)
  }

  createRealStateLoan(data: RealStateLoanPayload): Observable<any> {
    return this._http.post(`/v1/financing/${FINANCING_TYPE.RealEstate}`, data)
  }
  updateRealStateLoan(id: string, data: RealStateLoanPayload): Observable<any> {
    return this._http.put(`/v1/financing/${FINANCING_TYPE.RealEstate}/${id}`, data)
  }
}

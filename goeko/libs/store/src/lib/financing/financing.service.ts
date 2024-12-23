import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { FINANCING_TYPE } from './financing-type.enum'
import { RealStateLoanResponse } from './real-state-loan/real-state-loan-response.interface'
import { OperationRealStateLoan } from './real-state-loan/real-state-loan.interface'
import { RealStateLoanPayload } from './real-state-loan/real-state-loan.model'
import { OperationSustainableEquipment } from './sustainable-equipment/sustainable-equipment.interface'
import { SustainableEquipmentPayload } from './sustainable-equipment/sustainable-equipment.model'

export type FinancingType = FINANCING_TYPE.SustainableEquipment | FINANCING_TYPE.RealEstate
@Injectable()
export class FinancingService implements OperationSustainableEquipment, OperationRealStateLoan {
  private _http = inject(HttpClient)

  getAll(type: FinancingType): Observable<any> {
    return this._http.get(`/v1/financing/${type}`)
  }

  getKindOfFinancingById(type: FinancingType, bankId: string): Observable<RealStateLoanResponse> {
    return this._http.get<RealStateLoanResponse>(`/v1/financing/${type}/bank/${bankId}`)
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

  deleteKindOfFinancingById(type: FinancingType, kindOfFundingId: string): Observable<any> {
    return this._http.delete(`/v1/financing/${type}/${kindOfFundingId}`)
  }
}

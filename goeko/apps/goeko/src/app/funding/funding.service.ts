import { inject, Injectable } from '@angular/core'
import { FinancingService, FinancingType } from '@goeko/store'
import { Observable, of } from 'rxjs'
import { CreateRealStateLoan } from './managment/real-state-loan-form/create-real-state-loan.model'
import { CreateSustainableEquipment } from './managment/sustainble-equipment-form/create-sustainable-equipment.model'

@Injectable()
export class FundingService {
  private _financingService = inject(FinancingService)
  sustainableEquipment!: CreateSustainableEquipment
  realStateLoan!: CreateRealStateLoan

  setRealStateLoan(realStateLoan: CreateRealStateLoan) {
    this.realStateLoan = realStateLoan
  }

  getRealStateLoan() {
    return this.realStateLoan
  }

  setSustainableEquipment(sustainableEquipment: CreateSustainableEquipment) {
    this.sustainableEquipment = sustainableEquipment
  }

  getSustainableEquipment() {
    return this.sustainableEquipment
  }

  getSustainableEquipmentById(id: string): Observable<any> {
    return this._financingService.getSustainableEquipmentById(id)
  }
  createSustainableEquipment(sustainbleEquipmentValue: CreateSustainableEquipment): Observable<any> {
    return sustainbleEquipmentValue ? this._financingService.createSustainableEquipment(sustainbleEquipmentValue) : of(null)
  }

  updateSustainableEquipment(id: string, data: CreateSustainableEquipment): Observable<any> {
    return this._financingService.updateSustainableEquipment(id, data)
  }

  getRealStateLoanById(id: string): Observable<any> {
    return this._financingService.getRealStateLoanById(id)
  }
  createRealStateLoan(realStateLoan: CreateRealStateLoan): Observable<any> {
    return realStateLoan ? this._financingService.createRealStateLoan(realStateLoan) : of(null)
  }

  updateRealStateLoan(id: string, data: CreateRealStateLoan): Observable<any> {
    return this._financingService.updateRealStateLoan(id, data)
  }

  getAll(type: FinancingType): Observable<any> {
    return this._financingService.getAll(type)
  }

  getKindOfFinancingById(type: FinancingType, bankId: string): Observable<any> {
    return this._financingService.getKindOfFinancingById(type, bankId)
  }

  deleteKindOfFinancingById(type: FinancingType, kindOfFundingId: string): Observable<any> {
    return this._financingService.deleteKindOfFinancingById(type, kindOfFundingId)
  }
}

import { inject, Injectable, signal } from '@angular/core'
import {
  FinancingService,
  FinancingType,
  SearchFinancingBuilder,
  SearchFinancingResponse,
  SearchRealEstate,
  SearchSustainableEquipment,
} from '@goeko/store'
import { Observable, of } from 'rxjs'
import { CreateRealStateLoan } from './managment/real-state-loan-form/create-real-state-loan.model'
import { CreateSustainableEquipment } from './managment/sustainble-equipment-form/create-sustainable-equipment.model'

@Injectable()
export class FundingService {
  private _financingService = inject(FinancingService)
  sustainableEquipment!: CreateSustainableEquipment
  realStateLoan!: CreateRealStateLoan

  private _financingBuilder = signal<SearchFinancingBuilder>(new SearchFinancingBuilder())

  setQuerySustainableEquipment(data: SearchSustainableEquipment): void {
    this._financingBuilder().setSustainableEquipment(data)
  }

  setQueryRealEstateLoan(data: SearchRealEstate): void {
    this._financingBuilder().setRealEstate(data)
  }

  clearQuerySustainableEquipment(): void {
    this._financingBuilder().clearSustainableEquipment()
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

  searchFunding(): Observable<SearchFinancingResponse> {
    const query = this._financingBuilder().build()
    return this._financingService.searchFinancing(query)
  }
}

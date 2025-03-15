import { inject, Injectable, signal } from '@angular/core'
import {
  FinancingService,
  FinancingType,
  SearchFinacing,
  SearchFinancingBuilder,
  SearchFinancingResponse,
  SearchRealEstate,
  SearchSustainableEquipment,
  SessionStorageService,
} from '@goeko/store'
import { LeadCreateBank } from '@goeko/store/lead/bank/lead-create-bank.interface'
import { Observable, of } from 'rxjs'
import { LeadBankService } from './../../../../../libs/store/src/lib/lead/bank/lead-bank.service'
import { CreateRealStateLoan } from './managment/real-state-loan-form/create-real-state-loan.model'
import { CreateSustainableEquipment } from './managment/sustainble-equipment-form/create-sustainable-equipment.model'

const SESSION_QUERY = 'searchQuery'
@Injectable({ providedIn: 'root' })
export class FundingService {
  private _financingService = inject(FinancingService)
  private _sessionStorage = inject(SessionStorageService)
  private _leadBankService = inject(LeadBankService)
  sustainableEquipment!: CreateSustainableEquipment
  realStateLoan!: CreateRealStateLoan

  private _financingBuilder = signal<SearchFinancingBuilder>(new SearchFinancingBuilder())

  getQuerySustainableEquipment(): SearchSustainableEquipment {
    return this._financingBuilder().sustainableEquipment
  }
  setQuerySustainableEquipment(data: SearchSustainableEquipment): void {
    this._financingBuilder().setSustainableEquipment(data)
  }

  setQueryRealEstateLoan(data: SearchRealEstate): void {
    this._financingBuilder().setRealEstate(data)
  }

  clearQuerySustainableEquipment(): void {
    this._financingBuilder().clearSustainableEquipment()
    this._sessionStorage.removeItem(SESSION_QUERY)
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
    const query = this._getSearchedQuery() as SearchFinacing
    if (!query) {
      return of({ sustainableEquipment: [], realEstate: [] })
    }
    this._sessionStorage.setItem(SESSION_QUERY, query)
    return this._financingService.searchFinancing(query)
  }

  private _getSearchedQuery(): SearchFinacing | null {
    return this._financingBuilder().build() ?? this._sessionStorage.getItem(SESSION_QUERY)
  }

  createLeadOfBank(data: LeadCreateBank): Observable<any> {
    return this._leadBankService.createLeadBank(data)
  }
}

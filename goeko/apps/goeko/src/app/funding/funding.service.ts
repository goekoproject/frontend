import { Inject, Injectable } from '@angular/core'
import { FinancingService, FinancingType } from '@goeko/store'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { Observable, of } from 'rxjs'
import { CreateRealStateLoan } from './real-state-loan-form/create-real-state-loan.model'
import { CreateSustainableEquipment } from './sustainble-equipment-form/create-sustainable-equipment.model'

@Injectable()
export class FundingService {
  private dbService = Inject(NgxIndexedDBService)

  private readonly dbName = 'FundingDB'
  private readonly dbVersion = 1
  private storeName = 'fundind'

  sustainableEquipment!: CreateSustainableEquipment
  realStateLoan!: CreateRealStateLoan

  private readonly stores = ['sustainble-equipment', 'real-state-loan']
  constructor(private financingService: FinancingService) {
    const request = indexedDB.open(this.dbName, this.dbVersion)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      this.initializeDatabase(event.target as IDBOpenDBRequest)
    }
  }

  saveData(data: any): Observable<void> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (data) {
          this.addData(db, data, observer)
        }
      }

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  private initializeDatabase(request: IDBOpenDBRequest): void {
    const db = request.result
    this.stores.forEach((storeName) => {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      }
    })
  }

  private addData(db: IDBDatabase, data: any, observer: any): void {
    const transaction = db.transaction([this.storeName], 'readwrite')
    const store = transaction.objectStore(this.storeName)
    const addRequest = store.add(data)

    addRequest.onsuccess = () => {
      observer.next(data)
      observer.complete()
    }

    addRequest.onerror = (event: Event) => {
      observer.error((event.target as IDBRequest).error)
    }
  }

  getData(id: number, storeName: string): Observable<any> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result
        const transaction = db.transaction([storeName], 'readonly')
        const store = transaction.objectStore(storeName)
        const getRequest = store.get(id)

        getRequest.onsuccess = () => {
          observer.next(getRequest.result)
          observer.complete()
        }

        getRequest.onerror = (event: Event) => {
          observer.error((event.target as IDBRequest).error)
        }
      }

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  getAllDataFromStore(storeName: string): Observable<any> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result
        const transaction = db.transaction([storeName], 'readonly')
        const store = transaction.objectStore(storeName)
        const getAllRequest = store.getAll()
        request.result.close()

        getAllRequest.onsuccess = () => {
          observer.next(getAllRequest.result)
          observer.complete()
        }

        getAllRequest.onerror = (event: Event) => {
          observer.error((event.target as IDBRequest).error)
        }
      }

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  clearStore(storeName: string): Observable<void> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result
        const transaction = db.transaction([storeName], 'readwrite')
        const store = transaction.objectStore(storeName)
        const clearRequest = store.clear()

        clearRequest.onsuccess = () => {
          observer.next()
          observer.complete()
        }

        clearRequest.onerror = (event: Event) => {
          observer.error((event.target as IDBRequest).error)
        }
      }

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBOpenDBRequest).error)
      }
    })
  }

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

  createSustainableEquipment(sustainbleEquipmentValue: CreateSustainableEquipment): Observable<any> {
    return sustainbleEquipmentValue ? this.financingService.createSustainableEquipment(sustainbleEquipmentValue) : of(null)
  }

  updateSustainableEquipment(id: string, data: CreateSustainableEquipment): Observable<any> {
    return this.financingService.updateSustainableEquipment(id, data)
  }

  createRealStateLoan(realStateLoan: CreateRealStateLoan): Observable<any> {
    return realStateLoan ? this.financingService.createRealStateLoan(realStateLoan) : of(null)
  }

  updateRealStateLoan(id: string, data: CreateRealStateLoan): Observable<any> {
    return this.financingService.updateRealStateLoan(id, data)
  }

  getAll(type: FinancingType): Observable<any> {
    return this.financingService.getAll(type)
  }

  getKindOfFinancingById(type: FinancingType, bankId: string): Observable<any> {
    return this.financingService.getKindOfFinancingById(type, bankId)
  }

  deleteKindOfFinancingById(type: FinancingType, kindOfFundingId: string): Observable<any> {
    return this.financingService.deleteKindOfFinancingById(type, kindOfFundingId)
  }
}

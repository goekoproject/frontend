import { Inject, Injectable, Optional } from '@angular/core'
import { Observable } from 'rxjs'
import { STORE_NAME } from './funding-token.constants'

@Injectable()
export class FundingService {
  private readonly dbName = 'FundingDB'
  private readonly dbVersion = 1

  constructor(@Optional() @Inject(STORE_NAME) private storeName: string) {}

  saveData(data: any): Observable<void> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        this.initializeDatabase(event.target as IDBOpenDBRequest)
      }

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result

        this.addData(db, data, observer)
      }

      request.onerror = (event: Event) => {
        observer.error((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  private initializeDatabase(request: IDBOpenDBRequest): void {
    const db = request.result
    if (!db.objectStoreNames.contains(this.storeName)) {
      db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true })
    }
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

  getData(id: number): Observable<any> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result
        const transaction = db.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
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

  getAllData(): Observable<any[]> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result
        const transaction = db.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
        const getAllRequest = store.getAll()

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

  getAllDataFromStore(storeName: string): Observable<any[]> {
    return new Observable((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result
        const transaction = db.transaction([storeName], 'readonly')
        const store = transaction.objectStore(storeName)
        const getAllRequest = store.getAll()

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
}

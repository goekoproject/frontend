import { Observable } from 'rxjs'
import { RealStateLoanPayload } from './real-state-loan.model'

export interface OperationRealStateLoan {
  getRealStateLoanById(id: string): Observable<any>
  createRealStateLoan(data: RealStateLoanPayload): Observable<any>
  updateRealStateLoan(id: string, data: RealStateLoanPayload): Observable<any>
}

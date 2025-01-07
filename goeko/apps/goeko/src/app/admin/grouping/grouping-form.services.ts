import { inject, Injectable } from '@angular/core'
import { ClassificationsService, Grouping, GroupingByClassifications } from '@goeko/store'
import { Observable } from 'rxjs'

@Injectable()
export class GroupingFormService {
  private _classificationServices = inject(ClassificationsService)

  getGroupingAll(): Observable<Grouping[]> {
    return this._classificationServices.getGroupingAll()
  }

  getGroupingById(id: string): Observable<GroupingByClassifications> {
    return this._classificationServices.getGroupingById(id)
  }
}

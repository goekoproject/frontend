import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  isDarkTheme = new Subject<boolean>()

  constructor() {}
}

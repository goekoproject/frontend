import { isDevMode } from '@angular/core'
import { EcosolutionsBody } from './ecosolution-base.model'

export class NewEcosolutionsBody extends EcosolutionsBody {
  test!: boolean
  constructor(cleanTechId: string, mainCategory: string, formValue: any) {
    super(cleanTechId, mainCategory, formValue)
    this.test = isDevMode() ? true : false
  }
}

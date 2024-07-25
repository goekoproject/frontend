import { EcosolutionsBody } from './ecosolution-base.model'

export class UpdatedEcosolutionBody extends EcosolutionsBody {
  constructor(cleanTechId: string, mainCategory: string, formValue: any) {
    super(cleanTechId, mainCategory, formValue)
  }
}

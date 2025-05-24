import { EcosolutionFormData, EcosolutionsBody } from './ecosolution-base.model'

export class NewEcosolutionsBody extends EcosolutionsBody {
  constructor(cleanTechId: string, formValue: EcosolutionFormData) {
    super(cleanTechId, formValue)
  }
}

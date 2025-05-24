import { EcosolutionFormData, EcosolutionsBody } from './ecosolution-base.model'

export class UpdatedEcosolutionBody extends EcosolutionsBody {
  constructor(cleanTechId: string, formValue: EcosolutionFormData) {
    super(cleanTechId, formValue)
  }
}

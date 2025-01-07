import { ResponseClassifications } from '@goeko/store'

export interface IProjectForm {
  [categoryCode: string]: {
    [subcategoryCode: string]: string[]
  }
}

export class ProjectForm {
  static transform(data: ResponseClassifications[]): ProjectForm {
    return data.reduce((acc, classification) => {
      if (!acc[classification.category.code]) {
        acc[classification.category.code] = {}
      }

      acc[classification.category.code][classification.subcategory.code] = classification.products.map((c) => c.code) // Inicializa con false o el valor que necesites

      return acc
    }, {} as IProjectForm)
  }
}

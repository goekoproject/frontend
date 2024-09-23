import { Classifications } from '@goeko/store'

export interface IProjectForm {
  [categoryCode: string]: {
    [subcategoryCode: string]: string[]
  }
}

export class ProjectForm {
  static transform(data: Classifications[]): ProjectForm {
    return data.reduce((acc, classification) => {
      if (!acc[classification.mainCategory]) {
        acc[classification.mainCategory] = {}
      }

      acc[classification.mainCategory][classification.subCategory] = classification.products // Inicializa con false o el valor que necesites

      return acc
    }, {} as IProjectForm)
  }
}

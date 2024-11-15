import { Classifications, NotificationSearch, SmeSaveRecomendationProjectRequest, SmeSaveRecomendationRequest } from '@goeko/store'
import { Section } from '../form-field.model'

export const formToClassificationsMapper = (formValue: unknown) => {
  const classifications: Classifications[] = []
  if (!formValue) {
    return classifications
  }
  const isObject = (obj: unknown) => typeof obj === 'object' && obj !== null

  Object.entries(formValue).map((value) => {
    let mainCategory!: string
    let categoryClassification

    value.forEach((category) => {
      if (isObject(category)) {
        Object.keys(category).forEach((index) => {
          const subCategory = index
          if (!category[index as keyof typeof category] && !Array.isArray(category)) {
            return
          }
          if (!Array.isArray(category[index as keyof typeof category])) {
            return
          }
          const products = (category[index as keyof typeof category] as Array<any>).map((res: any) => {
            if (typeof res === 'object') {
              return res?.code?.toString()
            } else {
              return res
            }
          })

          if (!products || products.length === 0) {
            return
          }
          categoryClassification = {
            mainCategory,
            subCategory,
            products,
          }
          classifications.push(categoryClassification)
        })
      } else {
        mainCategory = category
      }
    })
  })

  return classifications
}

interface Item {
  mainCategory: string
  products: string[]
  subCategory: string
}
export type CategoryModel = {
  [mainCategory: string]: { [subCategory: string]: string[] }
}

export const transformArrayToObj = (arr: Item[]) => {
  const result: {
    [mainCategory: string]: {
      [subCategory: string]: string[]
    }
  } = {}

  const transformObej = (subCategory: string, products: string[]) => {
    return {
      [subCategory]: products,
    }
  }

  arr?.forEach((item) => {
    const { subCategory, products } = item
    if (!result[item.mainCategory]) {
      result[item.mainCategory] = transformObej(subCategory, products)
    } else if (!result[item.mainCategory][subCategory]) {
      result[item.mainCategory][subCategory] = products
    }
  })

  return result
}

export class FormValueToSmeAnalysisRequest implements SmeSaveRecomendationRequest {
  smeId: string
  classifications: Classifications[]
  searchName?: string
  notification?: NotificationSearch
  constructor(smeId: string, formValue: Section) {
    this.searchName = new Date().toDateString()
    this.smeId = smeId
    this.classifications = formToClassificationsMapper(formValue)
    this.notification = formValue.notification
  }
}

export class FormValueToSmeProjectRequest implements SmeSaveRecomendationProjectRequest {
  classifications!: Classifications[]
  name!: string
  smeId?: string
  notification?: NotificationSearch
  constructor(formValue?: Section, smeId?: string) {
    if (formValue && formValue.searchName) {
      this.name = formValue.searchName
      this.smeId = smeId
      this.classifications = formToClassificationsMapper(formValue)
      this.notification = formValue.notification
    }
  }
}

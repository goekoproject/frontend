import { Classifications, ResponseClassifications } from './classifications.interface'

export function TransformClassifications(target: any, propertyKey: string) {
  let value: Classifications[]

  const getter = () => {
    return value
  }
  const setter = (newVal: ResponseClassifications[]) => {
    value = newVal.map((response) => ({
      mainCategory: response.category.code,
      subCategory: response.subcategory.code,
      products: response.products.map((product) => product.label),
    })) as Classifications[]
  }

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  })
}

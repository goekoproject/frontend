//TODO:Change to object with code and label
export interface Classifications {
  mainCategory: string
  subCategory: string
  products: string[]
}

//TODO: review name   
export interface CodeLabel {
  code: string
  label: string
}

export interface ResponseClassifications {
  category: CodeLabel
  subcategory: CodeLabel
  products: CodeLabel[]
}

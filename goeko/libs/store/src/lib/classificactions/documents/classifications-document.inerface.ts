export enum PARENT_CODE {
  CERTIFICATE = 'CERTIFICATE',
  TECHNICAL_SHEET = 'TECHNICAL_SHEET',
}

export interface ClassificationDocumentType {
  code: string
  name: string
  description: string
  fieldOrder: number
}

export interface ClassificationDocument {
  code: string
  name: string
  description: string
  documentTypes: ClassificationDocumentType[]
}

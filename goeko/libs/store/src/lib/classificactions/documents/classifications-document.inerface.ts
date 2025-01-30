export enum PARENT_CODE {
  CERTIFICATE = 'CERTIFICATE',
  TECHNICAL_SHEET = 'TECHNICAL_SHEET',
}

export interface DocumentType {
  code: string
  name: string
  description: string
  fieldOrder: number
}

export interface ClassificationDocument {
  code: string
  name: string
  description: string
  documentTypes: DocumentType[]
}

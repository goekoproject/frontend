export enum PARENT_CODE {
  CERTIFICATE = 'CERTIFICATE',
  TECHNICAL_SHEET = 'TECHNICAL_SHEET',
}

export interface DocumentTypeEcosolutions {
  code: string
  name: string
  description: string
  fieldOrder: number
}

export interface ClassificationDocument {
  code: string
  name: string
  description: string
  documentTypes: DocumentTypeEcosolutions[]
}

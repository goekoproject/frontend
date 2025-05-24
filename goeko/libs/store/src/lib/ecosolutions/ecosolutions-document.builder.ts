import { PARENT_CODE } from '../classificactions/public-api'
import { DocumentEcosolutions, DocumentTypeEcosolutions } from './ecosolution.interface'

export const getDocumentTypeByParanteCode = (documents: DocumentEcosolutions[], parentCode: unknown): DocumentEcosolutions[] => {
  switch (parentCode) {
    case PARENT_CODE.CERTIFICATE:
      return new EcosolutionDocumentsBuilder(documents).assignOtherDocumentType().getCertificates().build()
    case PARENT_CODE.TECHNICAL_SHEET:
      return new EcosolutionDocumentsBuilder(documents).getTechnicalSheet().build()
    case PARENT_CODE.PROJECT_FILE:
      return new EcosolutionDocumentsBuilder(documents).getProjectFile().build()
    default:
      return documents
  }
}
export class EcosolutionDocumentsBuilder {
  private documents: DocumentEcosolutions[] = []

  constructor(documents?: DocumentEcosolutions[]) {
    if (!documents) {
      return
    }
    this.documents = documents
  }

  getCertificates(): EcosolutionDocumentsBuilder {
    this.documents = this.documents.filter((doc) => doc.documentType?.parentCode === PARENT_CODE.CERTIFICATE)
    return this
  }

  getTechnicalSheet(): EcosolutionDocumentsBuilder {
    this.documents = this.documents.filter((doc) => doc.documentType?.parentCode === PARENT_CODE.TECHNICAL_SHEET)
    return this
  }

  getProjectFile(): EcosolutionDocumentsBuilder {
    this.documents = this.documents.filter((doc) => doc.documentType?.parentCode === PARENT_CODE.PROJECT_FILE)
    return this
  }

  assignOtherDocumentType(): EcosolutionDocumentsBuilder {
    const otherDocumentType: DocumentTypeEcosolutions = {
      code: 'OTHER',
      description: 'other set automatically',
      name: 'Other',
      parentCode: PARENT_CODE.CERTIFICATE,
      fieldOrder: 5,
    }
    this.documents = this.documents.map((doc) => {
      if (!doc.documentType) {
        doc.documentType = otherDocumentType
      }
      return doc
    })
    return this
  }

  build(): DocumentEcosolutions[] {
    return this.documents
  }
}

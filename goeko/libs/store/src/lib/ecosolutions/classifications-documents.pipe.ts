import { Pipe, PipeTransform } from '@angular/core'
import { PARENT_CODE } from '../classificactions/public-api'
import { DocumentEcosolutions } from './ecosolution.interface'
import { getDocumentTypeByParanteCode } from './ecosolutions-document.builder'

@Pipe({
  name: 'filterByDocumentType',
  standalone: true,
})
export class FilterByDocumentTypePipe implements PipeTransform {
  transform(documents: DocumentEcosolutions[], documentType: keyof typeof PARENT_CODE): any[] {
    if (!documents || !documentType) {
      return documents
    }
    return getDocumentTypeByParanteCode(documents, documentType)
  }
}

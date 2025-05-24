import { Pipe, PipeTransform } from '@angular/core'
import { DocumentEcosolutions } from './ecosolution.interface'
import { getDocumentTypeByParanteCode } from './ecosolutions-document.builder'

@Pipe({
  name: 'filterByDocumentType',
  standalone: true,
})
export class FilterByDocumentTypePipe implements PipeTransform {
  transform(documents: DocumentEcosolutions[], documentType: string): any[] {
    if (!documents || !documentType) {
      return documents
    }
    return getDocumentTypeByParanteCode(documents, documentType)
  }
}

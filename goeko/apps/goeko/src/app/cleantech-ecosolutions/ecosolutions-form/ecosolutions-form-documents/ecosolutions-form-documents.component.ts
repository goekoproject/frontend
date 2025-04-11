import { CommonModule } from '@angular/common'
import { Component, effect, inject, input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SelectCertificateComponent } from '@goeko/business-ui'
import { DocumentEcosolutions } from '@goeko/store'
import { FileUploadComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-ecosolutions-form-documents',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule, FileUploadComponent, SelectCertificateComponent],
  templateUrl: './ecosolutions-form-documents.component.html',
  styleUrl: './ecosolutions-form-documents.component.scss',
})
export class EcosolutionsFormDocumentsComponent implements OnInit {
  private _fb = inject(FormBuilder)

  public parentForm = input.required<FormGroup>()
  isReadOnly = input<boolean>(false)
  public ecosolutionCertificates = input<Array<DocumentEcosolutions>>()

  private _documentForRemove = new Array<string>()

  public get certificates(): FormArray {
    return this.parentForm().get('certificates') as FormArray
  }

  effectLoadCertificates = effect(() => {
    if (Array.isArray(this.ecosolutionCertificates()) && (this.ecosolutionCertificates()?.length || 0) > 0) {
      this._setCertificates(this.ecosolutionCertificates())
    }
  })

  private _setCertificates(certificates?: DocumentEcosolutions[]) {
    certificates?.forEach((certificate) => {
      this.certificates.push(
        this._fb.control({
          documentType: certificate?.documentType?.code,
          name: certificate.name,
          id: certificate.id,
          url: certificate.url,
        }),
      )
    })
  }
  addCertificates(file: File | null) {
    this.certificates.push(this._fb.control(file))
  }
  addDocumentForRemove(id: string | string[]) {
    if (!id || id.length === 0) {
      return
    }
    this._documentForRemove.push(...(Array.isArray(id) ? id : [id]))
  }

  ngOnInit(): void {
    this._changehaveTechnicalSheet()
    this._changeCertificate()
  }

  private _changehaveTechnicalSheet() {
    this.parentForm()
      .get('haveTechnicalSheet')
      ?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          this.parentForm().get('technicalSheet')?.setValidators(Validators.required)
        } else {
          this.addDocumentForRemove([this.parentForm().get('technicalSheet')?.value?.id])
          this.parentForm().get('technicalSheet')?.clearValidators()
          this.parentForm().get('technicalSheet')?.reset()
        }
        this.parentForm().get('technicalSheet')?.updateValueAndValidity()
      })
  }

  private _changeCertificate() {
    this.parentForm()
      .get('certified')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.parentForm().get('certificates')?.setValidators(Validators.required)
        } else {
          const idsForRemove = this.parentForm()
            .get('certificates')
            ?.value.map((certificate: DocumentEcosolutions) => certificate.id)
          this.addDocumentForRemove(idsForRemove)

          this.parentForm().get('certificates')?.clearValidators()
          this.parentForm().get('certificates')?.reset()
        }
        this.parentForm().get('certificates')?.updateValueAndValidity()
      })
  }
}

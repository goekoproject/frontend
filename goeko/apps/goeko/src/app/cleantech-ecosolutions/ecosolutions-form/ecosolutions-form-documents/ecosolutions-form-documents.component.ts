import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SelectCertificateComponent } from '@goeko/business-ui'
import { DocumentEcosolutions, EcosolutionDocumentsBuilder, Ecosolutions } from '@goeko/store'
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
  public ecosolutionData = input<Ecosolutions>()
  public certificates = computed(() =>
    new EcosolutionDocumentsBuilder(this._ecosolutionDocuments()).assignOtherDocumentType().getCertificates().build(),
  )
  public certificatesFormArray = computed(() => this.parentForm().get('certificates') as FormArray)

  private _ecosolutionDocuments = computed(() => this.ecosolutionData()?.documents)
  private _certified = computed(() => this.ecosolutionData()?.certified)
  private _technicalSheet = computed(
    () => new EcosolutionDocumentsBuilder(this._ecosolutionDocuments()).assignOtherDocumentType().getTechnicalSheet().build()[0],
  )
  private _haveTechnicalSheet = computed(() => !!this.parentForm().get('technicalSheet')?.value)
  private _documentForRemove = new Array<string>()

  effectLoadCertificates = effect(() => {
    if (this.certificates().length > 0) {
      this.parentForm().get('certified')?.patchValue(this._certified())
      this._setCertificates()
    }
  })

  private _setCertificates() {
    this.certificates()?.forEach((certificate) => {
      this.certificatesFormArray()?.push(
        this._fb.control({
          documentType: certificate?.documentType?.code,
          name: certificate.name,
          id: certificate.id,
          url: certificate.url,
        }),
      )
    })
  }

  effectLoadTechnicalSheet = effect(() => {
    if (this._technicalSheet()) {
      this.parentForm().get('technicalSheet')?.patchValue(this._technicalSheet())
      this.parentForm().get('haveTechnicalSheet')?.patchValue(this._haveTechnicalSheet())
    }
  })

  ngOnInit(): void {
    this._changehaveTechnicalSheet()
    this._changeCertificate()
  }

  addCertificates(file: File | null) {
    if (!file) {
      return
    }
    this.certificatesFormArray()?.push(this._fb.control(file))
  }
  addDocumentForRemove(id: string | string[]) {
    if (!id || id.length === 0) {
      return
    }
    this._documentForRemove.push(...(Array.isArray(id) ? id : [id]))
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
          this.certificatesFormArray()?.setValidators(Validators.required)
        } else {
          const idsForRemove = this.certificatesFormArray()?.value.map((certificate: DocumentEcosolutions) => certificate.id)
          this.addDocumentForRemove(idsForRemove)

          this.certificatesFormArray()?.clearValidators()
          this.certificatesFormArray()?.reset()
        }
        this.certificatesFormArray()?.updateValueAndValidity()
      })
  }
}

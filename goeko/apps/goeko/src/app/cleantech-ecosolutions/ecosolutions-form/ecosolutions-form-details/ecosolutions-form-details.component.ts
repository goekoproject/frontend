import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Ecosolutions } from '@goeko/store'
import { FormErrorTextComponent, GoInputComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor'
import { EDITOR_TOOLBAR_ECOSOLUTIONS } from '../editor-toolbar.constants'

@Component({
  selector: 'goeko-ecosolutions-form-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule, FormErrorTextComponent, GoInputComponent, TranslatePipe],
  templateUrl: './ecosolutions-form-details.component.html',
  styleUrl: './ecosolutions-form-details.component.scss',
})
export class EcosolutionsFormDetailsComponent implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder)
  public parentForm = input.required<FormGroup>()
  public ecosolutionDetails = input<Ecosolutions>()
  public toolbar: Toolbar = EDITOR_TOOLBAR_ECOSOLUTIONS

  public selectedFormLang = computed(() => {
    return { code: 'fr', index: 0 }
  })
  public get descriptionTranslations(): FormArray {
    return this.parentForm().get('descriptionTranslations') as FormArray
  }
  public get nameTranslations(): FormArray {
    return this.parentForm().get('nameTranslations') as FormArray
  }
  public get detailedDescriptionTranslations(): FormArray {
    return this.parentForm().get('detailedDescriptionTranslations') as FormArray
  }
  public get priceDescriptionTranslations(): FormArray {
    return this.parentForm().get('priceDescriptionTranslations') as FormArray
  }
  public editor!: Editor

  effectLoadDetails = effect(() => {
    if (this.ecosolutionDetails()) {
      this._buildFormArrays(this.ecosolutionDetails())
    }
  })
  ngOnInit(): void {
    this.editor = new Editor()
  }

  ngOnDestroy(): void {
    this.editor?.destroy()
  }

  private _buildFormArrays(formValue?: Ecosolutions): void {
    if (!formValue) {
      return
    }
    this._patchFormArray(this.nameTranslations, formValue.nameTranslations)
    this._patchFormArray(this.descriptionTranslations, formValue.descriptionTranslations)
    this._patchFormArray(this.detailedDescriptionTranslations, formValue.detailedDescriptionTranslations)
    this._patchFormArray(this.priceDescriptionTranslations, formValue.priceDescriptionTranslations)
  }

  private _patchFormArray(formArray: FormArray, values: any[]): void {
    formArray.clear()
    values.forEach(() => {
      formArray.push(this._getFormGroupFieldTranslations('fr'))
    })
    formArray.reset(values)
  }
  private _seTranslatedProperties(codeLang = 'fr') {
    this._addNameTranslations(codeLang)
    this._addDescriptionTranslations(codeLang)
    this._detailDescriptionTranslations(codeLang)
    this._priceDescriptionTranslations(codeLang)
  }

  private _addNameTranslations(codeLang: string): void {
    const nameTranslations = this.parentForm().get('nameTranslations') as FormArray
    nameTranslations.push(this._getFormGroupFieldTranslations(codeLang))
  }
  private _addDescriptionTranslations(codeLang: string): void {
    const descriptionTranslations = this.parentForm().get('descriptionTranslations') as FormArray
    descriptionTranslations.push(this._getFormGroupFieldTranslations(codeLang))
  }

  private _detailDescriptionTranslations(codeLang: string): void {
    const detailedDescriptionTranslations = this.parentForm().get('detailedDescriptionTranslations') as FormArray
    detailedDescriptionTranslations.push(this._getFormGroupEditor(codeLang))
  }

  private _priceDescriptionTranslations(codeLang: string): void {
    const priceDescriptionTranslations = this.parentForm().get('priceDescriptionTranslations') as FormArray
    priceDescriptionTranslations.push(this._getFormGroupFieldTranslations(codeLang))
  }
  private _getFormGroupEditor(code: string) {
    return this._fb.group({
      label: new FormControl(''),
      lang: new FormControl(code),
    })
  }
  private _getFormGroupFieldTranslations(code: string) {
    return this._fb.group({
      label: new FormControl(''),
      lang: new FormControl(code),
    })
  }
}

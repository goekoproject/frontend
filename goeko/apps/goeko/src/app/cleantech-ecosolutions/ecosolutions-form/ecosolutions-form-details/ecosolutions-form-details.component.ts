import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, OnDestroy, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CODE_LANG } from '@goeko/core'
import { Ecosolutions, TranslatedProperties } from '@goeko/store'
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

  public nameTranslations = computed(() => this.parentForm().get('nameTranslations') as FormArray)
  public descriptionTranslations = computed(() => this.parentForm().get('descriptionTranslations') as FormArray)
  public detailedDescriptionTranslations = computed(() => this.parentForm().get('detailedDescriptionTranslations') as FormArray)
  public priceDescriptionTranslations = computed(() => this.parentForm().get('priceDescriptionTranslations') as FormArray)
  public activateTranslate = signal(false)
  public lang = signal(CODE_LANG)
  public selectedLangForTranslate = signal<Array<string>>([])
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
    this._patchFormArray(this.nameTranslations(), formValue.nameTranslations)
    this._patchFormArray(this.descriptionTranslations(), formValue.descriptionTranslations)
    this._patchFormArray(this.detailedDescriptionTranslations(), formValue.detailedDescriptionTranslations)
    this._patchFormArray(this.priceDescriptionTranslations(), formValue.priceDescriptionTranslations)
  }

  private _patchFormArray(formArray: FormArray, values: TranslatedProperties[]): void {
    formArray.clear()
    values.forEach((value) => {
      formArray.push(this._createFormGroupTranslations(value.lang))
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
    this.nameTranslations().push(this._createFormGroupTranslations(codeLang))
  }
  private _addDescriptionTranslations(codeLang: string): void {
    this.descriptionTranslations().push(this._createFormGroupTranslations(codeLang))
  }

  private _detailDescriptionTranslations(codeLang: string): void {
    this.detailedDescriptionTranslations().push(this._createFormGroupTranslations(codeLang))
  }

  private _priceDescriptionTranslations(codeLang: string): void {
    this.priceDescriptionTranslations().push(this._createFormGroupTranslations(codeLang))
  }

  private _createFormGroupTranslations(code: string) {
    return this._fb.group({
      label: new FormControl('', Validators.required),
      lang: new FormControl(code),
    })
  }
}

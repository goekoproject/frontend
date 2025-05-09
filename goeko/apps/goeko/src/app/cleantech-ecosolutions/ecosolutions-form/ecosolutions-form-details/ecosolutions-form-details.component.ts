import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, OnDestroy, signal } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LanguageSwitcherComponent } from '@goeko/business-ui'
import { Lang, LANGS } from '@goeko/core'
import { Ecosolutions, TranslatedProperties } from '@goeko/store'
import { BadgeModule, FormErrorTextComponent, GoInputComponent } from '@goeko/ui'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor'
import { forkJoin } from 'rxjs'
import { EcosolutionsManagmentService } from '../ecosolutions-managment.service'
import { EDITOR_TOOLBAR_ECOSOLUTIONS } from '../editor-toolbar.constants'

function arraySetEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false
  const setA = new Set(a)
  const setB = new Set(b)
  if (setA.size !== setB.size) return false
  for (const item of setA) {
    if (!setB.has(item)) return false
  }
  return true
}

interface TrasnlaledSwitcherField {
  [key: string]: string
}
@Component({
  selector: 'goeko-ecosolutions-form-details',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitcherComponent,
    ReactiveFormsModule,
    NgxEditorModule,
    FormErrorTextComponent,
    GoInputComponent,
    TranslatePipe,
    BadgeModule,
  ],
  templateUrl: './ecosolutions-form-details.component.html',
  styleUrl: './ecosolutions-form-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcosolutionsFormDetailsComponent implements OnDestroy {
  private _fb = inject(FormBuilder)
  private _translateService = inject(TranslateService)
  private _ecosolutionsManagment = inject(EcosolutionsManagmentService)
  private _cf = inject(ChangeDetectorRef)
  public parentForm = input.required<FormGroup>()
  public ecosolutionDetails = input<Ecosolutions>()
  public toolbar: Toolbar = EDITOR_TOOLBAR_ECOSOLUTIONS
  public currentLang = signal<string>(this._translateService.currentLang)

  public selectedFormLang = signal<TrasnlaledSwitcherField>({
    descriptionTranslations: this.currentLang(),
    detailedDescriptionTranslations: this.currentLang(),
    priceDescriptionTranslations: this.currentLang(),
  })

  public languageForTranslate = signal<string[]>([], { equal: arraySetEqual })
  public langField = computed(() =>
    LANGS.filter((lang) => this.languageForTranslate().includes(lang.code) || lang.code === this._translateService.currentLang),
  )
  public languageAvailable = signal([...LANGS].filter((lang) => lang.code !== this._translateService.currentLang))

  public nameTranslations = computed(() => this.parentForm().get('nameTranslations') as FormArray)
  public descriptionTranslations = computed(() => this.parentForm().get('descriptionTranslations') as FormArray)
  public detailedDescriptionTranslations = computed(() => this.parentForm().get('detailedDescriptionTranslations') as FormArray)
  public priceDescriptionTranslations = computed(() => this.parentForm().get('priceDescriptionTranslations') as FormArray)
  public showLanguageSwitcher = signal(false)
  public editors = new Array<Editor>()

  effectLoadDetails = effect(() => {
    this._initFormArrays()
    if (this.ecosolutionDetails()) {
      this._buildFormArrays(this.ecosolutionDetails())
    }
    this.detailedDescriptionTranslations().controls.forEach(() => this.editors.push(new Editor()))
  })

  ngOnDestroy(): void {
    this.editors.forEach((editor) => editor.destroy())
  }

  selectedChange(lang: Lang) {
    this.languageForTranslate.update((prev) =>
      prev.includes(lang.code) ? prev.filter((code) => code !== lang.code) : [...prev, lang.code],
    )
  }

  private _initFormArrays(): void {
    this.nameTranslations().push(this._createFormGroupTranslations(this.currentLang()))
    this.descriptionTranslations().push(this._createFormGroupTranslations(this.currentLang()))
    this.detailedDescriptionTranslations().push(this._createFormGroupTranslations(this.currentLang()))
    this.priceDescriptionTranslations().push(this._createFormGroupTranslations(this.currentLang()))
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
    setTimeout(() => {
      values.forEach((value) => {
        const control = this._createFormGroupTranslations(value.lang, value.label, formArray)
        if (control) {
          formArray.push(control)
        }
      })
      formArray.reset(values)

      this._cf.markForCheck()
    })
  }
  activateTranslate() {
    const texts = [
      this.nameTranslations().at(0)?.value.label || '',
      this.descriptionTranslations().at(0)?.value.label || '',
      this.detailedDescriptionTranslations().at(0)?.value.label || '',
      this.priceDescriptionTranslations().at(0)?.value.label || '',
    ].filter(Boolean)
    const language = this.languageForTranslate()

    const translates$ = language.map((lang) =>
      this._ecosolutionsManagment.translateTexts({
        texts: texts,
        originalLanguage: this.currentLang(),
        targetLanguage: lang === 'en' ? 'en-GB' : lang,
      }),
    )
    forkJoin(translates$).subscribe((result) => {
      language.forEach((lang, i) => {
        const [name, desc, detailDesc, priceDesc] = result[i]
        this._addNameTranslations(lang, name)
        this._descriptionTranslationsTranslations(lang, desc)
        this._detailDescriptionTranslations(lang, detailDesc)
        this._priceDescriptionTranslations(lang, priceDesc)
      })
      this.showLanguageSwitcher.set(true)
    })
  }

  selectedChangeForDetail(lang: string, field: string) {
    this.selectedFormLang.update((prev) => ({ ...prev, [field]: lang }))
  }

  showTranslations() {
    this.showLanguageSwitcher.set(true)
    const languageToShower = this.detailedDescriptionTranslations().controls.map((control) => control.value.lang) as string[]
    this.languageForTranslate.set(languageToShower)
    this._cf.markForCheck()
  }

  private _addNameTranslations(codeLang: string, label: string): void {
    this.nameTranslations().push(this._createFormGroupTranslations(codeLang, label, this.nameTranslations()))
  }
  private _descriptionTranslationsTranslations(codeLang: string, label: string): void {
    this.descriptionTranslations().push(this._createFormGroupTranslations(codeLang, label, this.descriptionTranslations()))
  }
  private _detailDescriptionTranslations(codeLang: string, label: string): void {
    this.editors = []
    this.detailedDescriptionTranslations().push(this._createFormGroupTranslations(codeLang, label, this.detailedDescriptionTranslations()))
    this.detailedDescriptionTranslations().controls.forEach(() => this.editors.push(new Editor()))
  }
  private _priceDescriptionTranslations(codeLang: string, label: string): void {
    this.priceDescriptionTranslations().push(this._createFormGroupTranslations(codeLang, label, this.priceDescriptionTranslations()))
  }
  private _createFormGroupTranslations(code: string, label?: string, control?: FormArray) {
    if (control?.value.some((value: { lang: string }) => value.lang === code)) {
      this.setLabelTranslated(control, code, label as string)
      return undefined
    }
    return this._fb.group({
      label: new FormControl(label || '', Validators.required),
      lang: new FormControl(code),
    })
  }

  private setLabelTranslated(formArray: FormArray, codeLang: string, label: string): void {
    formArray.controls.forEach((control) => {
      if (control.value.lang === codeLang) {
        control.get('label')?.setValue(label)
      }
    })
  }
}

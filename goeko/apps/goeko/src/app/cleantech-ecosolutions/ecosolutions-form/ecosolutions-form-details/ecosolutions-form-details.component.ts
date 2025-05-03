import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject, input, OnDestroy, OnInit, signal } from '@angular/core'
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
})
export class EcosolutionsFormDetailsComponent implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder)
  private _translateService = inject(TranslateService)
  private _ecosolutionsManagment = inject(EcosolutionsManagmentService)
  public parentForm = input.required<FormGroup>()
  public ecosolutionDetails = input<Ecosolutions>()
  public toolbar: Toolbar = EDITOR_TOOLBAR_ECOSOLUTIONS

  public selectedFormLang = signal<TrasnlaledSwitcherField>({
    descriptionTranslations: this._translateService.currentLang,
    detailedDescriptionTranslations: this._translateService.currentLang,
    priceDescriptionTranslations: this._translateService.currentLang,
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

  selectedChange(lang: Lang) {
    this.languageForTranslate.update((prev) =>
      prev.includes(lang.code) ? prev.filter((code) => code !== lang.code) : [...prev, lang.code],
    )
    // this._seTranslatedProperties(lang.code)
  }
  activateTranslate() {
    const texts = [
      this.descriptionTranslations().at(0)?.value.label,
      this.detailedDescriptionTranslations().at(0)?.value.label,
      this.priceDescriptionTranslations().at(0)?.value.label,
    ].filter(Boolean)
    const language = this.languageForTranslate()

    const translates$ = language.map((lang) =>
      this._ecosolutionsManagment.translateTexts({
        texts: texts,
        originalLanguage: this._translateService.currentLang,
        targetLanguage: lang === 'en' ? 'en-GB' : lang,
      }),
    )
    forkJoin(translates$).subscribe((result) => {
      language.forEach((lang, i) => {
        const [desc, detailDesc, priceDesc] = result[i] // cada resultado es un array de 3 textos
        this._descriptionTranslationsTranslations(lang, desc)
        this._detailDescriptionTranslations(lang, detailDesc)
        this._priceDescriptionTranslations(lang, priceDesc)
      })
      console.log(this.descriptionTranslations())
      this.showLanguageSwitcher.set(true)
    })
  }

  selectedChangeForDetail(lang: string, field: string) {
    this.selectedFormLang.update((prev) => ({ ...prev, [field]: lang }))
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

  private _addNameTranslations(codeLang: string): void {
    this.nameTranslations().push(this._createFormGroupTranslations(codeLang, ''))
  }
  private _descriptionTranslationsTranslations(codeLang: string, label: string): void {
    this.descriptionTranslations().push(this._createFormGroupTranslations(codeLang, label))
  }
  private _detailDescriptionTranslations(codeLang: string, label: string): void {
    this.detailedDescriptionTranslations().push(this._createFormGroupTranslations(codeLang, label))
  }
  private _priceDescriptionTranslations(codeLang: string, label: string): void {
    this.priceDescriptionTranslations().push(this._createFormGroupTranslations(codeLang, label))
  }
  private _createFormGroupTranslations(code: string, label?: string) {
    return this._fb.group({
      label: new FormControl(label, Validators.required),
      lang: new FormControl(code),
    })
  }
}

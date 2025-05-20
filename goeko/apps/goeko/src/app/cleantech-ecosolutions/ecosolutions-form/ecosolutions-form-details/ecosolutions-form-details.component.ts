import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LanguageSwitcherComponent } from '@goeko/business-ui'
import { Lang, LANGS } from '@goeko/core'
import { Ecosolutions, TranslatedProperties } from '@goeko/store'
import { BadgeModule, FormErrorTextComponent, GoInputComponent } from '@goeko/ui'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor'
import { forkJoin, takeLast } from 'rxjs'
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
export class EcosolutionsFormDetailsComponent implements AfterViewInit, OnDestroy {
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
  public switcherLang = computed(() =>
    LANGS.filter((lang) => this.languageForTranslate().includes(lang.code) || lang.code === this._translateService.currentLang),
  )
  public languageAvailable = signal([...LANGS].filter((lang) => lang.code !== this._translateService.currentLang))

  public selectedLang: string[] = []
  public nameTranslations = computed(() => this.parentForm().get('nameTranslations') as FormArray)
  public descriptionTranslations = computed(() => this.parentForm().get('descriptionTranslations') as FormArray)
  public detailedDescriptionTranslations = computed(() => this.parentForm().get('detailedDescriptionTranslations') as FormArray)
  public priceDescriptionTranslations = computed(() => this.parentForm().get('priceDescriptionTranslations') as FormArray)
  public showLanguageSwitcher = signal(false)
  public editors = new Array<Editor>()

  effectLoadDetails = effect(
    () => {
      if (this.ecosolutionDetails()) {
        this._buildFormArrays(this.ecosolutionDetails())
      }
      /*     Object.keys(this.parentForm().controls).forEach((key) => {
        const control = this.parentForm().get(key)
        if (control && control.invalid) {
          console.log(key + ' -> ', control.invalid)
        }
      }) */
    },
    { allowSignalWrites: true },
  )

  ngAfterViewInit(): void {
    this._initFormArrays()
  }

  ngOnDestroy(): void {
    this.editors.forEach((editor) => editor.destroy())
  }

  private _initFormArrays(): void {
    this.nameTranslations().push(this._initFormGroupTranslations(this.currentLang()))
    this.descriptionTranslations().push(this._initFormGroupTranslations(this.currentLang()))
    this.detailedDescriptionTranslations().push(this._initFormGroupTranslations(this.currentLang()))
    this.priceDescriptionTranslations().push(this._initFormGroupTranslations(this.currentLang()))
    this.editors.push(new Editor())
  }

  private _buildFormArrays(formValue?: Ecosolutions): void {
    if (!formValue) {
      return
    }
    this._patchFormArray(this.nameTranslations(), formValue.nameTranslations)
    this._patchFormArray(this.descriptionTranslations(), formValue.descriptionTranslations)
    this._patchFormArrayEditor(this.detailedDescriptionTranslations(), formValue.detailedDescriptionTranslations)
    this._patchFormArray(this.priceDescriptionTranslations(), formValue.priceDescriptionTranslations)
    setTimeout(() => {
      this.showTranslations()
    })
  }

  private showTranslations(): void {
    this.showLanguageSwitcher.set(true)
    const languageToShower = this.detailedDescriptionTranslations().controls.map((control) => control.value.lang) as string[]
    this.languageForTranslate.set(languageToShower)
    this._cf.markForCheck()
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

  private _patchFormArrayEditor(formArray: FormArray, values: TranslatedProperties[]): void {
    values.forEach((value) => {
      const control = this._createFormGroupTranslations(value.lang, value.label, formArray)
      if (control) {
        formArray.push(control)
        this.editors.push(new Editor())
      }
    })
    formArray.reset(values)

    this._cf.markForCheck()
  }

  selectedChange(lang: Lang) {
    if (!this.selectedLang.includes(lang.code)) {
      this.selectedLang.push(lang.code)
    }
  }
  makeTranslate() {
    const texts = [
      this.nameTranslations().at(0)?.value.label || '',
      this.descriptionTranslations().at(0)?.value.label || '',
      this.getPlainText(this.detailedDescriptionTranslations().at(0)?.value.label || ''),
      this.priceDescriptionTranslations().at(0)?.value.label || '',
    ].filter(Boolean)
    const language = this.selectedLang

    const translates$ = language.map((lang) =>
      this._ecosolutionsManagment.translateTexts({
        texts: texts,
        originalLanguage: this.currentLang(),
        targetLanguage: lang === 'en' ? 'en-GB' : lang,
      }),
    )
    forkJoin(translates$)
      .pipe(takeLast(1))
      .subscribe((result) => {
        language.forEach((lang, i) => {
          const [name, desc, detailDesc, priceDesc] = result[i]
          this._addNameTranslations(lang, name)
          this._descriptionTranslationsTranslations(lang, desc)
          this._detailDescriptionTranslations(lang, detailDesc)
          this._priceDescriptionTranslations(lang, priceDesc)
        })
        this.showLanguageSwitcher.set(true)
        this.languageForTranslate.set(this.selectedLang)
        this.selectedLang = []
      })
  }

  selectedChangeForDetail(lang: string, field: string) {
    this.selectedFormLang.update((prev) => ({ ...prev, [field]: lang }))
  }

  private _addNameTranslations(codeLang: string, label: string): void {
    const control = this._createFormGroupTranslations(codeLang, label, this.nameTranslations())
    if (control) {
      this.nameTranslations().push(control)
    }
  }
  private _descriptionTranslationsTranslations(codeLang: string, label: string): void {
    const control = this._createFormGroupTranslations(codeLang, label, this.descriptionTranslations())
    if (control) {
      this.descriptionTranslations().push(control)
    }
  }
  private _detailDescriptionTranslations(codeLang: string, label: string): void {
    const control = this._createFormGroupTranslations(codeLang, label, this.detailedDescriptionTranslations())
    if (control) {
      this.detailedDescriptionTranslations().push(control)
      if (control.pristine) {
        /*  this.editors.forEach((editor) => editor.update)
        this.editors = []
        this.detailedDescriptionTranslations().controls.forEach(() => this.editors.push(new Editor())) */
      }
      console.log(this.editors)
    }
  }
  private _priceDescriptionTranslations(codeLang: string, label: string): void {
    const control = this._createFormGroupTranslations(codeLang, label, this.priceDescriptionTranslations())
    if (control) {
      this.priceDescriptionTranslations().push(control)
    }
  }
  private _createFormGroupTranslations(code: string, label?: string, control?: FormArray) {
    const exist = control?.value.some((value: { lang: string }) => value.lang === code)
    if (exist) {
      this.setLabelTranslated(control as FormArray, code, label as string)
      return undefined
    }

    return this._initFormGroupTranslations(code, label)
  }

  private _initFormGroupTranslations(codeLang: string, label?: string) {
    if (!codeLang) {
      return
    }
    return this._fb.group({
      label: new FormControl(label || '', Validators.required),
      lang: new FormControl(codeLang),
    })
  }

  private setLabelTranslated(formArray: FormArray, codeLang: string, label: string): void {
    formArray.controls.forEach((control) => {
      if (control.value.lang === codeLang && formArray.dirty) {
        control.get('label')?.setValue(label)
      }
    })
  }

  private getPlainText(value: string): string {
    const html = value || ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }
}

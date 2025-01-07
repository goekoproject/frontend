import { CommonModule } from '@angular/common'
import { Component, Inject, inject, OnInit, Optional } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { LANGS } from '@goeko/core'
import { Translations } from '@goeko/store'
import { ButtonModule, DIALOG_DATA, GoInputModule, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

export interface DataSubcategory {
  label: {
    translations: Translations[]
  }
  question: {
    translations: Translations[]
  }
}
@Component({
  selector: 'goeko-dialog-add-subcategory',
  standalone: true,
  imports: [CommonModule, GoInputModule, TranslateModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './dialog-add-subcategory.component.html',
  styleUrl: './dialog-add-subcategory.component.scss',
})
export class DialogAddSubcategoryComponent implements OnInit {
  private _sideDialogService = inject(SideDialogService)

  private get _labelForm() {
    return this.form.get('label') as FormGroup
  }
  private get _quiestionForm() {
    return this.form.get('question') as FormGroup
  }

  public LANGS = LANGS
  public form = new FormGroup({
    label: new FormGroup({}),
    question: new FormGroup({}),
  })
  public formLabelCleantech!: FormGroup

  constructor(
    @Optional()
    @Inject(DIALOG_DATA)
    public data: DataSubcategory,
  ) {}
  ngOnInit(): void {
    this.buildForm()
    if (this.data) {
      this._pathValueForm()
    }
  }

  private buildForm(): void {
    this.LANGS.forEach((lang: any) => {
      this._labelForm.addControl(lang.code, new FormControl(''))
      this._quiestionForm.addControl(lang.code, new FormControl(''))
    })
  }

  private _pathValueForm(): void {
    this.data.label.translations.forEach((translation) => {
      this._labelForm.get(translation.lang)?.patchValue(translation.label)
    })
    this.data.question.translations.forEach((translation) => {
      this._quiestionForm.get(translation.lang)?.patchValue(translation.label)
    })
  }

  submit() {
    const data = this._dataSubcategory()
    this._sideDialogService.closeDialog(data)
  }

  private _dataSubcategory(): DataSubcategory {
    return {
      label: {
        translations: this.convertToTranslations(this.form.get('label') as FormGroup),
      },
      question: {
        translations: this.convertToTranslations(this.form.get('question') as FormGroup),
      },
    }
  }

  private convertToTranslations(formGroup: FormGroup): Translations[] {
    return Object.keys(formGroup.controls)
      .map((lang) => ({
        label: formGroup.get(lang)?.value,
        lang: lang,
      }))
      .filter((l) => l.label)
  }
}

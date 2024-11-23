import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { LANGS } from '@goeko/core'
import { Translations } from '@goeko/store'
import { ButtonModule, GoInputModule, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

interface DataSubcategory {
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
  private get _smeForm() {
    return this.form.get('sme') as FormGroup
  }
  private get _cleantechForm() {
    return this.form.get('cleantech') as FormGroup
  }

  public LANGS = LANGS
  public form = new FormGroup({
    sme: new FormGroup({}),
    cleantech: new FormGroup({}),
  })
  public formLabelCleantech!: FormGroup

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm(): void {
    this.LANGS.forEach((lang: any) => {
      this._smeForm.addControl(lang.code, new FormControl(''))
      this._cleantechForm.addControl(lang.code, new FormControl(''))
    })
  }

  submit() {
    const data = this._dataSubcategory()
    this._sideDialogService.closeDialog(data)
  }

  private _dataSubcategory(): DataSubcategory {
    return {
      label: {
        translations: this.convertToTranslations(this.form.get('sme') as FormGroup),
      },
      question: {
        translations: this.convertToTranslations(this.form.get('cleantech') as FormGroup),
      },
    }
  }

  private convertToTranslations(formGroup: FormGroup): Translations[] {
    return Object.keys(formGroup.controls).map((lang) => ({
      label: formGroup.get(lang)?.value,
      lang: lang,
    }))
  }
}

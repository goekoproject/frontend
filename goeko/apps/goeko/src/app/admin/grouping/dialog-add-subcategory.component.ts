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
      ;(this.form.get('sme') as FormGroup)?.addControl(lang.code, new FormControl(''))
      ;(this.form.get('cleantech') as FormGroup)?.addControl(lang.code, new FormControl(''))
    })
  }

  submit() {
    const data: DataSubcategory = {
      label: {
        translations: this.convertToTranslations(this.form.get('sme') as FormGroup),
      },
      question: {
        translations: this.convertToTranslations(this.form.get('cleantech') as FormGroup),
      },
    }
    this._sideDialogService.closeDialog(data)
  }

  private convertToTranslations(formGroup: FormGroup): Translations[] {
    return Object.keys(formGroup.controls).map((lang) => ({
      label: formGroup.get(lang)?.value,
      lang: lang,
    }))
  }
}

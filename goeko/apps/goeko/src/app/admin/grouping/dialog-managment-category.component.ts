import { CommonModule } from '@angular/common'
import { Component, computed, effect, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { LANGS } from '@goeko/core'
import { Category, ClassificationsService, NewUpdateCategory } from '@goeko/store'
import { ButtonModule, DIALOG_DATA, GoInputModule, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { DialogAddSubcategoryComponent } from './dialog-add-subcategory.component'

interface DialogData {
  category?: Category
}
@Component({
  selector: 'goeko-dialog-managment-category',
  standalone: true,
  imports: [CommonModule, DialogAddSubcategoryComponent, ReactiveFormsModule, ButtonModule, GoInputModule, TranslateModule],
  templateUrl: './dialog-managment-category.component.html',
  styleUrl: './dialog-managment-category.component.scss',
})
export class DialogManagmentCategoryComponent {
  private _classificationService = inject(ClassificationsService)
  private _sideDialogService = inject(SideDialogService)
  private _data = inject<DialogData>(DIALOG_DATA)
  public LANGS = LANGS
  public form = new FormGroup({
    label: new FormGroup({
      translations: new FormArray(LANGS.map((lang) => new FormGroup({ label: new FormControl(''), lang: new FormControl(lang.code) }))),
    }),
    enabled: new FormControl(true),
  })
  public category = toSignal(this._classificationService.getCategoryById(this._data.category?.id || ''), {
    initialValue: this._dataCategory(),
  })
  public nameCategory = computed(() => this._data.category?.label || 'New Category')

  get labelTranslations() {
    return this.form.get('label')?.get('translations') as FormArray
  }
  get formValue() {
    const formValue = this.form.value as NewUpdateCategory
    formValue.label.translations = formValue.label.translations.filter((translation) => translation.label)
    return formValue
  }
  constructor() {
    effect(() => {
      if (this.category()?.id) {
        this.patchValueForm()
      }
    })
  }
  patchValueForm(): void {
    this.category().label.translations.forEach((translation) => {
      const control = this.labelTranslations.controls.find((control) => control.get('lang')?.value === translation.lang)
      if (control) {
        control.get('label')?.patchValue(translation.label)
      }
    })
  }
  submit() {
    if (this._data.category?.id) {
      this._updateCategory()
    } else {
      this.createCategory()
    }
  }

  private _updateCategory() {
    const _id = this._data.category?.id as string
    this._classificationService.updateCategory(_id, this.formValue).subscribe((res) => {
      this._sideDialogService.closeDialog(this.form.value)
    })
  }
  private createCategory() {
    const body = {
      ...this.formValue,
      enabled: undefined,
    }
    this._classificationService.createCategory(body).subscribe((res) => {
      this._sideDialogService.closeDialog(res)
    })
  }

  private _dataCategory(): Category {
    return {} as Category
  }

 
}

import { CommonModule } from '@angular/common'
import { Component, inject, Inject, OnInit, Optional, signal } from '@angular/core'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { LANGS } from '@goeko/core'
import { ClassificationsService, DataSelect, NewProduct, Product } from '@goeko/store'
import { BadgeModule, ButtonModule, DIALOG_DATA, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

interface DialogData {
  productSelected: Product
  subcategoryCode: keyof typeof DataSelect
  subcategoryId: string
}

@Component({
  selector: 'goeko-products-management',
  standalone: true,
  imports: [CommonModule, BadgeModule, ReactiveFormsModule, TranslateModule, ButtonModule],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
})
export class ProductsManagementComponent implements OnInit {
  private _classificationService = inject(ClassificationsService)

  buttonText = 'PRODUCT_ACTIONS.addProduct'
  newProduct = signal(false)

  public form = new FormGroup({
    subcategoryId: new FormControl(this.data.productSelected ? null : this.data.subcategoryId),
    label: new FormGroup({
      translations: new FormArray(
        LANGS.map(
          (lang) =>
            new FormGroup({
              lang: new FormControl(lang.code as string),
              label: new FormControl(''),
            }),
        ),
      ),
    }),
    enabled: new FormControl(true),
  })
  get labelTranslations() {
    return this.form.get('label')?.get('translations') as FormArray
  }

  get formValue() {
    const formValue = this.form.value as NewProduct
    formValue.label.translations = formValue.label.translations.filter((translation) => translation.label)
    return formValue
  }
  constructor(
    @Optional()
    @Inject(DIALOG_DATA)
    public data: DialogData,
    private _sideDialogService: SideDialogService,
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data)
    this.form.patchValue({ label: this.data.productSelected?.label })
  }

  addNewProduct = () => {
    this._classificationService.createProduct(this.formValue).subscribe((product) => {
      this._refreshForm()
    })
  }

  updateProduct = () => {
    this._classificationService.updateProduct(this.data.productSelected.id, this.formValue).subscribe((product) => {
      this.close(true)
    })
  }

  private _refreshForm() {
    this.form.reset({
      subcategoryId: this.data.subcategoryId,
      label: {
        translations: LANGS.map((lang) => ({
          lang: lang.code,
          label: '',
        })),
      },
    })
  }

  close(data?: unknown) {
    this._sideDialogService.closeDialog(data)
  }
}

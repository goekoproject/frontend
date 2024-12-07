import { CommonModule } from '@angular/common'
import { Component, inject, Inject, Optional, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { LANGS } from '@goeko/core'
import { ClassificationsService, DataSelect, ManageProduct, NewProduct } from '@goeko/store'
import { BadgeModule, ButtonModule, DIALOG_DATA, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, switchMap } from 'rxjs'

interface DialogData {
  productSelected: ManageProduct[]
  subcategoryCode: keyof typeof DataSelect
  subcategoryId: string
}
export interface Product {
  id: string
  keyLang: string
}
@Component({
  selector: 'goeko-products-management',
  standalone: true,
  imports: [CommonModule, BadgeModule, ReactiveFormsModule, TranslateModule, ButtonModule],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
})
export class ProductsManagementComponent {
  private _classificationService = inject(ClassificationsService)
  private _refresh$ = new BehaviorSubject<void>(undefined)
  private _products$ = this._refresh$.pipe(switchMap(() => this._classificationService.getProductBySubcategoryId(this.data.subcategoryId)))

  buttonText = 'PRODUCT_ACTIONS.addProduct'
  products = toSignal(this._products$, { initialValue: [] })
  codeProductsSeclected = signal(this.data.productSelected.map((product) => product.code))
  newProduct = signal(false)

  public form = new FormGroup({
    subcategoryId: new FormControl(this.data.subcategoryId),
    label: new FormGroup({
      translations: new FormArray(
        LANGS.map(
          (lang) =>
            new FormGroup({
              lang: new FormControl(lang.code),
              label: new FormControl(''),
            }),
        ),
      ),
    }),
  })
  get labelTranslations() {
    return this.form.get('label')?.get('translations') as FormArray
  }
  private _productSelected!: Product[]
  constructor(
    @Optional()
    @Inject(DIALOG_DATA)
    public data: DialogData,
    private _sideDialogService: SideDialogService,
  ) {}

  valueSelected(productSelected: Product[]) {
    this._productSelected = productSelected
  }

  addNewProduct = () => {
    this._classificationService.createProduct(this.form.value as NewProduct).subscribe((product) => {
      this._refresh$.next()
      this._refreshForm()
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
  addProducts() {
    this._sideDialogService.closeDialog<Product[]>(this._productSelected)
  }
  close() {
    this._sideDialogService.closeDialog<Product[]>()
  }
}

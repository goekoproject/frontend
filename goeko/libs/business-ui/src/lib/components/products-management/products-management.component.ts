import { CommonModule } from '@angular/common'
import { Component, computed, inject, Inject, OnInit, Optional, signal } from '@angular/core'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { LANGS } from '@goeko/core'
import { ClassificationsService, DataSelect, NewProduct, Product } from '@goeko/store'
import { BadgeModule, ButtonModule, DIALOG_DATA, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { ProductToCurrentLangPipe } from '../../pipes/product-to-current-lang.pipe'

interface DialogData {
  productSelected: Product
  products: Product[]
  subcategoryCode: keyof typeof DataSelect
  subcategoryId: string
  mode: 'add' | 'view'
}

@Component({
  selector: 'goeko-products-management',
  standalone: true,
  imports: [CommonModule, BadgeModule, ReactiveFormsModule, TranslateModule, ButtonModule, ProductToCurrentLangPipe],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
})
export class ProductsManagementComponent implements OnInit {
  private _classificationService = inject(ClassificationsService)

  buttonText = 'PRODUCT_ACTIONS.addProduct'
  newProduct = signal(false)
  products = signal<Product[]>([])
  selectedProducts = signal<Product[]>([])

  mode = computed(() => this.data?.mode || 'add')
  idProductsRecevied = computed(() => this.data.products.map((product) => product.id))
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
    this.form.patchValue({ label: this.data.productSelected?.label })
    if (this.data.subcategoryId) {
      this._getProducts()
    }
  }

  private _getProducts = () => {
    this._classificationService.getProductBySubcategoryId(this.data.subcategoryId).subscribe((products) => {
      this.products.set(products)
    })
  }

  addNewProduct = () => {
    const newProduct: NewProduct = {
      label: this.formValue.label,
      subcategoryId: this.formValue.subcategoryId,
    }
    this._classificationService.createProduct(newProduct).subscribe((product) => {
      this._refreshForm()
      this._getProducts()
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

  productsSelected(products: Product[]) {
    this.selectedProducts.set(products)
  }

  sendProducts() {
    this.close(this.selectedProducts())
  }

  close(data?: unknown) {
    this._sideDialogService.closeDialog(data)
  }
}

import { CommonModule } from '@angular/common'
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  effect,
  signal,
} from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoryModule, Product, ProductToCurrentLangPipe, ProductsManagementComponent } from '@goeko/business-ui'
import { LANGS } from '@goeko/core'
import { ClassificationCategoryService, ManageCategory, ManageSubcategory, ProductSelectToManageProduct, Translations } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, SideDialogService, SwitchModule, fadeAnimation, listAnimation } from '@goeko/ui'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { AdminCategoriesDynamicForm } from './admin-categories.dynamic-form'
import { AdminCategoriesService } from './admin-categories.services'

/**
 * merge the categories section and the categories get backend for we have data like icons and preloading data
 * @param categorySection  the category section
 * @param classificationCategory backend categories
 * @returns
 */

@Component({
  selector: 'goeko-admin',
  standalone: true,
  imports: [
    CommonModule,
    CategoryModule,
    TranslateModule,
    GoInputModule,
    ReactiveFormsModule,
    ButtonModule,
    BadgeModule,
    ProductsManagementComponent,
    ProductToCurrentLangPipe,
    SwitchModule,
  ],
  providers: [AdminCategoriesService, ClassificationCategoryService],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, listAnimation],
})
export class AdminCategoriesComponent implements AfterContentInit {
  @ViewChildren('detailCategory')
  detailCategory!: QueryList<ElementRef<HTMLDetailsElement>>
  //Signal
  categories = this._adminCategories.categories as any
  categorySelected = this._adminCategories.categorySelected
  subCategorySelected = this._adminCategories.subCategorySelected
  subCategorySelectedIndex = this._adminCategories.subCategorySelectedIndex

  public form!: FormGroup

  public langs = signal(LANGS)

  private _closeDetailByIndex = (index: number) => {
    const elementDetail = this.detailCategory.get(index)?.nativeElement
    if (elementDetail) {
      elementDetail.open = false
    }
  }

  private _toogleSubcategory = (index: number) => {
    const elementDetail = this.detailCategory.get(index)?.nativeElement
    if (elementDetail) {
      elementDetail.open = !elementDetail.open
    }
  }

  private _closeAllDetail = () => {
    this.detailCategory?.forEach((elementDetail, index: number) => this._closeDetailByIndex(index))
  }

  productControl = (subcategoryCode: string): FormGroup => this.form.get(subcategoryCode)?.get('products') as FormGroup

  getControlForSubCategory(subcategory: string) {
    return this.form?.get(subcategory)
  }

  getTranslations(subcategory: string, typeQuestion: 'label' | 'question'): FormArray {
    return this.getControlForSubCategory(subcategory)?.get(typeQuestion)?.get('translations') as FormArray
  }

  private _translationsForLang: any = {}
  toggleActor = signal<boolean>(false)
  constructor(
    private _adminCategories: AdminCategoriesService,
    private _fb: FormBuilder,
    private _translations: TranslateService,
    private _sideDialogService: SideDialogService,
    private _cdf: ChangeDetectorRef,
  ) {
    effect(() => {
      this._createFormGroup()
      this._cdf.markForCheck()
    })
    this._getTranslationsForLang()
  }

  ngAfterContentInit(): void {
    this._cdf.markForCheck()
  }
  hanldertoggleActor(toggleActor: boolean): void {
    this.toggleActor.set(toggleActor)
  }
  private _getTranslationsForLang() {
    LANGS.forEach((lang) => {
      this._translations.getTranslation(lang.code).subscribe((translations: any) => {
        this._translationsForLang[lang.code] = translations
      })
    })
  }
  private _createFormGroup() {
    this.form = this._fb.group({})
    this.subCategorySelected()?.subcategories.forEach((group: ManageSubcategory) => {
      if (group) {
        const formGroup = this._fb.group({})
        this._buildFormFormsubcategorySelected(group, formGroup)
        this.form.addControl(group.code, formGroup)
      }
    })
  }
  private _buildFormFormsubcategorySelected(group: ManageSubcategory, formGroup: FormGroup) {
    AdminCategoriesDynamicForm.buildForm({ fb: this._fb, group, formGroup })
  }

  selectCategory(categorySelected: any): void {
    this._closeAllDetail()
    this._cdf.markForCheck()
    this.categorySelected.set(categorySelected)
    this.toggleActor.set(true)
  }
  toogleSubcategory(event: Event, index: number) {
    this._toogleSubcategory(index)
    this.toggleActor.set(true)
    event.preventDefault()
  }
  closeDetailCategory(index: number): void {
    this._closeDetailByIndex(index)
  }

  //TODO: create object for mapping
  saveSubcategory() {
    const updateCategory: ManageCategory = {
      ...this.subCategorySelected(),
      id: undefined,
      subcategories: Object.values(this.form.value).map((subcategory: any) => ({
        ...subcategory,
        lang: undefined,
        order: undefined,
      })),
    }
    this._adminCategories.updateSubcategorySelected(updateCategory)
  }

  addProducts(subcategoryCode: string) {
    const dialogResponse = this._openDialogAddProducts(subcategoryCode)
    dialogResponse.subscribe((productsSelected: Product[]) => {
      this._toProductsWithTranslated(productsSelected, subcategoryCode)
    })
  }

  private _openDialogAddProducts = (subcategoryCode: string) => {
    return this._sideDialogService.openDialog<ProductsManagementComponent>(ProductsManagementComponent, {
      productSelected: this.productControl(subcategoryCode)?.value,
      subcategoryCode: subcategoryCode,
    })
  }

  private _toProductsWithTranslated(productsSelected: Product[], subcategoryCode: string) {
    const newProductsValue = productsSelected?.map((product) => {
      const translations = new Array<Translations>()
      this._getTranslationsForProduct(product.keyLang, translations)
      return new ProductSelectToManageProduct(product.id, translations)
    })
    this.productControl(subcategoryCode)?.setValue(newProductsValue)
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    this._cdf.markForCheck()
  }

  //TODO : change product label to en
  private async _getTranslationsForProduct(keyLang: string, translations: Array<Translations>) {
    const keys = keyLang.split('.')
    await Object.keys(this._translationsForLang).forEach((lang) =>
      translations.push({
        label: this._translationsForLang[lang][keys[0]][keys[1]][keys[2]],
        lang: lang === 'en' ? 'gb' : lang,
      }),
    )
  }
}

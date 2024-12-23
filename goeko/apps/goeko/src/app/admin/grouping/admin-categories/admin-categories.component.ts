import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryModule, ProductToCurrentLangPipe, ProductsManagementComponent } from '@goeko/business-ui'
import { CODE_LANG, LANGS } from '@goeko/core'
import {
  Category,
  CategoryMapper,
  ClassificationCategoryService,
  GroupingByClassifications,
  NewCategoryForGrouping,
  NewSubcategory,
  NewUpdateGrouping,
  Product,
  Subcategory,
} from '@goeko/store'
import {
  BadgeModule,
  ButtonModule,
  GoInputModule,
  RadioModule,
  SideDialogService,
  SwitchModule,
  fadeAnimation,
  listAnimation,
} from '@goeko/ui'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { DialogAddSubcategoryComponent } from '../dialog-add-subcategory.component'
import { DialogManagmentCategoryComponent } from '../dialog-managment-category.component'
import { AdminCategoriesService } from './admin-categories.services'

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
    RadioModule,
  ],
  providers: [AdminCategoriesService, ClassificationCategoryService],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, listAnimation],
})
export class AdminCategoriesComponent implements OnInit {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)

  JSON = JSON
  @ViewChildren('detailCategory')
  detailCategory!: QueryList<ElementRef<HTMLDetailsElement>>

  classifications = input<GroupingByClassifications>()

  private mappingClassificationLabel = (classification: Category[] | undefined) =>
    classification?.map((classification) => ({
      ...classification,
      label: classification.label.translations.find((translation) => translation.lang === CODE_LANG.EN)?.label,
    }))

  //Signal
  categorySelected = signal<Category>({} as Category)
  subCategorySelected = computed(() =>
    this.classifications()?.classification.find((classification) => classification.code === this.categorySelected().code),
  )

  categories = computed(() => this.mappingClassificationLabel(this.classifications()?.classification))

  payload = computed(() => {
    return {
      name: this.classifications()?.name || '',
      description: this.classifications()?.description || '',
      classification: signal(
        this.classifications()?.classification.map((category) => CategoryMapper.mapCategoryToNewCategoryForGrouping(category)),
      ),
    }
  })

  private _updateProductsPayload = (subcategory: Subcategory, products: Product[]) => {
    this.payload().classification.update((classification) => {
      const category = classification?.find((category) => category.code === this.categorySelected().code)
      if (category) {
        const subcategorySelected = category.subcategories.find((subcat) => subcat.code === subcategory.code)
        if (subcategorySelected) {
          subcategorySelected.products = products.length > 0 ? products.map((product) => product.code) : undefined
        }
      }
      return classification
    })
  }
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

  getControlForSubCategory(subcategory: string) {
    return this.form?.get(subcategory)
  }

  getTranslations(subcategory: string, typeQuestion: 'label' | 'question'): FormArray {
    return this.getControlForSubCategory(subcategory)?.get(typeQuestion)?.get('translations') as FormArray
  }

  private _translationsForLang: any = {}
  toggleActor = signal<boolean>(false)
  public form!: FormGroup

  constructor(
    private _adminCategories: AdminCategoriesService,
    private _fb: FormBuilder,
    private _translations: TranslateService,
    private _sideDialogService: SideDialogService,
    private _cdf: ChangeDetectorRef,
  ) {
    effect(() => {
      this._getTranslationsForLang()
    })
  }

  ngOnInit(): void {
    const firstCategory = this.classifications()?.classification[0]
    if (firstCategory) {
      this.categorySelected.set(firstCategory)
    }
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
  private _updateGrouping() {
    if (!this.classifications()) {
      return
    }
    const body: NewUpdateGrouping = {
      name: this.classifications()?.name || '',
      description: this.classifications()?.description || '',
      classification: this.payload().classification() as NewCategoryForGrouping[],
    }

    this._adminCategories.updateGrouping(this.classifications()?.id || '', body).subscribe((grouping) => {
      if (grouping) {
        this._fetchData()
      }
    })
  }

  createNewCategory() {
    this._openDialogCategory().subscribe((res: Category) => {})
  }

  editCategory(category: Category) {
    this._openDialogCategory(category).subscribe((res) => {
      if (res) {
        this._fetchData()
      }
    })
  }

  selectCategory(categorySelected: any): void {
    this._closeAllDetail()
    this.categorySelected.set(categorySelected)
    this.toggleActor.set(true)
  }

  private _openDialogCategory(category?: Category) {
    return this._sideDialogService.openDialog<DialogManagmentCategoryComponent>(DialogManagmentCategoryComponent, {
      category,
    })
  }
  toogleSubcategory(event: Event, index: number) {
    this._toogleSubcategory(index)
    this.toggleActor.set(true)
    event.preventDefault()
  }
  closeDetailCategory(index: number): void {
    this._closeDetailByIndex(index)
  }

  addSubcategory() {
    this._openDialgoAddSubcategory().subscribe((res) => {
      if (res) {
        this._addSubcategoryToGrouping({ categoryId: this.categorySelected().id, ...res })
      }
    })
  }

  addNewSubcategoryToCategory(category: Category) {
    this._openDialgoAddSubcategory().subscribe((res) => {})
  }

  private _openDialgoAddSubcategory = () => {
    return this._sideDialogService.openDialog<DialogAddSubcategoryComponent>(DialogAddSubcategoryComponent)
  }

  private _addSubcategoryToGrouping(newSubcategory: NewSubcategory) {
    if (this.classifications()) {
      this._adminCategories
        .addSubcategoryToGrouping(this.classifications() as GroupingByClassifications, newSubcategory)
        .subscribe((grouping) => {
          if (grouping) {
            this._fetchData()
          }
        })
    }
  }

  goToSubcategory(subcategory: Subcategory) {
    this._router.navigate(['../categories', this.categorySelected().code, subcategory.code], { relativeTo: this._route })
  }

  addProductToGrouping(subcategory: Subcategory, product: Product[]) {
    this._openDialogAddProducts(subcategory, product)
  }
  private _openDialogAddProducts = (subcategory: Subcategory, product?: Product[]) => {
    return this._sideDialogService
      .openDialog<ProductsManagementComponent>(ProductsManagementComponent, {
        products: product,
        subcategoryCode: subcategory.code,
        subcategoryId: subcategory.id,
        mode: 'view',
      })
      .subscribe((product) => {
        if (product) {
          this._updateProductsPayload(subcategory, product)
          this._updateGrouping()
        }
      })
  }

  private _fetchData = () => {
    this._router.navigate([], {
      queryParams: { hash: window.crypto.randomUUID() },
    })
  }
}

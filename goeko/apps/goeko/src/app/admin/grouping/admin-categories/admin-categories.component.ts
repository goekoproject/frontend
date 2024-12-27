import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
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
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryModule, ProductToCurrentLangPipe, ProductsManagementComponent } from '@goeko/business-ui'
import { CODE_LANG, LANGS } from '@goeko/core'
import {
  Category,
  CategoryMapper,
  ClassificationCategoryService,
  GroupingByClassifications,
  Product,
  Subcategory,
  SubcategoryResponse,
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
import { switchMap } from 'rxjs'
import { ListSubcategoriesComponent } from '../list-subcategories.component'
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
  subCategorySelected = computed(
    () => this.classifications()?.classification.find((category) => category.code === this.categorySelected().code)?.subcategories,
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
          subcategorySelected.products = products.length > 0 ? products.map((product) => product.code) : []
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
    private _translations: TranslateService,
    private _sideDialogService: SideDialogService,
  ) {
    effect(() => {
      this._getTranslationsForLang()
      if (this.categorySelected() && !this.subCategorySelected()) {
        this.toggleActor.set(true)
      }
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

  selectCategory(categorySelected: any): void {
    this._closeAllDetail()
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

  addSubcategory() {
    this._openDialgoAddSubcategory().subscribe((res) => {
      if (res) {
        this._addSubcategoryToGrouping(res)
      }
    })
  }

  private _openDialgoAddSubcategory = () => {
    return this._sideDialogService.openDialog<ListSubcategoriesComponent>(ListSubcategoriesComponent, {
      categoryId: this.categorySelected().id,
      mode: 'isolation',
    })
  }

  private _addSubcategoryToGrouping(newSubcategories: SubcategoryResponse[]) {
    if (this.classifications()) {
      this._adminCategories
        .addSubcategoryToGrouping(this.classifications() as GroupingByClassifications, newSubcategories)
        .subscribe((grouping) => {
          if (grouping) {
            this._fetchData()
          }
        })
    }
  }

  removeSubcategoryGrouping(subcategory: Subcategory) {
    this._adminCategories
      .removeSubcategoryGrouping(this.classifications() as GroupingByClassifications, this.categorySelected().id, subcategory.id)
      .subscribe((grouping) => {
        if (grouping) {
          this._fetchData()
        }
      })
  }
  goToSubcategory(subcategory: Subcategory) {
    this._router.navigate(['../categories', this.categorySelected().code, subcategory.code], { relativeTo: this._route })
  }

  addProductToGrouping(subcategory: Subcategory, product: Product[] | undefined) {
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
      .pipe(
        switchMap((products) =>
          this._adminCategories.updateProductGrouping(
            this.classifications() as GroupingByClassifications,
            this.categorySelected().id,
            subcategory.id,
            products,
          ),
        ),
      )
      .subscribe((product) => {
        if (product) {
          this._fetchData()
        }
      })
  }

  private _fetchData = () => {
    this._router.navigate([], {
      queryParams: { hash: window.crypto.randomUUID() },
    })
  }
}

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
  viewChild,
  viewChildren,
} from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { CategoryModule, ProductToCurrentLangPipe, ProductsManagementComponent } from '@goeko/business-ui'
import { CODE_LANG, LANGS } from '@goeko/core'
import {
  Category,
  CategoryMapper,
  ClassificationCategoryService,
  GroupingByClassifications,
  ManageSubcategory,
  NewCategoryForGrouping,
  NewSubcategory,
  NewUpdateGrouping,
  Product,
  Subcategory,
  UpdateSubcategory,
} from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputModule, SideDialogService, SwitchModule, fadeAnimation, listAnimation } from '@goeko/ui'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { DialogAddSubcategoryComponent } from '../dialog-add-subcategory.component'
import { DialogManagmentCategoryComponent } from '../dialog-managment-category.component'
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
export class AdminCategoriesComponent implements OnInit {
  JSON = JSON
  @ViewChildren('detailCategory')
  detailCategory!: QueryList<ElementRef<HTMLDetailsElement>>

  nameGrouping = viewChild<ElementRef>('nameGroupingRef')
  descriptionGrouping = viewChild<ElementRef>('descriptionGroupingRef')
  categoryRef = viewChildren<ElementRef>('categoryRef')

  name = computed(() => this.nameGrouping()?.nativeElement.value)
  classifications = input<GroupingByClassifications>()
  get categoriesSelected() {
    return this.categoryRef()
      .filter((category) => category.nativeElement.checked)
      .map((c) => JSON.parse(c.nativeElement.value))
  }

  private _router = inject(Router)

  //Signal
  categorySelected = signal<Category>({} as Category)
  subCategorySelected = computed(() =>
    this.classifications()?.classification.find((classification) => classification.code === this.categorySelected().code),
  )

  categories = computed(() =>
    this.classifications()?.classification.map((classification) => ({
      ...classification,
      label: classification.label.translations.find((translation) => translation.lang === CODE_LANG.EN)?.label,
    })),
  )
  allCategories = signal<Category[]>([])

  products = signal([])
  public langs = signal(LANGS)
  public toogleEditName = signal(false)
  public toogleEditDescription = signal(false)

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
  public form!: FormGroup

  constructor(
    private _adminCategories: AdminCategoriesService,
    private _fb: FormBuilder,
    private _translations: TranslateService,
    private _sideDialogService: SideDialogService,
    private _cdf: ChangeDetectorRef,
  ) {
    effect(() => {
      this._createFormGroup()
      this._getTranslationsForLang()
    })
  }

  ngOnInit(): void {
    const firstCategory = this.classifications()?.classification[0]
    if (firstCategory) {
      this.categorySelected.set(firstCategory)
    }
    if (!this.classifications()) {
      this._getAllCategories()
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
  private _createFormGroup() {
    this.form = this._fb.group({})
    this.subCategorySelected()?.subcategories.forEach((group: any) => {
      if (group) {
        const formGroup = this._fb.group({})
        this._buildFormFormsubcategorySelected(group, formGroup)
        this._cdf.markForCheck()
        this.form.addControl(group.code, formGroup)
      }
    })
  }
  private _buildFormFormsubcategorySelected(group: ManageSubcategory, formGroup: FormGroup) {
    AdminCategoriesDynamicForm.buildForm({ fb: this._fb, group, formGroup })
  }

  onBlurName() {
    this.toogleEditName.set(false)
    this._updateGrouping()
  }
  onBlurDescription() {
    this.toogleEditDescription.set(false)
    this._updateGrouping()
  }

  createGrouping() {
    console.log('this.classifications', this.categoriesSelected)
    this._createGrouping()
  }

  private _createGrouping() {
    if (!this.categoriesSelected) {
      return
    }
    const body: NewUpdateGrouping = {
      name: this.nameGrouping()?.nativeElement.value,
      description: this.descriptionGrouping()?.nativeElement.value,
      classification: this.categoriesSelected.map((category) =>
        CategoryMapper.mapCategoryToNewCategoryForGrouping(category),
      ) as NewCategoryForGrouping[],
    }

    this._adminCategories.createGrouping(body).subscribe((grouping) => {
      if (grouping) {
        this._fetchData()
      }
    })
  }
  private _updateGrouping() {
    if (!this.classifications()) {
      return
    }
    const body: NewUpdateGrouping = {
      name: this.nameGrouping()?.nativeElement.value ?? this.classifications()?.name,
      description: this.nameGrouping()?.nativeElement.description ?? this.classifications()?.description,
      classification: this.classifications()?.classification.map((category) =>
        CategoryMapper.mapCategoryToNewCategoryForGrouping(category),
      ) as NewCategoryForGrouping[],
    }

    this._adminCategories.updateGrouping(this.classifications()?.id || '', body).subscribe((grouping) => {
      if (grouping) {
        this._fetchData()
      }
    })
  }

  newCategory() {
    this._openDialogCategory().subscribe((res) => {
      if (res) {
        this._fetchData()
        this._getAllCategories()
      }
    })
  }

  editCategory(category: Category) {
    this._openDialogCategory(category).subscribe((res) => {
      if (res) {
        this._fetchData()
      }
    })
  }
  private _getAllCategories() {
    this._adminCategories.getAllCategories().subscribe((categories) => {
      this.allCategories.set(categories)
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

  createNewSubcategoryToCategory(categoryId: string) {
    this._openDialgoAddSubcategory().subscribe((res) => {
      if (res) {
        this._adminCategories
          .createSubcategory({
            categoryId,
            label: res.label,
            question: res.question,
          })
          .subscribe((grouping) => {
            if (grouping) {
              this._fetchData()
            }
          })
      }
    })
  }

  addSubcategory() {
    this._openDialgoAddSubcategory().subscribe((res) => {
      if (res) {
        this._addSubcategoryToGrouping({ categoryId: this.categorySelected().id, ...res })
      }
    })
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

  updateSubcategory(id: string, subcategory: Subcategory) {
    const _updateSubcategory: UpdateSubcategory = {
      label: {
        ...subcategory.label,
      },
      question: {
        ...subcategory.question,
      },
      enabled: true,
    }
    this._adminCategories.updateSubcategorySelected(id, _updateSubcategory).subscribe((grouping) => {
      console.log('grouping', grouping)
    })
  }

  addProducts(subcategory: Subcategory) {
    this._openDialogAddProducts(subcategory)
  }
  editProduct(subcategory: Subcategory, product: Product) {
    this._openDialogAddProducts(subcategory, product)
  }
  private _openDialogAddProducts = (subcategory: Subcategory, product?: Product) => {
    return this._sideDialogService
      .openDialog<ProductsManagementComponent>(ProductsManagementComponent, {
        productSelected: product,
        subcategoryCode: subcategory.code,
        subcategoryId: subcategory.id,
      })
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

import { SelectionModel } from '@angular/cdk/collections'
import { CommonModule } from '@angular/common'
import { Component, inject, input, OnInit, output, signal } from '@angular/core'
import { CODE_LANG, LANGS } from '@goeko/core'
import { Category, ClassificationCategoryService, Label, NewSubcategory, SubcategoryResponse } from '@goeko/store'
import { ButtonModule, RadioModule, SideDialogService, ToggleSwitchComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { forkJoin, of, switchMap } from 'rxjs'
import { AdminCategoriesService } from './admin-categories/admin-categories.services'
import { LabelByCategoryPipe } from './admin-categories/label-by-category.pipe'
import { DataSubcategory, DialogAddSubcategoryComponent } from './dialog-add-subcategory.component'
import { DialogManagmentCategoryComponent } from './dialog-managment-category.component'
import { ListSubcategoriesComponent } from './list-subcategories.component'

interface AllDataCategories {
  subcategories: SubcategoryResponse[]
  id: string
  code: string
  label: Label
  open: boolean
}
interface ClassificationGrouping {
  code: string
  subcategories: Array<{ code: string; order: number }>
}
@Component({
  selector: 'goeko-add-category-subcategory-group',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    ToggleSwitchComponent,
    LabelByCategoryPipe,
    RadioModule,
    ListSubcategoriesComponent,
  ],
  providers: [AdminCategoriesService, ClassificationCategoryService],
  templateUrl: './add-category-subcategory-group.component.html',
  styleUrl: './add-category-subcategory-group.component.scss',
})
export class AddCategorySubcategoryGroupComponent implements OnInit {
  private _adminCategoriesService = inject(AdminCategoriesService)
  private _sideDialogService = inject(SideDialogService)
  private _classificationsService = inject(ClassificationCategoryService)
  public langs = signal(LANGS)
  beforeNext = output<any>()
  categories = signal<AllDataCategories[]>([])
  categoryCode = input<string>()
  subcategoryCode = input<string>()
  selectedLangSubcategory = signal<string>(CODE_LANG.EN)

  selectionSubcategories = new SelectionModel<SubcategoryResponse>(true, [], true, (o1, o2) => o1.id === o2.id)

  private _openDialogCategory = (category?: Category) => {
    return this._sideDialogService.openDialog<DialogManagmentCategoryComponent>(DialogManagmentCategoryComponent, {
      category,
    })
  }

  private _openDialgoAddSubcategory = (data?: DataSubcategory) => {
    return this._sideDialogService.openDialog<DialogAddSubcategoryComponent>(DialogAddSubcategoryComponent, data)
  }

  private _categoryToAllDataCategories = (category: Category, subcategories: SubcategoryResponse[] = []): AllDataCategories => {
    return {
      id: category.id,
      code: category.code,
      label: category.label,
      open: false,
      subcategories: subcategories,
    }
  }

  private _allDataCategoriesToCategory = (category: AllDataCategories): Category => {
    return {
      id: category.id,
      code: category.code,
      label: category.label,
      enabled: true,
      order: 0,
      subcategories: [],
    }
  }

  ngOnInit(): void {
    this._adminCategoriesService.getAllCategories().subscribe((categories) => {
      categories.forEach((category) => {
        this._addCategory(category)
      })
      this._navigateToCategoryByCode()
    })
  }

  private _navigateToCategoryByCode() {
    if (this.categoryCode() && this.subcategoryCode() && this.categories()) {
      const AllDataCategories = this.categories().find((category) => category.code === this.categoryCode()) as AllDataCategories
      this._fetchData(AllDataCategories)
    }
  }
  private _addCategory = (category: Category) => {
    const newCategory = this._categoryToAllDataCategories(category)
    this.categories.set([...this.categories(), newCategory])
  }

  private _addAllSubcategory = (categoryId: string, subcategory: SubcategoryResponse[]) => {
    this.categories.update((categories) => {
      return categories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, subcategories: subcategory }
        }
        return category
      })
    })
  }

  private _toogleDetailCategory = (category: AllDataCategories) => {
    this.categories.update((categories: any[]) => {
      return categories.map((c) => {
        if (c.id === category.id) {
          return { ...c, open: true }
        }
        return c
      })
    })
  }

  createNewCategory = () => {
    this._openDialogCategory().subscribe((res: Category) => {
      if (res) {
        this._addCategory(res)
      }
    })
  }

  viewSubcategory = (toogleViewSubcategory: boolean | undefined, category: AllDataCategories) => {
    if (toogleViewSubcategory) {
      this._fetchData(category)
    }
  }
  editCategory = (category: AllDataCategories) => {
    this._openDialogCategory(this._allDataCategoriesToCategory(category)).subscribe((res: Category) => {
      this._fetchData(category)
    })
  }

  addNewSubcategoryToCategory = (category: AllDataCategories) => {
    this._openDialgoAddSubcategory().subscribe((res) => {
      console.log('res', res)
      const newSubcategory: NewSubcategory = {
        categoryId: category.id,
        ...res,
      }
      this._adminCategoriesService.createSubcategory(newSubcategory).subscribe((subcategory) => {})
    })
  }

  private _fetchData = (category: AllDataCategories) => {
    this._adminCategoriesService.getSubcategoriesByCategoryId(category.id).subscribe((res) => {
      this._toogleDetailCategory(category)
      this._addAllSubcategory(category.id, res)
    })
  }

  /** @Missing */
  deleteCategory(category: AllDataCategories) {
    this._adminCategoriesService.deleteCategory(category.id).subscribe((res) => {})
  }

  onSelectionSubcategories = (subcategories: SubcategoryResponse[]) => {
    this.selectionSubcategories.select(...subcategories)
    console.log('group', this.selectionSubcategories.selected)

    /*   this.beforeNext.emit(subcategories) */
  }

  addMasiveSubcategory = (category: AllDataCategories, idLegacy: string) => {
    console.log('id', idLegacy)
    this._classificationsService
      .getClassificationById(idLegacy)
      .pipe(
        switchMap((res) => {
          const subcategories = this.transformSubcategories(category.id, res.subcategories)
          return of(subcategories)
        }),
        switchMap((subcategories) => {
          const createSubcategoryObservables$ = subcategories.map((subcategory) => {
            return this._adminCategoriesService.createSubcategory(subcategory)
          })
          return forkJoin(createSubcategoryObservables$)
        }),
      )
      .subscribe((res) => {
        console.log('res', res)
      })
  }

  private transformSubcategories(categoryId: string, originalSubcategories: any): NewSubcategory[] {
    return originalSubcategories.map((subcategory: any) => ({
      categoryId: categoryId,
      code: subcategory.code,
      label: subcategory.label,
      question: subcategory.question,
    }))
  }
}

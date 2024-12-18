import { CommonModule } from '@angular/common'
import { Component, ElementRef, inject, OnInit, output, signal, viewChildren } from '@angular/core'
import { CODE_LANG, LANGS } from '@goeko/core'
import { Category, Label, SubcategoryResponse } from '@goeko/store'
import { ButtonModule, RadioModule, SideDialogService, ToggleSwitchComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { AdminCategoriesService } from './admin-categories/admin-categories.services'
import { LabelByCategoryPipe } from './admin-categories/label-by-category.pipe'
import { DialogAddSubcategoryComponent } from './dialog-add-subcategory.component'
import { DialogManagmentCategoryComponent } from './dialog-managment-category.component'

interface AllDataCategories {
  subcategories?: SubcategoryResponse[]
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
    DialogManagmentCategoryComponent,
    RadioModule,
  ],
  templateUrl: './add-category-subcategory-group.component.html',
  styleUrl: './add-category-subcategory-group.component.scss',
})
export class AddCategorySubcategoryGroupComponent implements OnInit {
  private _adminCategoriesService = inject(AdminCategoriesService)
  private _sideDialogService = inject(SideDialogService)
  JSON = JSON
  public langs = signal(LANGS)
  subcategoryElement = viewChildren<ElementRef>('subcategoryElement')
  beforeNext = output<any>()
  categories = signal<Category[]>([])
  allDataCategories = signal<AllDataCategories[]>([])

  categorySelected = signal<Category | undefined>(undefined)
  subcategories = signal<SubcategoryResponse[]>([])
  selectedLangSubcategory = signal<string>(CODE_LANG.EN)

  get subcategorySelected() {
    return this.subcategoryElement()
      .filter((subcategory) => subcategory.nativeElement.checked)
      .map((c) => JSON.parse(c.nativeElement.value))
  }
  private _openDialogCategory = (category?: Category) => {
    return this._sideDialogService.openDialog<DialogManagmentCategoryComponent>(DialogManagmentCategoryComponent, {
      category,
    })
  }

  private _openDialgoAddSubcategory = () => {
    return this._sideDialogService.openDialog<DialogAddSubcategoryComponent>(DialogAddSubcategoryComponent)
  }

  ngOnInit(): void {
    this._getAllCategories()
  }

  private _getAllCategories = () => {
    this._adminCategoriesService.getAllCategories().subscribe((categories) => {
      this.categories.set(categories)
      this.allDataCategories.set(
        this.categories().map((category) => {
          return {
            id: category.id,
            code: category.code,
            label: category.label,
            open: false,
            subcategories: [],
          }
        }),
      )
    })
  }
  createNewCategory = () => {
    this._openDialogCategory().subscribe((res: Category) => {})
  }

  deleteCategory(category: Category) {
    this._adminCategoriesService.deleteCategory(category.id).subscribe((res) => {
      if (res) {
      }
    })
  }

  viewSubcategory = (toogleViewSubcategory: boolean, category: any) => {
    if (toogleViewSubcategory) {
      this.categorySelected.set(category)
      this._adminCategoriesService.getSubcategoryByCategoryId(category.id).subscribe((res) => {
        this.subcategories.set(res)
        this._toogleDetailCategory(category)
        this.allDataCategories.update((categories) =>
          categories.map((c) => {
            if (c.id === category.id) {
              return { ...c, subcategories: res }
            }
            return c
          }),
        )
      })
    } else {
      this.categorySelected.set(undefined)
    }
  }

  private _toogleDetailCategory = (category: Category) => {
    this.allDataCategories.update((categories: any[]) => {
      return categories.map((c) => {
        if (c.id === category.id) {
          return { ...c, open: true }
        }
        return c
      })
    })
  }

  addNewSubcategoryToCategory = () => {
    this._openDialgoAddSubcategory().subscribe((res) => {
      this._getAllCategories()
    })
  }

  selectedElement = () => {
    console.log('selectedElement', this.subcategoryElement())
    const dataForGrouping: ClassificationGrouping[] = this.subcategorySelected.map((subcategory, index: number) => {
      return {
        code: subcategory.categoryCode,
        subcategories: [
          {
            code: subcategory.code,
            order: index,
          },
        ],
        order: index,
      }
    })
    this.beforeNext.emit(dataForGrouping)
  }
}

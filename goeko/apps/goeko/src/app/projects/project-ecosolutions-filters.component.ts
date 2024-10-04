import { CommonModule } from '@angular/common'
import { Component, ElementRef, inject, model, signal, viewChildren } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SdgIconsComponent } from '@goeko/business-ui'
import { Category, ProjectService, SDGLabel } from '@goeko/store'
import { TranslateModule } from '@ngx-translate/core'

export interface Filters {
  categories: Category[]
}
@Component({
  selector: 'goeko-project-ecosolutions-filters',
  standalone: true,
  imports: [CommonModule, SdgIconsComponent, TranslateModule],
  templateUrl: './project-ecosolutions-filters.component.html',
  styleUrl: './project-ecosolutions-filters.component.scss',
})
export class ProjectEcosolutionsFiltersComponent {
  filtersVisible = model<boolean>(true)
  protected classificationsFilters = toSignal(inject(ProjectService).getGroupingFormCategories())

  private _categoriesCheckbox = viewChildren<ElementRef<HTMLInputElement>>('categories')
  //Filters
  public filterCategories = signal<Category[] | null>(null)
  public checkFavourite = signal<boolean>(false)
  public filterSdg = signal<SDGLabel[]>([])

  private get _checkedCategories() {
    return this._categoriesCheckbox()
      .filter((checkbox) => checkbox.nativeElement.checked)
      .map((checkbox) => {
        return JSON.parse(checkbox.nativeElement.value) as unknown as Category
      })
  }
  applyFiltersForCategories() {
    this.filterCategories.set(this._checkedCategories)
  }
  applyAllCategories() {
    this.filterCategories.set(null)
  }
  applyFavourites() {
    this.checkFavourite.update((value) => !value)
  }
  closeFilter = () => {
    this.filtersVisible.set(false)
  }
}

import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { CategoryGrouping, ClassificationsService, GroupingType } from '@goeko/store'
import { CATEGORIES } from '@goeko/store/classificactions/transform.util'
import { ButtonModule, DialogService } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-ecosolution-category-selector',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslatePipe],
  templateUrl: './ecosolution-category-selector.component.html',
  styleUrl: './ecosolution-category-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcosolutionCategorySelectorComponent {
  private _dialogService = inject(DialogService)
  private _categories = inject(ClassificationsService).groupingFormCategories(GroupingType.construction)
  public categoriesCode = CATEGORIES
  selectedCategory = signal<string>('')
  categories = toSignal(this._categories)

  selectCategory(category: CategoryGrouping) {
    this.selectedCategory.set(category.code)
  }

  save() {
    this._dialogService.close(this.selectedCategory())
  }
  close() {
    this._dialogService.close()
  }
}

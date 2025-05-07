import { CommonModule } from '@angular/common'
import { Component, computed, input, output } from '@angular/core'
import { BadgeModule, ButtonModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

export interface CategoryInfo {
  categoryName: string
  categoryCode: string
  subcategory: Subcategory[]
}

export interface Subcategory {
  subcategoryLabel: string
  products: string[]
}
interface CategoryEcosolutionsInfo {
  categoryName: string
  categoryCode: string
  subcategory: Array<{
    subcategoryLabel: string
    products: string[]
  }>
}
@Component({
  selector: 'goeko-ecosolution-info',
  standalone: true,
  imports: [CommonModule, BadgeModule, TranslatePipe, ButtonModule],
  templateUrl: './ecosolution-info.component.html',
  styleUrl: './ecosolution-info.component.scss',
})
export class EcosolutionInfoComponent {
  title = input.required<string>()
  description = input.required<string>()
  categories = input.required<CategoryEcosolutionsInfo[]>()
  category = computed<Subcategory[]>(() =>
    (
      Object.groupBy(this.categories(), (category) => category.categoryCode)[
        this.categories().at(0)?.categoryCode as string
      ] as unknown as CategoryInfo[]
    )
      .map((item) => item.subcategory)
      .flat(),
  )
  categoryName = computed(() => this.categories().at(0)?.categoryName || '')

  onDelete = output<boolean>()
  onEdit = output<boolean>()

  edit() {
    this.onEdit.emit(true)
  }
  delete() {
    this.onDelete.emit(true)
  }
}

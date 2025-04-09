import { CommonModule } from '@angular/common'
import { Component, computed, input, output } from '@angular/core'
import { BadgeModule, ButtonModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

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
  category = computed(() => this.categories().at(0))
  categoryName = computed(() => this.category()?.categoryName as string)

  onEdit = output<boolean>()

  edit() {
    this.onEdit.emit(true)
  }
}

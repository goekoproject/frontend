import { Component, computed, input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BadgeModule, FormErrorTextComponent } from '@goeko/ui'
import { CategoryGrouping } from '@goeko/store'
import { TranslatePipe } from '@ngx-translate/core'
import { defaultSetProductsCategories } from '../compare-with-select'

@Component({
  selector: 'goeko-ecosolutions-form-ecosolution-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BadgeModule, FormErrorTextComponent, TranslatePipe],
  templateUrl: './ecosolutions-form-ecosolution-type.component.html',
  styleUrl: './ecosolutions-form-ecosolution-type.component.scss',
})
export class EcosolutionsFormEcosolutionTypeComponent {
  public defaultSetProductsCategories = defaultSetProductsCategories

  groupingForm = input.required<CategoryGrouping[]>()
  public questionsCategories = computed(() => this.groupingForm()?.find((category) => category.code === this.categoryCode())?.subcategories)

  parentForm = input.required<FormGroup>()
  categoryCode = input.required<string>()
  isReadOnly = input<boolean>(false)
}

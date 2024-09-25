import { CommonModule } from '@angular/common'
import { Component, input, signal } from '@angular/core'

@Component({
  selector: 'goeko-project-ecosolutions-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-ecosolutions-filters.component.html',
  styleUrl: './project-ecosolutions-filters.component.scss',
})
export class ProjectEcosolutionsFiltersComponent {
  filtersVisible = input<boolean>(true)


}

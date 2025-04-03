import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'

@Component({
  selector: 'goeko-ecosolution-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecosolution-info.component.html',
  styleUrl: './ecosolution-info.component.scss',
})
export class EcosolutionInfoComponent {
  title = input.required<string>()
  description = input.required<string>()
}

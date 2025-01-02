import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'

@Component({
  selector: 'goeko-radio-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
})
export class RadioInputComponent {
  value = input.required<any>()
  checked = input<boolean>()
  name = input<string>()
  id = input<string>()
}

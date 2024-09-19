import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'goeko-project-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  @Input() id?: string

  constructor() {
    console.log(this.id)
  }
}

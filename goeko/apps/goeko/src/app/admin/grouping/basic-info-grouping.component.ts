import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { GoInputModule } from '@goeko/ui'

@Component({
  selector: 'goeko-basic-info-grouping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoInputModule],
  templateUrl: './basic-info-grouping.component.html',
  styleUrl: './basic-info-grouping.component.scss',
})
export class BasicInfoGroupingComponent {
  form!: FormGroup
}

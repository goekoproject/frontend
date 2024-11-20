import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-dialog-add-subcategory',
  standalone: true,
  imports: [CommonModule, GoInputModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './dialog-add-subcategory.component.html',
  styleUrl: './dialog-add-subcategory.component.scss',
})
export class DialogAddSubcategoryComponent {}

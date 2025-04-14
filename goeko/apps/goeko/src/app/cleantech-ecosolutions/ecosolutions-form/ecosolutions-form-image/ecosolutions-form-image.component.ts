import { CommonModule } from '@angular/common'
import { Component, computed, input, output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Picture } from '@goeko/store'
import { InputFileComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-ecosolutions-form-image',
  standalone: true,
  imports: [CommonModule, InputFileComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: './ecosolutions-form-image.component.html',
  styleUrl: './ecosolutions-form-image.component.scss',
})
export class EcosolutionsFormImageComponent {
  public parentForm = input.required<FormGroup>()
  public ecosolutionImages = input.required<string[], Picture[] | undefined>({
    transform: (value) => value?.map((picture) => picture.url) || [],
  })
  public imagenControl = computed(() => this.parentForm().get('images'))

  public ecosolutionsImg = output<File[]>()

  uploadImgEcosolutions(file: File[]) {
    if ((file && file.length === 0) || !file) {
      return
    }
    this.ecosolutionsImg.emit(file)
    this.imagenControl()?.patchValue(file)
    this.imagenControl()?.markAsDirty()
    this.imagenControl()?.markAsTouched()
  }
}

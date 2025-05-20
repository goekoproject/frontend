import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
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
  private _fb = inject(FormBuilder)
  public maxSizeFile = signal(`10MB`)
  public parentForm = input.required<FormGroup>()
  public ecosolutionImages = input.required<string[], Picture[] | undefined>({
    transform: (value) => value?.map((picture) => picture.url) || [],
  })
  public imagenControl = computed(() => this.parentForm().get('images') as FormArray)

  uploadImgEcosolutions(file: File[]) {
    if ((file && file.length === 0) || !file) {
      return
    }
    file.forEach((file) => {
      this._addImageControl(file)
    })
  }
  private _addImageControl(file: File) {
    const imageControl = this._fb.control(file)
    this.imagenControl().push(imageControl)
  }
}

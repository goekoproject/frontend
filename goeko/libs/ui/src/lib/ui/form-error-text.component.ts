import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { AbstractControl, FormControl } from '@angular/forms'

@Component({
  selector: 'goeko-form-error-text',
  standalone: true,
  imports: [CommonModule],
  template: ` @defer (when form()) {
    @if (form()?.invalid && form()?.touched && form()?.dirty) {
      <p class="mt-1 text-sm text-red-500" [id]="id()">
        <ng-content></ng-content>
      </p>
    }
  }`,
  styles: ``,
})
export class FormErrorTextComponent {
  form = input.required<AbstractControl | FormControl | null>()
  id = input<string>(Math.random().toString())
}

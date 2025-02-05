import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, signal, Signal } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

type Size = 'large' | 'default' | 'small'
type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
@Component({
  selector: 'goeko-go-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './go-input.component.html',
  styleUrl: './go-input.component.scss',

  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.tabindex]': 'tabIndex()',
  },
})
export class GoInputComponent implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ngControl = inject(NgControl, { optional: true, self: true })!
  // Inputs as Signals using Angular's built-in `input<T>()`
  id = input<string>('input') // Default ID is 'input'
  placeholder = input<string>('') // Default placeholder is empty
  label = input<string>('') // Default label is empty
  size = input<Size>('default') // Default size is 'default'
  type = input<InputType>('text') // Default type is 'text'

  required = input<boolean>(this.ngControl?.control?.errors?.['required'] ?? false)

  isRequired() {
    return this.ngControl?.control?.errors?.['required'] ?? false
  }
  // Internal state
  private _value = signal<string>('')
  errorMessages = signal<{ [key: string]: string }>({})

  private onChange!: (value: any) => void
  private onTouched!: () => void

  value(): Signal<string> {
    return this._value
  }

  showError = computed(() => !this._value() && this.ngControl?.touched && this.ngControl?.dirty && this.ngControl.invalid)

  ariaDescribedby(): Signal<string | null> {
    return computed(() => (this.showError() ? 'error-message' : null))
  }

  ariaInvalid() {
    return computed(() => this.showError())
  }

  tabIndex(): Signal<number> {
    return computed(() => (this.disabled() ? -1 : 0))
  }

  disabled(): Signal<boolean> {
    return computed(() => !!this.ngControl?.disabled)
  }

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this
    }
  }

  writeValue(value: any): void {
    this._value.set(value || '')
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.ngControl?.control?.disable()
    } else {
      this.ngControl?.control?.enable()
    }
  }

  onInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value
    this._value.set(newValue)
    this.onChange(newValue)
  }

  onBlur(): void {
    this.onTouched()
  }

  onFocus(): void {}
}

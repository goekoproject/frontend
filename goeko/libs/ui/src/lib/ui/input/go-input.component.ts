import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, signal } from '@angular/core'
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { OptionalDirective } from '../directives/optional.directive'

type Size = 'large' | 'default' | 'small'
type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
@Component({
  selector: 'goeko-go-input',
  standalone: true,
  imports: [CommonModule, TranslateModule, OptionalDirective],
  templateUrl: './go-input.component.html',
  styleUrl: './go-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.tabindex]': 'tabIndex()',
  },
})
export class GoInputComponent implements ControlValueAccessor {
  protected _elementRef = inject<ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>>(ElementRef)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ngControl = inject(NgControl, { optional: true, self: true })!

  id = input('input', {
    transform: (value: string) => `${window.crypto.randomUUID()}-${value}`,
  })
  placeholder = input<string>('')
  label = input<string>('')
  size = input<Size>('default')
  type = input<InputType>('text')

  required = input<boolean>(this.ngControl?.control?.errors?.['required'] ?? false)
  disabled = input<boolean>(this.ngControl?.disabled ?? false)
  optional = input<boolean>(true)
  isTyping = computed(() => !this.value() || this.value())

  // Internal state
  value = signal<string>('')
  errorMessages = computed(() => this.isTyping() ? this.ngControl?.errors : null)

  private onChange!: (value: any) => void
  private onTouched!: () => void
  showError = computed(
    () => ((!this.value() || this.value()) && this.ngControl?.touched && this.ngControl?.dirty && this.ngControl.invalid) ?? false,
  )
  isRequired = computed(() => (!this.value() && this.ngControl?.control?.errors?.['required']) ?? false)
  showOptional = computed(() => this.optional() && !this.hasValidatorRequired)
  ariaDescribedby = computed(() => (this.showError() ? 'error-message' : null))
  ariaInvalid = computed(() => this.showError())
  tabIndex = computed(() => (this.disabled() ? -1 : 0))
  isDisabled = computed(() => this.ngControl?.disabled ?? this.disabled())

  get hasValidatorRequired() {
    return this.ngControl.control?.hasValidator(Validators.required) ?? false
  }
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this
      console.log(this.id())
    }
  }

  writeValue(value: any): void {
    this.value.set(value || '')
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
    this.value.set(newValue)
    this.onChange(newValue)
  }

  onBlur(): void {
    this.onTouched()
  }

  onFocus(): void {
    this.onTouched()
  }
}

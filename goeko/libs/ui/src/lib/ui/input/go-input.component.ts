import { CommonModule } from '@angular/common'
import { Component, computed, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core'
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { OptionalDirective } from '../directives/optional.directive'
import { FormErrorTextComponent } from '../form-error-text.component'

type Size = 'large' | 'default' | 'small'
type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
@Component({
  selector: 'goeko-go-input,goeko-go-textarea',
  standalone: true,
  imports: [CommonModule, TranslateModule, OptionalDirective, FormErrorTextComponent],
  templateUrl: './go-input.component.html',
  styleUrl: './go-input.component.scss',

  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.aria-label]': 'label',
    '[attr.aria-required]': 'isRequired',
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.tabindex]': 'tabIndex()',
    '[attr.disabled]': 'isDisabled()',
    '[attr.required]': 'isRequired',
    '[attr.id]': 'id()',
  },
})
export class GoInputComponent implements ControlValueAccessor, OnInit {
  protected _elementRef = inject<ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>>(ElementRef)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ngControl = inject(NgControl, { optional: true, self: true })!

  errorMessageRef = viewChild('errorMessages', { read: ElementRef })
  id = input('input', {
    transform: (value: string) => `${window.crypto.randomUUID()}-${value}`,
  })
  placeholder = input<string>('')
  label = input<string>('')
  size = input<Size>('default')
  type = input<InputType>('text')
  autocomplete = input<string>('off')
  name = input<string>('')

  required = input<boolean>(this.ngControl?.control?.errors?.['required'] ?? false)
  disabled = input<boolean>(this.ngControl?.disabled ?? false)
  optional = input<boolean>(true)

  //only textarea
  maxLength = input<number>(999999)
  rows = input<number | undefined>(undefined)

  // Internal state
  value = signal<string>('')

  private onChange!: (value: any) => void
  private onTouched!: () => void
  get showError() {
    return this.ngControl?.touched && this.ngControl?.dirty && Object.keys(this.ngControl?.errors || {}).length > 0
  }
  isRequired = signal<boolean>(false)
  showOptional = computed(() => this.optional() && !this.isRequired() && !this.required())
  ariaDescribedby = computed(() => (this.showError ? 'error-message' : null))
  ariaInvalid = computed(() => this.showError)
  tabIndex = computed(() => (this.disabled() ? -1 : 0))
  isDisabled = computed(() => this.ngControl?.disabled ?? this.disabled())
  isTextarea = computed(() => this._elementRef.nativeElement.tagName.toLowerCase() === 'goeko-go-textarea')

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this
    }
  }
  ngOnInit(): void {
    if (this.ngControl?.control) {
      this.isRequired.set(this.ngControl.control.hasValidator(Validators.required))
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

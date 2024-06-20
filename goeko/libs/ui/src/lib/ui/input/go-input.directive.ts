import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
  Provider,
  Renderer2,
  forwardRef,
} from '@angular/core'
import { ControlValueAccessor, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms'

const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GoInputDirective),
  multi: true,
}
@Directive({
  selector: 'go-input',
  providers: [CONTROL_VALUE_ACCESSOR],
})
export class GoInputDirective implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() readonly = false
  @Output() valueChange = new EventEmitter()
  @HostListener('change', ['$event.detail'])
  onHostChange(value: string) {
    this.value = value
    this.valueChange.emit(value)
  }

  _onChange: (value: any) => void = () => {}
  _onTouched: (value?: any) => void = () => {}

  set value(value: string) {
    this._value = value
    this.elementRef.nativeElement.value = this.value

    this._onChange(value)
    this._onTouched(value)
  }
  get value() {
    return this._value
  }

  private _value!: any
  private _ngControl!: any
  private get required() {
    return this._ngControl?.hasValidator(Validators.required)
  }
  private get inputElementRef() {
    return this.elementRef.nativeElement.renderRoot.querySelectorAll('input')[0] as HTMLInputElement
  }
  constructor(
    @Inject(Injector) private injector: Injector,
    private _renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    const injectedControl = this.injector.get(NgControl)
    this._ngControl = this.injector.get(FormGroupDirective).getControl(injectedControl as FormControlName)
  }
  ngAfterContentInit(): void {
    this._setAttributeRequired()
    if (!this.inputElementRef) {
      return
    }
    this.inputElementRef.readOnly = this.readonly
  }
  writeValue(value: any) {
    this._value = this._assingValue(value)
    this.elementRef.nativeElement.value = this._value || ''
    this._renderer.setProperty(this.elementRef.nativeElement, 'value', this._value || '')
  }

  private _assingValue(newValue: any) {
    if (typeof newValue === 'object') {
      return newValue?.label
    } else {
      return newValue
    }
  }

  registerOnChange(fn: any) {
    this._onChange = fn
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn
  }

  setDisabledState(isDisabled: boolean) {
    this.elementRef.nativeElement.disabled = isDisabled
  }

  private _setAttributeRequired() {
    this._renderer.setProperty(this.elementRef.nativeElement, 'required', this.required)
  }
}

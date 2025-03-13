import { CommonModule } from '@angular/common'
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  Provider,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
  inject,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms'
import { BadgeComponent, BadgeGroupComponent, BadgeModule, GoInputModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { SelectSubcategoryProductDirective } from './select-subcategory.directive'
const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectSubcategoryProductComponent),
  multi: true,
}

type TYPE_INPUT = 'radio' | 'checkbox'
export enum TYPE_FIELD {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}
@Component({
  standalone: true,
  imports: [BadgeModule, CommonModule, ReactiveFormsModule, TranslateModule, GoInputModule, SelectSubcategoryProductDirective],
  providers: [CONTROL_VALUE_ACCESSOR],
  selector: 'goeko-select-subcategory-product',
  templateUrl: './select-subcategory-product.component.html',
  styleUrls: ['./select-subcategory-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.open]': 'open',
    '[attr.checked]': 'checked',
    '[attr.readonly]': 'readonly',
    '[attr.id]': 'id',
  },
})
export class SelectSubcategoryProductComponent implements ControlValueAccessor, AfterContentInit, AfterViewInit, OnDestroy {
  private _injector = inject(Injector)

  @ContentChild(BadgeGroupComponent) badgeGroup!: BadgeGroupComponent
  @ViewChild('inputElement') inputElement!: ElementRef
  private _formControlNameDirective!: NgControl

  @Input() id!: string
  @Input() readonly = false
  @Input() subCategory: any
  @Input() typeTitle: 'label' | 'question' = 'label'
  @Input()
  public get multiple(): boolean {
    return this._multiple
  }
  public set multiple(value: boolean) {
    this._multiple = value
    this.type = value ? 'checkbox' : 'radio'
  }
  private _multiple!: boolean

  public type: TYPE_INPUT = 'radio'
  public disabled = false

  private _value!: any
  public get value(): any {
    return this._value
  }
  public set value(value: any) {
    this._value = value
  }

  private _open = true
  @Input()
  public get open() {
    return this._open
  }
  public set open(value: boolean) {
    this._open = value
    this._cdf.markForCheck()
  }

  public get selected(): BadgeComponent[] {
    this._refreshValue()
    this._cdf.markForCheck()
    return this.badgeGroup?.selected
  }

  get labelSelected(): string {
    this._cdf.markForCheck()
    return this.selected?.map((select) => select.label)?.toString()
  }

  @Input()
  public get checked() {
    this._cdf.markForCheck()
    return this._checked
  }
  public set checked(value) {
    this._checked = value
    this._cdf.markForCheck()
  }
  private _checked = false

  get isSelectedAll() {
    return this.badgeGroup.isSelectAll
  }
  private mutationObserver!: MutationObserver

  _onChange: (value: any) => void = () => {}
  _onTouched: (value?: any) => void = () => {}

  constructor(
    private _cdf: ChangeDetectorRef,
    private _el: ElementRef,
  ) {}

  ngAfterContentInit(): void {
    this._formControlNameDirective = this._injector.get(NgControl, null) as NgControl
    this.badgeGroup.valueChangedBadge$.subscribe((badge) => {
      this._handleCheckSubcategoryWhenProductSelected()
    })
  }

  ngAfterViewInit() {
    this._handlerMutationObserver()
    this._cdf.markForCheck()
  }

  ngOnDestroy() {
    // Detener la observación cuando el componente se destruye
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }
  writeValue(value: any): void {
    if (!value) {
      return
    }
    this.assignValue(value)
  }
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  private _onFocus() {
    this.inputElement?.nativeElement?.focus()
  }
  private _handlerMutationObserver() {
    // Configuración de MutationObserver con una función de retorno de llamada
    this.mutationObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'checked') {
          const isChecked = this._el.nativeElement.getAttribute('checked') === 'true'
          if (!isChecked) {
            this.open = false
            this.badgeGroup.clearAll()
          } else {
            this.open = true
          }
          this._cdf.markForCheck()
        }
      }
    })

    // Observar cambios en atributos del elemento host
    this.mutationObserver.observe(this._el.nativeElement, { attributes: true })
  }
  private _handleCheckSubcategoryWhenProductSelected() {
    this._cdf.markForCheck()
  }
  onRestValue(): void {
    setTimeout(() => {
      this.open = this.inputElement?.nativeElement.checked || false
    })
  }

  assignValue(value: string): void {
    if (this.multiple) {
      this.value = value
      this.checked = true
      this._cdf.markForCheck()

      this.open = false
    } else if (this.subCategory.code === value) {
      this.value = this.subCategory
      this.checked = true
      this._cdf.markForCheck()
      this._formControlNameDirective?.control?.pristine
      this._formControlNameDirective?.control?.markAsPristine()
    }

    // this will make the execution after the above boolean has changed
  }

  onSelect(value: string) {
    this.value = value
    this._propagateValue()
  }

  private _propagateValue() {
    this.checked = true

    this._onFocus()
    this._onChange(this.value)
    this._onTouched()
    this._cdf.markForCheck()
  }

  private _refreshValue() {
    if (this.type === TYPE_FIELD.CHECKBOX) {
      return
    }
    if (!this.open && !this.multiple) {
      this.badgeGroup._selectionModel.clear()
      this.value = ''
    }
  }

  toogle(value: any) {
    this.open = !this.open
    if (this.open) {
      this._onFocus()
    }
    this._onChange(value)
    this._cdf.markForCheck()
  }
  selectAll(event: Event) {
    this.badgeGroup.selectAll()
    event.stopPropagation()
  }
  deSelectAll() {
    this.badgeGroup.clearAll()
  }
}

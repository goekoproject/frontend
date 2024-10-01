import { CommonModule } from '@angular/common'
import { Component, computed, forwardRef, Input, model, OnInit, signal, ViewEncapsulation } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { OrderByPipe } from '@goeko/core'
import { SDG_LABEL, SDGLabel } from '@goeko/store'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

type Size = 'small' | 'medium' | 'large'
@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, OrderByPipe],
  selector: 'goeko-sdg-icons',
  templateUrl: './sdg-icons.component.html',
  styleUrls: ['./sdg-icons.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SdgIconsComponent),
      multi: true,
    },
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.readonly]': 'readonly',
    '[attr.size]': 'size',
  },
})
export class SdgIconsComponent implements OnInit, ControlValueAccessor {
  public currentLangCode: string
  public sdgs = signal<SDGLabel[]>(SDG_LABEL)

  public sdgCodeSelected = computed(() => (this.value() || [])?.map((sdg) => sdg.code))
  onChange: (value: Array<SDGLabel>) => void = () => {}
  onTouched: () => void = () => {}

  value = model<Array<SDGLabel>>([])
  @Input()
  public get selected(): number[] {
    return this._selected
  }

  @Input() readonly: boolean = false
  public set selected(sustainableDevelopmentGoals: number[]) {
    if (sustainableDevelopmentGoals) {
      this.sdgs.set(SDG_LABEL.filter((sdg) => sustainableDevelopmentGoals.includes(sdg.code)))
    }
    this._selected = sustainableDevelopmentGoals
  }
  private _selected!: number[]

  @Input() size: Size = 'small'

  constructor(private _translateServices: TranslateService) {
    this.currentLangCode = this._translateServices.defaultLang
  }

  ngOnInit(): void {
    this._changeLangCode()
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((res) => (this.currentLangCode = res.lang))
  }

  writeValue(value: any): void {
    this._assignValue(value)
  }
  private _assignValue(newValue: SDGLabel) {
    this.value.update((value) => {
      // Verificar si el elemento ya existe en el array
      const exists = value.some((sdg: SDGLabel) => sdg.code === newValue.code)
      if (exists) {
        // Si existe, eliminarlo
        return value.filter((sdg: SDGLabel) => sdg.code !== newValue.code)
      } else {
        // Si no existe, agregarlo
        return [...value, newValue]
      }
    })
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.')
  }

  selectedElement(event: Event, sdgSelected: SDGLabel): void {
    this._assignValue(sdgSelected)
    this.onTouched()
    this.onChange(this.value())
    event.preventDefault()
  }
}

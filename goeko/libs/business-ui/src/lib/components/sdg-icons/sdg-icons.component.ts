import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef, signal,Output,EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ODS_CODE } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';

//TODO: To do value accessort
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'goeko-sdg-icons',
  templateUrl: './sdg-icons.component.html',
  styleUrls: ['./sdg-icons.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SdgIconsComponent),
      multi: true,
    },
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.readonly]': 'readonly'
  }
})
export class SdgIconsComponent implements OnInit, ControlValueAccessor {
  public currentLangCode: string;
  public odsCode!: number[];
  private _sdeSelected = new Set<number>();
  public value = signal<Array<number>>([]);

  onChange: (value: Array<number>) => void = () => {};
  onTouched: () => void = () => {};

  @Output() valueSelected = new EventEmitter();

  @Input()
  public get selected(): number[] {
    return this._selected;
  }

  @Input() readonly: boolean = false;
  public set selected(sustainableDevelopmentGoals: number[]) {
    if (sustainableDevelopmentGoals) {
      this.odsCode = ODS_CODE.filter((code) =>
        sustainableDevelopmentGoals.includes(code)
      );
    }
    this._selected = sustainableDevelopmentGoals;
  }
  private _selected!: number[];

  constructor(private _translateServices: TranslateService) {
    this.currentLangCode = this._translateServices.defaultLang;
    this.odsCode = ODS_CODE.sort((a, b) => a - b);
  }

  ngOnInit(): void {
    this._changeLangCode();
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe(
      (res) => (this.currentLangCode = res.lang)
    );
  }

  writeValue(value: any): void {
    this.value.set(value);
    this.value()?.forEach(value => this._selectedValue(value));
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    /*     throw new Error('Method not implemented.');
     */
  }

  selectedElement(event: Event, codeSelected: number): void {
    this._selectedValue(codeSelected);
    this.value.set(Array.from(this._sdeSelected));
    this.onTouched();
    this.onChange(this.value());
    this.valueSelected.emit(this.value());
    event.preventDefault();

  }
  private _selectedValue(value: number): void {
    if (!this._sdeSelected.has(value)) {
      this._sdeSelected.add(value);
    } else {
      this._sdeSelected.delete(value);
    }
  }
}

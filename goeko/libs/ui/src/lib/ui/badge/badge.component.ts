import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'go-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(click)': 'onSelect()',
    '[attr.selected]': 'selected',
    '[attr.readonly]': 'readonly',
    '[attr.fill]': 'fill',

  },
})
export class BadgeComponent implements AfterContentInit {
  @ViewChild('labelElement', { static: false }) labelElement!: ElementRef<any>;

  @Input()
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    this._cdf.markForCheck();
  }
  private _value!: any;

  @Input() fill!: any;
  @Input()
  public get readonly() {
    return this._readonly;
  }
  public set readonly(value) {
    this._readonly = value;
    this._cdf.markForCheck();
  }
  private _readonly = false;

  @Input() className!: string |undefined;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSelected$ = new EventEmitter();
  @Input()
  public get selected() {
    this._cdf.markForCheck();
    return this._selected;
  }
  public set selected(value) {
    this._selected = value;
    this._cdf.markForCheck();
  }
  private _selected!: boolean;

  get label() {
    return this.labelElement?.nativeElement.textContent;
  }

  constructor(private _cdf: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this._cdf.markForCheck();
  }
  onSelect() {
    this.onSelected$.emit(this);
    this._cdf.markForCheck();
  }

  onSelected(selected: boolean) {
    this.selected = !selected;
  }
  clear()  {
    this.selected = false;
  }
}

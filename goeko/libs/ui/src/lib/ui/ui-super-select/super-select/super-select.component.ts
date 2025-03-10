import { CdkOverlayOrigin } from '@angular/cdk/overlay'
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { takeUntil } from 'rxjs'
import { SUPER_SELECT_TOKEN } from './../super-select-token'
import { BaseSelectComponent } from './base-select.component'

@Component({
  selector: 'ui-super-select',
  templateUrl: './super-select.component.html',
  styleUrls: ['./super-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: SUPER_SELECT_TOKEN,
      useExisting: SuperSelectComponent,
    },
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'super-select',
    role: 'combobox',
    '[attr.tabindex]': 'tabIndex',
    '[attr.required]': 'isRequired',
    '[attr.has-error]': 'hasError',
    '[attr.disabled]': 'disabled',
    '[attr.readonly]': 'readonly',
    '[class.ui-select--box]': '_appearance === "box"',
    '[class.ui-select--active]': 'isOpen',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
  },
})
export class SuperSelectComponent extends BaseSelectComponent implements OnInit {
  @Input() noFloatinglabel = false
  @Input() readonly = false

  override ngOnInit(): void {
    super.ngOnInit()

    this._viewportRuler
      .change()
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        if (this.isOpen) {
          this._overlayWidth = this._getOverlayWidth()
          this._changeDetector.detectChanges()
        }
      })
  }
  override open() {
    this._overlayWidth = this._getOverlayWidth()
    super.open()
    // Required for the MDC form field to pick up when the overlay has been opened.
    this.stateChanges.next()
  }
  /** Gets how wide the overlay panel should be. */
  private _getOverlayWidth() {
    const refToMeasure =
      this._preferredOverlayOrigin instanceof CdkOverlayOrigin
        ? this._preferredOverlayOrigin.elementRef
        : this._preferredOverlayOrigin || this._elementRef
    return refToMeasure.nativeElement.getBoundingClientRect().width
  }
  /** ------------------------------------------------ */
}

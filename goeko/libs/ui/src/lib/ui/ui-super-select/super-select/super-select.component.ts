import { SUPER_SELECT_TOKEN } from './../super-select-token';
import { takeUntil } from 'rxjs';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseSelectComponent } from './base-select.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

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
	host: {
		class: 'super-select',
		role: 'combobox',
		'[attr.tabindex]': 'tabIndex',
		'[attr.disabled]': 'disabled',
		'[class.ui-select--box]': '_appearance === "box"',
		'[class.ui-select--active]': 'isOpen',
		'(keydown)': '_handleKeydown($event)',
		'(focus)': '_onFocus()',
		'(blur)': '_onBlur()',
	},
})
export class SuperSelectComponent extends BaseSelectComponent implements OnInit {
	@Input() noFloatinglabel: boolean = false;
	override ngOnInit(): void {
		super.ngOnInit();

		this._viewportRuler
			.change()
			.pipe(takeUntil(this._destroy))
			.subscribe(() => {
				if (this.isOpen) {
					this._overlayWidth = this._getOverlayWidth();
					this._changeDetector.detectChanges();
				}
			});
	}
	override open() {
		this._overlayWidth = this._getOverlayWidth();
		super.open();
		// Required for the MDC form field to pick up when the overlay has been opened.
		this.stateChanges.next();
	}
	/** Gets how wide the overlay panel should be. */
	private _getOverlayWidth() {
		const refToMeasure =
			this._preferredOverlayOrigin instanceof CdkOverlayOrigin
				? this._preferredOverlayOrigin.elementRef
				: this._preferredOverlayOrigin || this._elementRef;
		return refToMeasure.nativeElement.getBoundingClientRect().width;
	}
	/** ------------------------------------------------ */
}
